import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeeService {
    create(dto: CreateEmployeeDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        gender: import(".prisma/client").$Enums.Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        gender: import(".prisma/client").$Enums.Gender;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllWithLeaves(): Promise<({
        leaves: {
            id: number;
            createdAt: Date;
            alasan: string;
            tanggalMulai: Date;
            tanggalSelesai: Date;
            totalDays: number;
            employeeId: number;
        }[];
    } & {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        gender: import(".prisma/client").$Enums.Gender;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        gender: import(".prisma/client").$Enums.Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateEmployeeDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        gender: import(".prisma/client").$Enums.Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        gender: import(".prisma/client").$Enums.Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
