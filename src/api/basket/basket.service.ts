import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket } from './entity/basket.entity';
import { Users } from 'src/api/users/entity/users.entity';
import { Product } from 'src/api/product/entity/product.entity';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProductToBasket(
    userId: string,
    createBasketDto: CreateBasketDto,
  ): Promise<Basket> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: createBasketDto.product_id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const basketItem = this.basketRepository.create({ user, product });
    return await this.basketRepository.save(basketItem);
  }

  async getUserBasket(userId: string): Promise<Basket[]> {
    return await this.basketRepository.find({
      where: { user: { id: userId } },
    });
  }

  async updateBasketItem(
    id: string,
    updateBasketDto: UpdateBasketDto,
  ): Promise<Basket> {
    const basketItem = await this.basketRepository.findOne({ where: { id } });
    if (!basketItem) {
      throw new NotFoundException('Basket item not found');
    }

    Object.assign(basketItem, updateBasketDto);
    return await this.basketRepository.save(basketItem);
  }

  async removeBasketItem(id: string): Promise<void> {
    const result = await this.basketRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Basket item not found');
    }
  }

  async clearBasket(userId: string): Promise<void> {
    await this.basketRepository.delete({ user: { id: userId } });
  }
}
