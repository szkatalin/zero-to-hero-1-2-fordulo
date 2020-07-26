import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Employee } from './model/employee.entity';
import { CreateOrUpdateEmployeeDto } from './dto/create-or-update-employee.dto';
import { LocationRepository } from '../location/location.repository';
import { JobType } from './model/job-type.enum';
import { EquipmentRepository } from '../equipment/equipment.repository';
import { EquipmentType } from '../equipment/model/equipment-type.enum';
import { Location } from '../location/model/location.entity';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  async createEmployee(createEmployeeDto: CreateOrUpdateEmployeeDto) {
    let employee = new Employee();

    const { name, job } = createEmployeeDto;
    const worksAt = await getCustomRepository(
      LocationRepository
    ).getLocationById(createEmployeeDto.worksAt);
    const operates = await getCustomRepository(
      EquipmentRepository
    ).getEquipmentById(createEmployeeDto.operates);

    if (name && worksAt && job && operates) {
      employee.name = name;
      employee.worksAt = worksAt;
      employee.operates = operates;

      if (this.isJobExists(job)) {
        if (this.isJobManager(job)) {
          if (await this.hasLocationManager(worksAt.id)) {
            throw new BadRequestException(
              'One Location should have only one Manager'
            );
          }
        }
        employee.job = JobType[job];
      }

      if (
        this.isEquipmentForEmployee(job, operates.type) &&
        (await this.isEquipmentAvailable(operates.id)) &&
        this.isEquipmentAtGoodLocation(worksAt, operates.locatedAt)
      ) {
        employee.operates = await getCustomRepository(
          EquipmentRepository
        ).getEquipmentById(operates.id);
      }
    } else {
      throw new BadRequestException(
        'Every field should be filled in the request body!'
      );
    }

    return employee.save();
  }

  async updateEmployee(
    id: number,
    updateEmployeeDto: CreateOrUpdateEmployeeDto
  ) {
    let employee = await this.getEmployeeById(id);
    console.log(employee);

    if (updateEmployeeDto.name && employee.name !== updateEmployeeDto.name) {
      employee.name = updateEmployeeDto.name;
    }

    if (
      updateEmployeeDto.worksAt &&
      updateEmployeeDto.worksAt !== employee.worksAt.id
    ) {
      employee.worksAt = await getCustomRepository(
        LocationRepository
      ).getLocationById(updateEmployeeDto.worksAt);
    }

    const newEquipment = await getCustomRepository(
      EquipmentRepository
    ).getEquipmentById(updateEmployeeDto.operates);

    if (
      updateEmployeeDto.job &&
      this.isJobExists(updateEmployeeDto.job) &&
      employee.job !== updateEmployeeDto.job &&
      this.isEquipmentForEmployee(updateEmployeeDto.job, newEquipment.type)
    ) {
      if (this.isJobManager(updateEmployeeDto.job)) {
        if (await this.hasLocationManager(updateEmployeeDto.worksAt)) {
          throw new BadRequestException(
            'One Location should have only one Manager'
          );
        }
      }
      employee.job = JobType[updateEmployeeDto.job];
    }

    if (
      updateEmployeeDto.operates &&
      updateEmployeeDto.operates !== employee.operates.id
    ) {
      if (
        (await this.isEquipmentAvailable(newEquipment.id)) &&
        this.isEquipmentAtGoodLocation(employee.worksAt, newEquipment.locatedAt)
      ) {
        employee.operates = newEquipment;
      }
    }

    return employee.save();
  }

  async deleteEmployee(id: number) {
    const employee = await this.getEmployeeById(id);
    return await employee.remove();
  }

  private async getEmployeeById(id: number) {
    const employee = await this.findOne({ where: { id } });
    if (employee) return employee;
    throw new NotFoundException(`Employee with ID "${id}" not found!`);
  }

  private async hasLocationManager(locationId: number) {
    let query = this.createQueryBuilder('employee')
      .where('employee.worksAt = :locationId', { locationId })
      .where('employee.job = :type', { type: 'MANAGER' });

    return (await query.getCount()) > 0;
  }

  private async getEmployeeByEquipmentId(equipmentId: number) {
    return this.findOne({
      where: {
        operates: equipmentId
      }
    });
  }

  private isJobManager(job: JobType) {
    return JobType[job] === 'MANAGER';
  }

  private isJobExists(job: JobType) {
    if (JobType[job] === undefined) {
      throw new BadRequestException('This type of job does not exist!');
    }
    return true;
  }

  private isEquipmentForEmployee(job: JobType, equipmentType: EquipmentType) {
    if (
      ((job === JobType.MANAGER || job === JobType.CASHIER) &&
        equipmentType !== EquipmentType.CASH_REGISTER) ||
      (job === JobType.COOK && equipmentType !== EquipmentType.OVEN)
    ) {
      throw new BadRequestException(
        'The worker may only use equipment belonging to his/her own task! '
      );
    }
    return true;
  }

  private isEquipmentAtGoodLocation(
    employeeLocation: Location,
    equipmentLocation: Location
  ) {
    if (employeeLocation.id !== equipmentLocation.id) {
      throw new BadRequestException(
        'An employee can use an equipment at the same place!'
      );
    }
    return true;
  }

  private async isEquipmentAvailable(equipmentId: number) {
    const employee = await this.getEmployeeByEquipmentId(equipmentId);
    if (employee !== undefined) {
      throw new BadRequestException(
        'This equipment is not available. Someone else already operates with it!'
      );
    }
    return true;
  }
}
