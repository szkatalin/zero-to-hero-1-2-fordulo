import { JobType } from '../model/job-type.enum';

export class CreateOrUpdateEmployeeDto {
  name: string;
  job: JobType;
  worksAt: number;
  operates: number;
}
