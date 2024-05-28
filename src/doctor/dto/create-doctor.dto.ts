import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Department } from '../../Enums/enums';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsEnum(Department)
  department: Department;

  @IsString()
  @IsOptional()
  contactDetails?: string;

  @IsBoolean()
  availability: boolean;
}
