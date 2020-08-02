import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { validate } from 'class-validator';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    return validate(createEmployeeDto).then(() =>
      this.employeeRepository.createEmployee(createEmployeeDto)
    );
  }

  async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return validate(updateEmployeeDto).then(() =>
      this.employeeRepository.updateEmployee(id, updateEmployeeDto)
    );
  }

  deleteEmployee(id: number) {
    return this.employeeRepository.deleteEmployee(id);
  }
}
