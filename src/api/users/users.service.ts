import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UpdateUsertDto } from './dto/update-user.dto';
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };
    const createdUser = await this.userRepository.create(
      userWithHashedPassword,
    );
    const savedUser = await this.userRepository.save(createdUser);
    return savedUser;
  }

  async getAll(): Promise<Users[]> {
    const users = await this.userRepository.find();
    console.log(users);

    return users;
  }

  async getOne(id: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async update(body: UpdateUsertDto, id: string): Promise<Users | null> {
    await this.userRepository.update(id, body);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<any> {
    await this.userRepository.delete(id);
  }
}
