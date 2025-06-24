import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  address!: string;

  @IsEnum(Gender)
  gender!: Gender;
}