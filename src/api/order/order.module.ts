import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Basket } from '../basket/entity/basket.entity';
import { Users } from '../users/entity/users.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Basket, Users])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
