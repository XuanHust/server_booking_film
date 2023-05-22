import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './config/configuration'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { UserModule } from './modules/user/user.module'
import { ToursModule } from './modules/tours/tours.module'
import { BookingsModule } from './modules/bookings/bookings.module'
import { ReviewsModule } from './modules/reviews/reviews.module'
import { CategoriesModule } from './modules/categories/categories.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => configuration]
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UserModule,
    AuthModule,
    ToursModule,
    BookingsModule,
    ReviewsModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
