import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from '../location/location.repository';
import { EquipmentRepository } from './equipment.repository';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { validate } from 'class-validator';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(EquipmentRepository)
    private equipmentRepository: EquipmentRepository,
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository
  ) {}

  async createEquipment(createEquipmentDto: CreateEquipmentDto) {
    return validate(createEquipmentDto).then(() => {
      return this.equipmentRepository.createEquipment(createEquipmentDto);
    });
  }

  async updateEquipment(
    id: number,
    updateEquipmentDto: UpdateEquipmentDto
  ) {
    return validate(updateEquipmentDto).then(() => {
      return this.equipmentRepository.updateEquipment(id, updateEquipmentDto);
    });
  }

  async deleteEquipment(id: number) {
    return this.equipmentRepository.deleteEquipment(id);
  }
}
