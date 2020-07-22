import { Module } from '@nestjs/common';
import { CrudModule } from './crud/crud.module';
import { HttpStatusModule } from './http-status/http-status.module';
import { SquaresModule } from './squares/squares.module';

@Module({
  imports: [CrudModule, HttpStatusModule, SquaresModule]
})
export class AppModule {}
