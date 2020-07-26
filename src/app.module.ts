import { Module } from '@nestjs/common';
import { HttpStatusModule } from './http-status/http-status.module';
import { SquaresModule } from './squares/squares.module';
import { AppController } from './app.controller';

@Module({
  imports: [HttpStatusModule, SquaresModule],
  controllers: [AppController]
})
export class AppModule {}
