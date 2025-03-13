import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { Basket } from './entity/basket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entity/users.entity';
import { Product } from '../product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Basket,Users,Product])],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
