import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { CreateOrUpdateEquipmentDto } from './dto/create-or-update-equipment.dto';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Post()
  createEquipment(
    @Body()
    createEquipmentDto: CreateOrUpdateEquipmentDto
  ) {
    return this.equipmentService.createEquipment(createEquipmentDto);
  }

  @Put(':id')
  updateEquipment(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateEquipmentDto: CreateOrUpdateEquipmentDto
  ) {
    return this.equipmentService.updateEquipment(id, updateEquipmentDto);
  }

  @Delete(':id')
  deleteEquipment(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.deleteEquipment(id);
  }
}
