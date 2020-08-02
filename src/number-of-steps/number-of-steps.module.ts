import { Module } from '@nestjs/common';
import { NumberOfStepsController } from './number-of-steps.controller';
import { NumberOfStepsService } from './number-of-steps.service';

@Module({
  controllers: [NumberOfStepsController],
  providers: [NumberOfStepsService]
})
export class NumberOfStepsModule {}
