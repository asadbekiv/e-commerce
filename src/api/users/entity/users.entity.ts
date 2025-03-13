import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/api/order/entity/order.entity';
import { Basket } from 'src/api/basket/entity/basket.entity';
import { Role } from 'src/common/enums/role.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Basket, (basket) => basket.user)
  basket: Basket[];

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}
