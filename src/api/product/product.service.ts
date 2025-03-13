import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../category/entity/category.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    body: CreateProductDto,
    files: Express.Multer.File[],
  ): Promise<Product> {
    const { name, description, price, stock, category_id } = body;

    const category = await this.categoryRepository.findOneBy({
      id: category_id,
    });
    if (!category) {
      throw new Error('Category not found');
    }
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;

    product.category = category;

    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const imagePaths: string[] = files.map((file) => {
      const uniqueSuffix = uuidv4();
      const imagePath = path.join(
        uploadsDir,
        `image-${uniqueSuffix}${path.extname(file.originalname)}`,
      );
      fs.writeFileSync(imagePath, file.buffer);
      return imagePath;
    });

    product.image = imagePaths.join(',');

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id });
  }
  async update(
    id: string,
    body: UpdateProductDto,
    files: Express.Multer.File[],
  ): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { name, description, price, stock, category_id } = body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;

    // Handle category update
    if (category_id) {
      const category = await this.categoryRepository.findOneBy({
        id: category_id,
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }

    // Handle image updates
    if (files.length > 0) {
      // Delete old images
      if (product.image) {
        const oldImages = product.image.split(',');
        oldImages.forEach((imgPath) => {
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        });
      }

      // Save new images
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const imagePaths: string[] = files.map((file) => {
        const uniqueSuffix = uuidv4();
        const imagePath = path.join(
          uploadsDir,
          `image-${uniqueSuffix}${path.extname(file.originalname)}`,
        );
        fs.writeFileSync(imagePath, file.buffer);
        return imagePath;
      });

      product.image = imagePaths.join(',');
    }

    await this.productRepository.save(product);
    return product;
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
