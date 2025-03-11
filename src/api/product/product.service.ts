import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(body: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(body);
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }
  async update(body: UpdateProductDto, id: string): Promise<Product | null> {
    console.log(body);

    await this.productRepository.update(id, body);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
