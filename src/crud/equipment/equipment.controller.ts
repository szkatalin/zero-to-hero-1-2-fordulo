import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Controller(`api/equipment`)
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Post()
  createEquipment(
    @Body(ValidationPipe)
    createEquipmentDto: CreateEquipmentDto
  ) {
    return this.equipmentService.createEquipment(createEquipmentDto);
  }

  @Put(':id')
  updateEquipment(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateEquipmentDto: UpdateEquipmentDto
  ) {
    return this.equipmentService.updateEquipment(id, updateEquipmentDto);
  }

  @Delete(':id')
  deleteEquipment(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.deleteEquipment(id);
  }
}
