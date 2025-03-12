import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Users } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async signIn(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);

  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }

  //   const payload = { sub: user.userId, username: user.username };

  //   // TODO: Generate a JWT and return it here
  //   // instead of the user object
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }

  async signUp(body: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(body);
  }
}
