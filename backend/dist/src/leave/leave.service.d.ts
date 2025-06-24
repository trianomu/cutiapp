import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
export declare class LeaveService {
    create(dto: CreateLeaveDto): Promise<{
        id: number;
        alasan: string;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        totalDays: number;
        employeeId: number;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        employee: {
            id: number;
            createdAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            address: string;
            gender: import(".prisma/client").$Enums.Gender;
            updatedAt: Date;
        };
    } & {
        id: number;
        alasan: string;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        totalDays: number;
        employeeId: number;
        createdAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        employee: {
            id: number;
            createdAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            address: string;
            gender: import(".prisma/client").$Enums.Gender;
            updatedAt: Date;
        };
    } & {
        id: number;
        alasan: string;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        totalDays: number;
        employeeId: number;
        createdAt: Date;
    }>;
    update(id: number, dto: UpdateLeaveDto): Promise<{
        id: number;
        alasan: string;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        totalDays: number;
        employeeId: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        alasan: string;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        totalDays: number;
        employeeId: number;
        createdAt: Date;
    }>;
}
