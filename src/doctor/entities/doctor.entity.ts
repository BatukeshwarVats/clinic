import { Department } from '../../Enums/enums';
import { Appointment } from '../../appointment/entities/appointment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Department,
  })
  department: Department;

  @Column({ unique: true })
  contactDetails: string;

  @Column({ default: true })
  availability: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}
