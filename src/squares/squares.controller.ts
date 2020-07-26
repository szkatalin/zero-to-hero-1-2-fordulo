import { Controller, Get, Body } from '@nestjs/common';
import { Point } from './point';
import { SquaresService } from './squares.service';

@Controller('squares')
export class SquaresController {
  constructor(private squaresService: SquaresService) {}

  @Get('/getNumberOfSquares')
  getNumberOfSquares(@Body('listOfPoints') listOfPoints: Point[]): number {
    return this.squaresService.getNumberOfSquares(listOfPoints);
  }
}
