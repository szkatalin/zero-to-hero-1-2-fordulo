import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { JobType } from './job-type.enum';
import { Location } from '../../location/model/location.entity';
import { Equipment } from '../../equipment/model/equipment.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: JobType })
  job: JobType;

  @ManyToOne(
    () => Location,
    location => location.employees,
    { eager: true, onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'worksAt' })
  worksAt: Location;

  @OneToOne(
    () => Equipment,
    equipment => equipment.uses,
    { eager: true, onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'operates' })
  operates: Equipment;
}
