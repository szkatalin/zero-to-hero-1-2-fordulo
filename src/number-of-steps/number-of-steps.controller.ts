import { Controller, Get, ParseArrayPipe, ParseIntPipe, Query } from '@nestjs/common';
import { NumberOfStepsService } from './number-of-steps.service';

@Controller('number-of-steps')
export class NumberOfStepsController {
  constructor(private readonly numberOfStepsService: NumberOfStepsService) {}

  @Get('getNumberOfSteps')
  getNumberOfSteps(
    @Query('numberOfStair', ParseIntPipe) numberOfStair: number,
    @Query('stepSizeList', ParseArrayPipe) stepSizeList: string[]
  ) {
    return this.numberOfStepsService.getNumberOfSteps(
      numberOfStair,
      stepSizeList
    );
  }
}
