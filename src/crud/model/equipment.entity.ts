import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EquipmentType } from './equipment-type.enum';
import { Location } from './location.entity';

@Entity()
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: EquipmentType;

  @OneToOne(() => Location)
  locatedAt: Location;
}
