import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { CreateOrUpdateEmployeeDto } from './dto/create-or-update-employee.dto';
import { EmployeeService } from './employee.service';
import { baseUrl } from '../crud.controller';

@Controller(`${baseUrl}/employee`)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  createEmployee(@Body() createEmployeeDto: CreateOrUpdateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Put(':id')
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: CreateOrUpdateEmployeeDto
  ) {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  deleteEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() createEmployeeDto: CreateOrUpdateEmployeeDto
  ) {
    return this.employeeService.deleteEmployee(id);
  }
}
