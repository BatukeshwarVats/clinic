import { IsString, IsDate } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsDate()
  dob: string;

  @IsString()
  contactDetails: string;
}
