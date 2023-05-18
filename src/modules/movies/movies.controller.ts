import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from 'src/guards'
import { CreateMovieDto } from './dto/create-movies.dto'
import { EditMovieDto } from './dto/edit-movies.dto'
import { GetMovieDto } from './dto/get-movies.dto'
import { MoviesService } from './movies.service'

@Controller({
  path: '/movies',
  version: '1'
})
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto)
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  getMovie(@Param('id') id: number) {
    return this.moviesService.getMovie(id)
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  getMovies(@Query() query: GetMovieDto) {
    return this.moviesService.getMovies(query)
  }

  @Put()
  @UseGuards(AccessTokenGuard)
  editMovie(@Param('id') id: number, @Body() editMovieDto: EditMovieDto) {
    return this.moviesService.editMovie(id, editMovieDto)
  }

  @Delete()
  @UseGuards(AccessTokenGuard)
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(id)
  }
}
