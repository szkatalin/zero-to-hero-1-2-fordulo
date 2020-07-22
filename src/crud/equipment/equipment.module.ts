import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './model/equipment.entity';
import { EquipmentRepository } from './equipment.repository';
import { LocationRepository } from '../location/location.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Equipment,
      EquipmentRepository,
      LocationRepository
    ])
  ],
  providers: [EquipmentService],
  controllers: [EquipmentController]
})
export class EquipmentModule {}
