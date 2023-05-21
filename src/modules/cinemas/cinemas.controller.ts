import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from 'src/guards'
import { CinemasService } from './cinemas.service'
import { CreateCinemaDto } from './dto/create-Cinemas.dto'
import { EditCinemaDto } from './dto/edit-Cinemas.dto'
import { GetCinemaDto } from './dto/get-Cinemas.dto'

@Controller({
  path: '/cinemas',
  version: '1'
})
export class CinemasController {
  constructor(private CinemasService: CinemasService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.CinemasService.create(createCinemaDto)
  }

  @Get(':id')
  // @UseGuards(AccessTokenGuard)
  getCinema(@Param('id') id: number) {
    return this.CinemasService.getCinema(id)
  }

  @Get()
  // @UseGuards(AccessTokenGuard)
  getCinemas(@Query() query: GetCinemaDto) {
    return this.CinemasService.getCinemas(query)
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard)
  editCinema(@Param('id') id: number, @Body() editCinemaDto: EditCinemaDto) {
    return this.CinemasService.editCinema(id, editCinemaDto)
  }

  @Delete('delete/:id')
  @UseGuards(AccessTokenGuard)
  deleteCinema(@Param('id') id: number) {
    return this.CinemasService.deleteCinema(id)
  }
}
