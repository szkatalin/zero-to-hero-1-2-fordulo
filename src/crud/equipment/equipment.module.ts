import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './model/equipment.entity';
import { EquipmentRepository } from './equipment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, EquipmentRepository])],
  providers: [EquipmentService],
  controllers: [EquipmentController]
})
export class EquipmentModule {}
