import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class HttpStatusService {
  getStatusDescription(statusCode: number): string | Error {
    return !!HttpStatus[statusCode]
      ? HttpStatus[statusCode]
      : new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
  }
}
