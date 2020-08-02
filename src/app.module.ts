import { Module } from '@nestjs/common';
import { HttpStatusModule } from './http-status/http-status.module';
import { SquaresModule } from './squares/squares.module';
import { AppController } from './app.controller';
import { CrudModule } from './crud/crud.module';
import { NumberOfStepsModule } from './number-of-steps/number-of-steps.module';
import { OrderModule } from './order/order.module';
import { OrderGateway } from './order/order.gateway';

@Module({
  imports: [
    HttpStatusModule,
    SquaresModule,
    CrudModule,
    NumberOfStepsModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
