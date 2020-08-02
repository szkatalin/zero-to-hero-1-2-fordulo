import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min
} from 'class-validator';
import { JobType } from '../model/job-type.enum';
import { WordsConsists } from '../../validators/words-consists.validator';

export class CreateEmployeeDto {
  @IsDefined()
  @IsNotEmpty()
  @WordsConsists({ min: 2, max: 3 })
  name: string;

  @IsDefined()
  @IsEnum(JobType)
  job: JobType;

  @IsDefined()
  @IsInt()
  worksAt: number;

  @IsOptional()
  @IsInt()
  operates: number;

  @IsDefined()
  @IsInt()
  salary: number;
}
