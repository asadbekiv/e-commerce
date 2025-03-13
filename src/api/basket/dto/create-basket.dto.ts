import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateBasketDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsNotEmpty()
  @IsUUID()
  @IsNumber()
  quantity: number;
}
