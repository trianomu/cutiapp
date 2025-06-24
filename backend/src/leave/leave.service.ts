import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateLeaveDto } from './dto/create-leave.dto';
import dayjs from 'dayjs';
import { UpdateLeaveDto } from './dto/update-leave.dto';

const prisma = new PrismaClient();

@Injectable()
export class LeaveService {
  async create(dto: CreateLeaveDto) {
    const { employeeId, tanggalMulai, tanggalSelesai } = dto;

    const start = dayjs(tanggalMulai);
    const end = dayjs(tanggalSelesai);
    const totalDays = end.diff(start, 'day') + 1;

    if (totalDays <= 0) {
      throw new BadRequestException('Tanggal cuti tidak valid.');
    }

    // Validasi total cuti per tahun (maks 12 hari)
    const tahun = start.year();
    const totalUsed = await prisma.leave.aggregate({
      where: {
        employeeId,
        tanggalMulai: {
          gte: new Date(`${tahun}-01-01`),
          lte: new Date(`${tahun}-12-31`),
        },
      },
      _sum: {
        totalDays: true,
      },
    });

    const sudahDipakai = totalUsed._sum.totalDays ?? 0;
    if (sudahDipakai + totalDays > 12) {
      throw new BadRequestException(`Total cuti tahunan melebihi 12 hari. Sudah dipakai: ${sudahDipakai} hari`);
    }

    //Validasi 1x cuti per bulan
    const bulan = start.month();
    const adaCutiBulanIni = await prisma.leave.findFirst({
      where: {
        employeeId,
        tanggalMulai: {
          gte: start.startOf('month').toDate(),
          lte: start.endOf('month').toDate(),
        },
      },
    });

    if (adaCutiBulanIni) {
      throw new BadRequestException('Pegawai hanya boleh cuti 1 kali dalam 1 bulan.');
    }

    // Simpan data
    return await prisma.leave.create({
      data: {
        alasan: dto.alasan,
        tanggalMulai: start.toDate(),
        tanggalSelesai: end.toDate(),
        employeeId,
        totalDays,
      },
    });
  }

  async findAll() {
    return prisma.leave.findMany({ include: { employee: true } });
  }

  async findOne(id: number) {
    const leave = await prisma.leave.findUnique({
      where: { id },
      include: { employee: true }, 
    });

    if (!leave) throw new Error('Leave not found');

    return leave;
  }


  async update(id: number, dto: UpdateLeaveDto) {
    const leave = await prisma.leave.findUnique({ where: { id } });
    if (!leave) throw new Error('Leave not found');

    return prisma.leave.update({
      where: { id },
      data: {
        alasan: dto.alasan,
        tanggalMulai: new Date(dto.tanggalMulai),
        tanggalSelesai: new Date(dto.tanggalSelesai),
        employeeId: dto.employeeId,
      },
    });
  }

  async remove(id: number) {
    const leave = await prisma.leave.findUnique({ where: { id } });
    if (!leave) throw new Error('Leave not found');

    return prisma.leave.delete({ where: { id } });
  }

}