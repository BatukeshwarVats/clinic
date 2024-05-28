import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const newPatient = this.patientsRepository.create(createPatientDto);
    return this.patientsRepository.save(newPatient);
  }

  findOne(id: string): Promise<Patient> {
    return this.patientsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateData: UpdatePatientDto): Promise<Patient> {
    await this.patientsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    return this.patientsRepository.delete(id).then(() => undefined);
  }
}
