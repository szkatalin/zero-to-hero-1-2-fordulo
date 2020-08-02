import { Module } from '@nestjs/common';
import { OrderGateway } from './order.gateway';
import { KitchenGateway } from './kitchen.gateway';

@Module({
  providers: [OrderGateway, KitchenGateway]
})
export class OrderModule {}
