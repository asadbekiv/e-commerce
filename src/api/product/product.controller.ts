import {
  Controller,
  Post,
  Body,
  Get,
  ParseUUIDPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productSerice: ProductService) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productSerice.create(body);
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
  async update(
    @Body() body: UpdateProductDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.productSerice.update(body, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.productSerice.remove(id);
  }
}
