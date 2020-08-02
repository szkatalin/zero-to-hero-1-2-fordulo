import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ContainsZipCode } from '../../validators/contains-zip-code.validator';
import { WordsConsists } from '../../validators/words-consists.validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @WordsConsists({ max: 2 })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ContainsZipCode()
  address: string;
}
