import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HttpStatusService {
  getStatusDescription(statusCode: number): string {
    if (!!HttpStatus[statusCode]) {
      return HttpStatus[statusCode].split('_').join(' ');
    }
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
}
