import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { EquipmentType } from '../model/equipment-type.enum';

export class UpdateEquipmentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(EquipmentType)
  type: EquipmentType;

  @IsOptional()
  @IsInt()
  locatedAt: number;
}
