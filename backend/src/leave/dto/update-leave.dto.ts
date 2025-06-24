import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateLeaveDto {
  @IsInt()
  employeeId!: number;

  @IsString()
  @IsNotEmpty()
  alasan!: string;

  @IsDateString()
  tanggalMulai!: string;

  @IsDateString()
  tanggalSelesai!: string;
}
