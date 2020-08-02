import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Equipment } from './model/equipment.entity';
import { NotFoundException } from '@nestjs/common';
import { EquipmentType } from './model/equipment-type.enum';
import { LocationRepository } from '../location/location.repository';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@EntityRepository(Equipment)
export class EquipmentRepository extends Repository<Equipment> {
  async getEquipmentById(id: number) {
    const equipment = await this.findOne({ where: { id } });
    if (equipment) return equipment;
    throw new NotFoundException(`Equipment with ID "${id}" not found!`);
  }

  async createEquipment(createEquipmentDto: CreateEquipmentDto) {
    const equipment = new Equipment();

    if (createEquipmentDto.name && createEquipmentDto.locatedAt) {
      equipment.name = createEquipmentDto.name;
      equipment.locatedAt = await getCustomRepository(
        LocationRepository
      ).getLocationById(createEquipmentDto.locatedAt);
    }

    if (createEquipmentDto.type) {
      equipment.type = EquipmentType[createEquipmentDto.type];
    }

    return equipment.save();
  }

  async updateEquipment(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.getEquipmentById(id);

    if (updateEquipmentDto.name) {
      equipment.name = updateEquipmentDto.name;
    }

    if (updateEquipmentDto.type) {
      equipment.type = EquipmentType[updateEquipmentDto.type];
    }

    if (updateEquipmentDto.locatedAt) {
      equipment.locatedAt = await getCustomRepository(
        LocationRepository
      ).getLocationById(updateEquipmentDto.locatedAt);
    }

    return equipment.save();
  }

  async deleteEquipment(id: number) {
    const equipment = await this.getEquipmentById(id);
    return equipment.remove();
  }
}
