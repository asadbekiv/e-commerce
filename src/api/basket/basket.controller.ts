import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('baskets')
@UseGuards(AuthGuard)
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('add')
  async addProductToBasket(
    @Req() req,
    @Body() createBasketDto: CreateBasketDto,
  ) {
    return this.basketService.addProductToBasket(req.user.id, createBasketDto);
  }

  @Get()
  async getUserBasket(@Req() req) {
    return this.basketService.getUserBasket(req.user.id);
  }

  @Patch('update/:id')
  async updateBasketItem(
    @Param('id') id: string,
    @Body() updateBasketDto: UpdateBasketDto,
  ) {
    return this.basketService.updateBasketItem(id, updateBasketDto);
  }

  @Delete('remove/:id')
  async removeBasketItem(@Param('id') id: string) {
    return this.basketService.removeBasketItem(id);
  }

  @Delete('clear')
  async clearBasket(@Req() req) {
    return this.basketService.clearBasket(req.user.id);
  }
}
