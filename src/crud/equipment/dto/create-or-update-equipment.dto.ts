import { EquipmentType } from '../model/equipment-type.enum';

export class CreateOrUpdateEquipmentDto {
  name: string;
  type: EquipmentType;
  locatedAt: number;
}
