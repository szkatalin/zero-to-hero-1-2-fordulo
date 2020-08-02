import { EquipmentType } from '../model/equipment-type.enum';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString
} from 'class-validator';

export class CreateEquipmentDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsEnum(EquipmentType)
  type: EquipmentType;

  @IsDefined()
  @IsInt()
  locatedAt: number;
}
