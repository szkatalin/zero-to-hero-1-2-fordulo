import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { HttpStatusService } from './http-status.service';

@Controller('http-status')
export class HttpStatusController {
  constructor(private httpStatusService: HttpStatusService) {}

  @Get('/getStatusDescription')
  getStatusDescription(
    @Query('statusCode', ParseIntPipe) statusCode: number
  ): string {
    return this.httpStatusService.getStatusDescription(statusCode);
  }
}
