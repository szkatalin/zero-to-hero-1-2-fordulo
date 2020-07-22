import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Equipment } from './model/equipment.entity';
import { CreateOrUpdateEquipmentDto } from './dto/create-or-update-equipment.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Location } from '../location/model/location.entity';
import { EquipmentType } from './model/equipment-type.enum';
import { LocationRepository } from '../location/location.repository';

@EntityRepository(Equipment)
export class EquipmentRepository extends Repository<Equipment> {
  async getEquipmentById(id: number) {
    const equipment = await this.findOne({ where: { id } });
    if (equipment) return equipment;
    throw new NotFoundException(`Equipment with ID "${id}" not found!`);
  }

  async createEquipment(createEquipmentDto: CreateOrUpdateEquipmentDto) {
    const equipment = new Equipment();
    const location = await getCustomRepository(
      LocationRepository
    ).getLocationById(createEquipmentDto.locatedAt);

    if (
      createEquipmentDto.name &&
      EquipmentType[createEquipmentDto.type] !== undefined &&
      createEquipmentDto.locatedAt
    ) {
      equipment.name = createEquipmentDto.name;
      equipment.type = createEquipmentDto.type as EquipmentType;
      equipment.locatedAt = location;
    } else {
      throw new BadRequestException();
    }

    return equipment.save();
  }

  async updateEquipment(
    id: number,
    updateEquipmentDto: CreateOrUpdateEquipmentDto
  ) {
    const equipment = await this.getEquipmentById(id);

    if (updateEquipmentDto.name) {
      equipment.name = updateEquipmentDto.name;
    }

    if (updateEquipmentDto.type) {
      equipment.type = updateEquipmentDto.type as EquipmentType;
    }

    return equipment.save();
  }

  async deleteEquipment(id: number) {
    const equipment = await this.getEquipmentById(id);
    return equipment.remove();
  }

  async isEquipmentAvailable(locationId: number, equipment: EquipmentType) {}
}
