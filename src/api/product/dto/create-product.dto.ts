import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsUUID,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsNotEmpty()
  description: string;


  @IsNotEmpty()
  @IsOptional()
  price: string;

  @IsOptional()
  stock: string;

  @IsNotEmpty()
  @IsUUID()
  category_id: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image?: string[];
}
