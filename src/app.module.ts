import { Module } from '@nestjs/common';
import { CrudModule } from './crud/crud.module';
import { HttpStatusModule } from './http-status/http-status.module';
import { SquaresModule } from './squares/squares.module';
import { AppController } from './app.controller';

@Module({
  imports: [CrudModule, HttpStatusModule, SquaresModule],
  controllers: [AppController]
})
export class AppModule {}
