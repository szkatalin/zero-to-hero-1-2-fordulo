import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export function ContainsZipCode(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'containsZipCode',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            !isNaN(parseInt(value.substr(0, 4), 10))
          ) {
            return true;
          }
          throw new BadRequestException(
            'Address first 4 characters should be zip code'
          );
        }
      }
    });
  };
}
