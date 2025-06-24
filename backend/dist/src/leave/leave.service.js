"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const dayjs_1 = __importDefault(require("dayjs"));
const prisma = new client_1.PrismaClient();
let LeaveService = class LeaveService {
    async create(dto) {
        var _a;
        const { employeeId, tanggalMulai, tanggalSelesai } = dto;
        const start = (0, dayjs_1.default)(tanggalMulai);
        const end = (0, dayjs_1.default)(tanggalSelesai);
        const totalDays = end.diff(start, 'day') + 1;
        if (totalDays <= 0) {
            throw new common_1.BadRequestException('Tanggal cuti tidak valid.');
        }
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
        const sudahDipakai = (_a = totalUsed._sum.totalDays) !== null && _a !== void 0 ? _a : 0;
        if (sudahDipakai + totalDays > 12) {
            throw new common_1.BadRequestException(`Total cuti tahunan melebihi 12 hari. Sudah dipakai: ${sudahDipakai} hari`);
        }
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
            throw new common_1.BadRequestException('Pegawai hanya boleh cuti 1 kali dalam 1 bulan.');
        }
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
    async findOne(id) {
        const leave = await prisma.leave.findUnique({
            where: { id },
            include: { employee: true },
        });
        if (!leave)
            throw new Error('Leave not found');
        return leave;
    }
    async update(id, dto) {
        const leave = await prisma.leave.findUnique({ where: { id } });
        if (!leave)
            throw new Error('Leave not found');
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
    async remove(id) {
        const leave = await prisma.leave.findUnique({ where: { id } });
        if (!leave)
            throw new Error('Leave not found');
        return prisma.leave.delete({ where: { id } });
    }
};
exports.LeaveService = LeaveService;
exports.LeaveService = LeaveService = __decorate([
    (0, common_1.Injectable)()
], LeaveService);
//# sourceMappingURL=leave.service.js.map