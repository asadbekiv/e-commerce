import { Module } from '@nestjs/common';
import { UsersService } from './api/users/users.service';
import { AuthService } from './api/auth/auth.service';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { DatabaseModule } from './api/database/database.module';
import { ProductModule } from './api/product/product.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, ProductModule],
  controllers: [],
  providers: [UsersService, AuthService],
})
export class AppModule {}
