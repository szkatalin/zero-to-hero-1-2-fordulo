import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Equipment } from '../../equipment/model/equipment.entity';
import { Employee } from '../../employee/model/employee.entity';

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(
    () => Equipment,
    equipment => equipment.locatedAt,
    { onDelete: 'CASCADE' }
  )
  equipments: Equipment[];

  @OneToMany(
    () => Employee,
    employee => employee.worksAt,
    { onDelete: 'CASCADE' }
  )
  employees: Employee[];
}
