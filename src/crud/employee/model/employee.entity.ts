import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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

  @Column()
  job: JobType;

  @OneToOne(
    () => Location,
    location => location.employees,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'worksAt' })
  worksAt: Location;

  @OneToOne(
    () => Equipment,
    equipment => equipment.uses,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'operates' })
  operates: Equipment;
}
