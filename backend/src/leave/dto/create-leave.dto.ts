import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateLeaveDto {
  @IsNotEmpty()
  alasan!: string;

  @IsDateString()
  tanggalMulai!: string;

  @IsDateString()
  tanggalSelesai!: string;

  @IsInt()
  employeeId!: number;
}