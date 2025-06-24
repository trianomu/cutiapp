import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

const prisma = new PrismaClient();

@Injectable()
export class EmployeeService {
  async create(dto: CreateEmployeeDto) {
    return await prisma.employee.create({ data: dto });
  }

  async findAll() {
    return await prisma.employee.findMany();
  }

  async findAllWithLeaves() {
    return await prisma.employee.findMany({
      include: {
        leaves: true,
      },
    });
  }

  async findOne(id: number) {
    const emp = await prisma.employee.findUnique({ where: { id } });
    if (!emp) throw new NotFoundException('Pegawai tidak ditemukan');
    return emp;
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    return await prisma.employee.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return await prisma.employee.delete({ where: { id } });
  }
}
