import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decarator';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() body: CreateUserDto) {

    return this.authService.signUp(body);
  }
}
