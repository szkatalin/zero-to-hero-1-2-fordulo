import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobType } from './job-type.enum';
import { Location } from './location.entity';
import { Equipment } from './equipment.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  job: JobType;

  @OneToOne(() => Location)
  worksAt: Location;

  @OneToOne(() => Equipment)
  operates: Equipment;
}
