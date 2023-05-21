import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './config/configuration'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { UserModule } from './modules/user/user.module'
import { TourModule } from './modules/tours/tours.module'
import { CinemasModule } from './modules/cinemas/cinemas.module'
import { ScreeningsModule } from './modules/screenings/screenings.module'
import { TicketsModule } from './modules/tickets/tickets.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => configuration]
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UserModule,
    AuthModule,
    TourModule,
    CinemasModule,
    ScreeningsModule,
    TicketsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
