import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  OneToMany,
} from 'typeorm';
import { Order } from 'src/api/order/entity/order.entity';
import { Category } from 'src/api/category/entity/category.entity';
import { Basket } from 'src/api/basket/entity/basket.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  price: string;

  @Column()
  stock: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @Index()
  category: Category;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @OneToMany(() => Basket, (basket) => basket.product)
  basket: Basket[];

  @Column()
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
