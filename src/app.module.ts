import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { DatabaseModule } from './api/database/database.module';
import { ProductModule } from './api/product/product.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './api/auth/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { LoggerMiddleware } from './middlewares/request-logger';
import { CategoryModule } from './api/category/category.module';
import { BasketModule } from './api/basket/basket.module';
import { OrderModule } from './api/order/order.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
    BasketModule,
    OrderModule,
    CategoryModule,
    ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
