import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: string;

  @IsOptional()
  stock: string;

  @IsNotEmpty()
  category_id: number;

  @IsOptional()
  image: string;
}
