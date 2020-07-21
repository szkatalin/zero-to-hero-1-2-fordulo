import { Module } from '@nestjs/common';
import { HttpStatusController } from './http-status.controller';
import { HttpStatusService } from './http-status.service';

@Module({ controllers: [HttpStatusController], providers: [HttpStatusService] })
export class HttpStatusModule {}
