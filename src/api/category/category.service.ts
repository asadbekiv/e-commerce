import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<Category> {
    const { name, description, parentCategoryId } = createCategoryDto;
    const category = new Category();
    category.name = name;
    category.description = description;

    if (file) {
      const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const imagePath = path.join(uploadsDir, file.originalname);
      fs.writeFileSync(imagePath, file.buffer);
      category.image = imagePath;
    }

    if (parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOneBy({
        id: parentCategoryId,
      });
      category.parentCategory = parentCategory;
    }

    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCategoryDto?: UpdateCategoryDto,
    file?: Express.Multer.File,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    const { name, description, parentCategoryId } = updateCategoryDto;
    category.name = name;
    category.description = description;

    if (file) {
      const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const uniqueSuffix = uuidv4();
      const imagePath = path.join(
        uploadsDir,
        `image-${uniqueSuffix}${path.extname(file.originalname)}`,
      );
      fs.writeFileSync(imagePath, file.buffer);
      category.image = imagePath;
    }

    if (parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOneBy({
        id: parentCategoryId,
      });
      category.parentCategory = parentCategory;
    } else {
      category.parentCategory = null;
    }

    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
