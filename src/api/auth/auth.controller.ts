import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decarator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: SignInDto) {
    console.log(body);

    return this.authService.signIn(body.username, body.password);
  }

  @Post('refresh')
  async refresh(@Body() { token }: { token: string }) {
    return this.authService.refreshToken(token);
  }
}
