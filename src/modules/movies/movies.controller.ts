import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from 'src/guards'
import { CreateMovieDto } from './dto/create-movies.dto'
import { EditMovieDto } from './dto/edit-movies.dto'
import { GetMovieDto } from './dto/get-movies.dto'
import { MoviesService } from './movies.service'
import { UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { UploadedFiles } from '@nestjs/common'

@Controller({
  path: '/movies',
  version: '1'
})
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

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
    @Body() createMovieDto: CreateMovieDto
  ) {
    return this.moviesService.create(createMovieDto, files)
  }

  @Get('/lastFilm')
  findLastTour() {
    return this.moviesService.findLastFilm()
  }

  @Get('/bookingest')
  getMoviesBooingest() {
    return this.moviesService.getMoviesBooingest()
  }

  @Get(':id')
  // @UseGuards(AccessTokenGuard)
  getMovie(@Param('id') id: string) {
    return this.moviesService.getMovie(+id)
  }

  @Get()
  // @UseGuards(AccessTokenGuard)
  getMovies(@Query() query: GetMovieDto) {
    return this.moviesService.getMovies(query)
  }

  @Put(':id')
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
  editMovie(
    @UploadedFiles() files: { banner?: Express.Multer.File[]; poster?: Express.Multer.File[] },
    @Param('id') id: number,
    @Body() editMovieDto: EditMovieDto
  ) {
    return this.moviesService.editMovie(id, editMovieDto, files)
  }

  @Delete('delete/:id')
  @UseGuards(AccessTokenGuard)
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(id)
  }
}
