import {
  Controller,
  Post,
  Body,
  Get,
  ParseUUIDPipe,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';


@Controller('product')
export class ProductController {
  constructor(private readonly productSerice: ProductService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  create(
    @Body() body: CreateProductDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    return this.productSerice.create(body, files.images);
  }

  @Get()
  getAll() {
    return this.productSerice.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productSerice.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  async update(
    @Body() body: UpdateProductDto,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    const updatedProduct = await this.productSerice.findOne(id);
    if (!updatedProduct) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.productSerice.update(id, body, files.images);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.productSerice.remove(id);
  }
}
