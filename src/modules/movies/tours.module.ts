import { Module } from '@nestjs/common'
import { TourController } from './tours.controller'
import { TourService } from './tours.service'

@Module({
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService]
})
export class TourModule {}
