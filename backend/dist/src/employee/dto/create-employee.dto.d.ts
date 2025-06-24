import { Gender } from '@prisma/client';
export declare class CreateEmployeeDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: Gender;
}
