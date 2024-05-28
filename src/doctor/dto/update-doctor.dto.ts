import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Department } from '../../Enums/enums';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  contactDetails?: string;

  @IsOptional()
  @IsEnum(Department)
  department?: Department;

  @IsOptional()
  availability?: boolean;
}
