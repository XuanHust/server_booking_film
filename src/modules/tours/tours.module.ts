import { HttpException, HttpStatus, Module } from '@nestjs/common'
import { ToursService } from './tours.service'
import { ToursController } from './tours.controller'
import { extname } from 'path'
import { MulterModule } from '@nestjs/platform-express'

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/.(jpg|jpeg.webp)$/)) {
    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false)
  }
  cb(null, true)
}

@Module({
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
  imports: [MulterModule.register({ dest: './uploads' })]
})
export class ToursModule {}
