import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { Basket } from '../basket/entity/basket.entity';
import { Users } from 'src/api/users/entity/users.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  // async createOrder(userId: string): Promise<Order[]> {
  //   const user = await this.usersRepository.findOne({ where: { id: userId } });
  //   if (!user) throw new NotFoundException('User not found');

  //   const basketItems = await this.basketRepository.find({
  //     where: { user: { id: userId } },
  //   });
  //   if (!basketItems.length) throw new NotFoundException('Basket is empty');

  //   const orders = basketItems.map((item) => {
  //     return this.orderRepository.create({
  //       user,
  //       product: item.product,
  //       quantity: 1, // Default quantity as per basket item
  //       status: 'Pending',
  //       total_price: item.product.price, // Assuming price is a field in product entity
  //     });
  //   });

  //   await this.basketRepository.delete({ user: { id: userId } }); // Clear basket after creating order
  //   return this.orderRepository.save(orders);
  // }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { user: { id: userId } } });
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
