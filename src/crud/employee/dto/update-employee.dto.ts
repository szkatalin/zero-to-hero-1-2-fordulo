import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { JobType } from '../model/job-type.enum';
import { WordsConsists } from '../../validators/words-consists.validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsNotEmpty()
  @WordsConsists({ min: 2, max: 3 })
  name: string;

  @IsOptional()
  @IsEnum(JobType)
  job: JobType;

  @IsOptional()
  @IsInt()
  worksAt: number;

  @IsOptional()
  @IsInt()
  operates: number;

  @IsOptional()
  @IsInt()
  salary: number;
}
