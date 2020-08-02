import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Employee } from './model/employee.entity';
import { LocationRepository } from '../location/location.repository';
import { JobType } from './model/job-type.enum';
import { EquipmentRepository } from '../equipment/equipment.repository';
import { EquipmentType } from '../equipment/model/equipment-type.enum';
import { Location } from '../location/model/location.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    let e = new Employee();

    e.name = createEmployeeDto.name;
    e.worksAt = await getCustomRepository(LocationRepository).getLocationById(
      createEmployeeDto.worksAt
    );
    e.job = JobType[createEmployeeDto.job];
    e.operates = createEmployeeDto.operates
      ? await getCustomRepository(EquipmentRepository).getEquipmentById(
          createEmployeeDto.operates
        )
      : null;
    e.salary = createEmployeeDto.salary;

    if (EmployeeRepository.isJobManager(e.job)) {
      await this.checkLocationAlreadyHaveManager(e.worksAt.id);
    }
    EmployeeRepository.checkIsEquipmentForEmployee(
      e.job,
      e.operates ? e.operates.type : null
    );
    await this.checkIsEquipmentAvailable(e.operates ? e.operates.id : null);
    EmployeeRepository.isEquipmentAtGoodLocation(
      e.worksAt,
      e.operates ? e.operates.locatedAt : null
    );
    await this.checkIsSalaryValid(e.salary, e.job, e.worksAt.id);

    return e.save();
  }

  async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let e = await this.getEmployeeById(id);

    if (updateEmployeeDto.name && e.name !== updateEmployeeDto.name) {
      e.name = updateEmployeeDto.name;
    }

    if (
      updateEmployeeDto.worksAt &&
      updateEmployeeDto.worksAt !== e.worksAt.id
    ) {
      e.worksAt = await getCustomRepository(LocationRepository).getLocationById(
        updateEmployeeDto.worksAt
      );
    }

    if (updateEmployeeDto.job && e.job !== updateEmployeeDto.job) {
      e.job = JobType[updateEmployeeDto.job];
    }

    if (
      updateEmployeeDto.operates &&
      updateEmployeeDto.operates !== e.operates.id
    ) {
      e.operates = await getCustomRepository(
        EquipmentRepository
      ).getEquipmentById(updateEmployeeDto.operates);
    }

    if (updateEmployeeDto.salary && updateEmployeeDto.salary !== e.salary) {
      e.salary = updateEmployeeDto.salary;
    }

    await this.checkIsEquipmentAvailable(
      e.operates ? e.operates.id : null,
      e.id
    );
    EmployeeRepository.isEquipmentAtGoodLocation(
      e.worksAt,
      e.operates ? e.operates.locatedAt : null
    );
    EmployeeRepository.checkIsEquipmentForEmployee(
      e.job,
      e.operates ? e.operates.type : null
    );
    if (EmployeeRepository.isJobManager(e.job)) {
      await this.checkLocationAlreadyHaveManager(e.worksAt.id, e.id);
    }
    await this.checkIsSalaryValid(
      updateEmployeeDto.salary,
      updateEmployeeDto.job ? updateEmployeeDto.job : e.job,
      e.worksAt.id,
      e.id
    );

    return e.save();
  }

  async deleteEmployee(id: number) {
    const employee = await this.getEmployeeById(id);
    return await employee.remove();
  }

  private async getEmployeeById(id: number) {
    const employee = await this.findOne({
      where: { id },
      relations: ['operates', 'worksAt']
    });
    if (employee) return employee;
    throw new NotFoundException(`Employee with ID "${id}" not found!`);
  }

  private async checkLocationAlreadyHaveManager(
    locationId: number,
    employeeId?: number
  ) {
    const manager = await this.getManagerOfLocation(locationId);
    if (
      (manager && employeeId === undefined) ||
      (manager && employeeId && manager.id !== employeeId)
    ) {
      throw new BadRequestException('Location already has a manager.');
    }
  }

  private async getManagerOfLocation(locationId: number): Promise<Employee> {
    return await this.createQueryBuilder('employee')
      .where('employee.worksAt = :locationId', { locationId })
      .where('employee.job = :type', { type: 'MANAGER' })
      .getOne();
  }

  private async getEmployeeByEquipmentId(equipmentId: number) {
    return this.findOne({
      where: {
        operates: equipmentId
      }
    });
  }

  private static isJobManager(job: JobType) {
    return JobType[job] === 'MANAGER';
  }

  private static checkIsEquipmentForEmployee(
    job: JobType,
    equipmentType: EquipmentType
  ) {
    if (
      equipmentType &&
      ((job === JobType.CASHIER &&
        equipmentType !== EquipmentType.CASH_REGISTER) ||
        (job === JobType.COOK && equipmentType !== EquipmentType.OVEN))
    ) {
      throw new BadRequestException(
        'The worker may only use equipment belonging to his/her own task! '
      );
    }
  }

  private static isEquipmentAtGoodLocation(
    employeeLocation: Location,
    equipmentLocation: Location
  ) {
    if (equipmentLocation && employeeLocation.id !== equipmentLocation.id) {
      throw new BadRequestException(
        'An employee can use an equipment at the same place!'
      );
    }
  }

  private async checkIsEquipmentAvailable(
    equipmentId: number,
    employeeId?: number
  ) {
    if (equipmentId) {
      const employee = await this.getEmployeeByEquipmentId(equipmentId);
      if (
        (employee && employeeId === undefined) ||
        (employee && employeeId && employeeId !== employee.id)
      ) {
        throw new BadRequestException(
          'This equipment is not available. Someone else already operates with it!'
        );
      }
    }
  }

  private async checkIsSalaryValid(
    salary: number,
    job: JobType,
    locationId: number,
    currentEmployeeId?: number
  ) {
    if (salary < 300) {
      throw new BadRequestException(
        'The salary cannot be less than 300 kopejka.'
      );
    }

    const avgSalary = await this.averageSalary(
      locationId,
      job,
      currentEmployeeId
    );
    if (
      avgSalary &&
      (salary < avgSalary * 0.8 || salary > avgSalary * 1.2) &&
      !EmployeeRepository.isJobManager(job)
    ) {
      throw new BadRequestException(
        'The salary cannot be more than 20% higher than the average salary of people working in the same position so far.'
      );
    }

    const managerOfLocation = await this.getManagerOfLocation(locationId);
    const topSalary = await this.topSalary(locationId, currentEmployeeId);

    if (
      (managerOfLocation &&
        managerOfLocation.salary < salary &&
        managerOfLocation.id !== currentEmployeeId) ||
      (job === 'MANAGER' && salary < topSalary && currentEmployeeId)
    ) {
      throw new BadRequestException(
        "The manager's salary can not be under any employee's salary."
      );
    }
  }

  private async averageSalary(
    locationId: number,
    job: JobType,
    exceptEmployeeId?: number
  ) {
    const query = this.createQueryBuilder('employee')
      .select('AVG(employee.salary)', 'avg')
      .where('employee.worksAt = :locationId', { locationId })
      .where('employee.job = :job', { job });

    if (exceptEmployeeId) {
      query.andWhere('employee.id NOT IN(:employeeId)', {
        employeeId: exceptEmployeeId
      });
    }
    const { avg } = await query.getRawOne();
    return avg;
  }

  private async topSalary(
    locationId: number,
    exceptEmployeeId?: number
  ): Promise<number> {
    let query = await this.createQueryBuilder('employee')
      .select('MAX(employee.salary)', 'max')
      .where('employee.worksAt = :locationId', { locationId });

    if (exceptEmployeeId) {
      query.andWhere('employee.id NOT IN(:employeeId)', {
        employeeId: exceptEmployeeId
      });
    }

    const { max } = await query.getRawOne();

    return max;
  }
}
