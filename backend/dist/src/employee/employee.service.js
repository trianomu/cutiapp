"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let EmployeeService = class EmployeeService {
    async create(dto) {
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
    async findOne(id) {
        const emp = await prisma.employee.findUnique({ where: { id } });
        if (!emp)
            throw new common_1.NotFoundException('Pegawai tidak ditemukan');
        return emp;
    }
    async update(id, dto) {
        return await prisma.employee.update({ where: { id }, data: dto });
    }
    async remove(id) {
        return await prisma.employee.delete({ where: { id } });
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)()
], EmployeeService);
//# sourceMappingURL=employee.service.js.map