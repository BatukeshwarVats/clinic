import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const patient = await this.patientRepository.findOneBy({
      id: createAppointmentDto.patientId,
    });
    const doctor = await this.doctorRepository.findOneBy({
      id: createAppointmentDto.doctorId,
    });

    if (!patient || !doctor) {
      throw new Error('Patient or Doctor not found');
    }

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      date: new Date(createAppointmentDto.date),
      patient: patient,
      doctor: doctor,
    });
    return this.appointmentRepository.save(appointment);
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    if (updateAppointmentDto.date) {
      updateAppointmentDto.date = new Date(
        updateAppointmentDto.date,
      ).toISOString() as any;
    }
    await this.appointmentRepository.update(id, updateAppointmentDto);
    return this.appointmentRepository.findOneBy({ id });
  }

  async findAllForDoctor(doctorId: string, date: Date): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: {
        doctor: { id: doctorId },
        date: date,
      },
    });
  }

  async findAvailableTimeSlots(
    doctorId: string,
    date: Date,
  ): Promise<string[]> {
    const appointments = await this.appointmentRepository.find({
      where: {
        doctor: { id: doctorId },
        date: date,
      },
    });

    const bookedSlots = appointments.map((app) => app.slot);
    const allSlots = Array.from({ length: 24 }, (_, i) => i);
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot),
    );

    return availableSlots.map((slot) => `${slot}:00 - ${slot + 1}:00`);
  }
}
