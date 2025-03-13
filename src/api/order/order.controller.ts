import { Controller, Post, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Post()
  // async createOrder(@Req() req) {
  //   return this.orderService.createOrder(req.user.id);
  // }

  @Get()
  @UseGuards(AuthGuard)
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('/self-orders')
  async getUserOrders(@Req() req) {
    return this.orderService.getUserOrders(req.user.id);
  }

  @Get('/:id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
}
