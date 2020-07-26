import { Module } from '@nestjs/common';
import { HttpStatusModule } from './http-status/http-status.module';
import { SquaresModule } from './squares/squares.module';
import { AppController } from './app.controller';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [HttpStatusModule, SquaresModule, CrudModule],
  controllers: [AppController]
})
export class AppModule {}
