import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export function WordsConsists(
  options: { min?: number; max?: number },
  validationOptions?: ValidationOptions
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'wordsConsists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (typeof value === 'string' && typeof relatedValue === 'string') {
            if (options.max && value.split(' ').length > options.max) {
              throw new BadRequestException(
                `${propertyName} should not consists more than ${options.max} words`
              );
            }
            if (options.min && value.split(' ').length < options.min) {
              throw new BadRequestException(
                `${propertyName} should not consists less than ${options.min} words`
              );
            }
          }
          return true;
        }
      }
    });
  };
}
