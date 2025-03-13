import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from 'src/api/product/entity/product.entity';
import { Users } from 'src/api/users/entity/users.entity';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.basket, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: Users;

  @ManyToOne(() => Product, (product) => product.basket, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true, // Automatically load product details
  })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
