import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { AccessTokenGuard } from 'src/guards'
import { CreateTourDto } from './dto/create-tour.dto'
import { GetTourDto } from './dto/get-tour.dto'
import { UpdateTourDto } from './dto/update-tour.dto'
import { ToursService } from './tours.service'

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'banner', maxCount: 1 },
        { name: 'poster', maxCount: 1 }
      ],
      {
        storage: diskStorage({
          destination: './files',
          filename(req, file, callback) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const ext = extname(file.originalname)
            const fileName = `${uniqueSuffix}${ext}`
            callback(null, fileName)
          }
        })
      }
    )
  )
  create(
    @UploadedFiles() files: { banner?: Express.Multer.File[]; poster?: Express.Multer.File[] },
    @Body() createTourDto: CreateTourDto
  ) {
    return this.toursService.create(createTourDto, files)
  }

  @Get()
  findAll(@Query() query: GetTourDto) {
    return this.toursService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'banner', maxCount: 1 },
        { name: 'poster', maxCount: 1 }
      ],
      {
        storage: diskStorage({
          destination: './files',
          filename(req, file, callback) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const ext = extname(file.originalname)
            const fileName = `${uniqueSuffix}${ext}`
            callback(null, fileName)
          }
        })
      }
    )
  )
  update(
    @UploadedFiles() files: { banner?: Express.Multer.File[]; poster?: Express.Multer.File[] },
    @Param('id') id: string,
    @Body() updateTourDto: UpdateTourDto
  ) {
    return this.toursService.update(+id, updateTourDto, files)
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id)
  }

  @Get('lastTour')
  findLastTour() {
    return this.toursService.findLastTour()
  }
}
