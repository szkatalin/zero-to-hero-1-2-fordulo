import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { EquipmentType } from './equipment-type.enum';
import { Location } from '../../location/model/location.entity';
import { Employee } from '../../employee/model/employee.entity';

@Entity()
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: EquipmentType, nullable: true })
  type: EquipmentType;

  @ManyToOne(
    () => Location,
    location => location.equipments,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'locatedAt' })
  locatedAt: Location;

  @OneToOne(
    () => Employee,
    employee => employee.operates,
    { onDelete: 'CASCADE' }
  )
  uses: Employee;
}
