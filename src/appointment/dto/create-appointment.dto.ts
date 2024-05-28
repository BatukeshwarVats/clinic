import {
  IsString,
  IsNumber,
  IsEnum,
  IsDate,
  IsDateString,
  IsInt,
} from 'class-validator';
import { AppointmentStatus } from '../../Enums/enums';

export class CreateAppointmentDto {
  @IsString()
  patientId: string;

  @IsString()
  doctorId: string;

  @IsDateString()
  date: string;

  @IsInt()
  slot: number;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
