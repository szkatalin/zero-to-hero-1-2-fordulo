import { Injectable } from '@nestjs/common';
import { CreateOrUpdateEquipmentDto } from './dto/create-or-update-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from '../location/location.repository';
import { EquipmentRepository } from './equipment.repository';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(EquipmentRepository)
    private equipmentRepository: EquipmentRepository,
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository
  ) {}

  async createEquipment(createEquipmentDto: CreateOrUpdateEquipmentDto) {
    return this.equipmentRepository.createEquipment(createEquipmentDto);
  }

  async updateEquipment(
    id: number,
    updateEquipmentDto: CreateOrUpdateEquipmentDto
  ) {
    return this.equipmentRepository.updateEquipment(id, updateEquipmentDto);
  }

  async deleteEquipment(id: number) {
    return this.equipmentRepository.deleteEquipment(id);
  }
}
