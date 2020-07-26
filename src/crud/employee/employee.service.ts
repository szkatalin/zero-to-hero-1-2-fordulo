import { Injectable } from '@nestjs/common';
import { CreateOrUpdateEmployeeDto } from './dto/create-or-update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository
  ) {}

  async createEmployee(createEmployeeDto: CreateOrUpdateEmployeeDto) {
    return this.employeeRepository.createEmployee(createEmployeeDto);
  }

  async updateEmployee(
    id: number,
    createEmployeeDto: CreateOrUpdateEmployeeDto
  ) {
    return this.employeeRepository.updateEmployee(id, createEmployeeDto);
  }

  deleteEmployee(id: number) {
    return this.employeeRepository.deleteEmployee(id);
  }
}
