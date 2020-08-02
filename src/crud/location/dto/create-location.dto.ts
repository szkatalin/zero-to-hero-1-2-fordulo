import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ContainsZipCode } from '../../validators/contains-zip-code.validator';
import { WordsConsists } from '../../validators/words-consists.validator';

export class CreateLocationDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @WordsConsists({ max: 2 })
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ContainsZipCode()
  address: string;
}
