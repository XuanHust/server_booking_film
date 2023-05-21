import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from 'src/guards'
import { CreateTourDto } from './dto/create-tours.dto'
import { EditTourDto } from './dto/edit-tours.dto'
import { GetTourDto } from './dto/get-tours.dto'
import { TourService } from './tours.service'

@Controller({
  path: '/tours',
  version: '1'
})
export class TourController {
  constructor(private moviesService: TourService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createMovieDto: CreateTourDto) {
    return this.moviesService.create(createMovieDto)
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  getMovie(@Param('id') id: number) {
    return this.moviesService.getMovie(id)
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  getMovies(@Query() query: GetTourDto) {
    return this.moviesService.getMovies(query)
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard)
  editMovie(@Param('id') id: number, @Body() editMovieDto: EditTourDto) {
    return this.moviesService.editMovie(id, editMovieDto)
  }

  @Delete('delete/:id')
  @UseGuards(AccessTokenGuard)
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(id)
  }
}
