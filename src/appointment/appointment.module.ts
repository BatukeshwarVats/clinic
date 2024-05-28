import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, Doctor])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
