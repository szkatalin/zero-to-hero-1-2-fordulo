import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Employee } from './model/employee.entity';
import { CreateOrUpdateEmployeeDto } from './dto/create-or-update-employee.dto';
import { LocationRepository } from '../location/location.repository';
import { JobType } from './model/job-type.enum';
import { EquipmentRepository } from '../equipment/equipment.repository';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  async getEmployeeById(id: number) {
    const employee = await this.findOne({ where: { id } });
    if (employee) return employee;
    throw new NotFoundException(`Employee with ID "${id}" not found!`);
  }

  async hasLocationManager(locationId: number) {
    let query = this.createQueryBuilder('employee')
      .where('employee.worksAt = :locationId', { locationId })
      .where('employee.job = MANAGER');

    return (await query.getCount()) > 0;
  }

  async createEmployee(createEmployeeDto: CreateOrUpdateEmployeeDto) {
    const { name, job, worksAt, operates } = createEmployeeDto;
    let employee = new Employee();

    if (name && worksAt && job && operates) {
      employee.name = name;

      employee.worksAt = await getCustomRepository(
        LocationRepository
      ).getLocationById(worksAt);

      employee.operates = await getCustomRepository(
        EquipmentRepository
      ).getEquipmentById(operates);

      if (job === 'MANAGER') {
        const hasLocationAlreadyManager = await this.hasLocationManager(
          worksAt
        );

        if (hasLocationAlreadyManager) {
          throw new BadRequestException();
        }

        employee.job = JobType.MANAGER;
      } else {
        employee.job = job;
      }
    } else {
      throw new BadRequestException();
    }

    return employee.save();
  }

  async updateEmployee(
    id: number,
    createEmployeeDto: CreateOrUpdateEmployeeDto
  ) {
    // TODO
    return;
  }

  deleteEmployee(id: number) {
    // TODO
    return;
  }
}
