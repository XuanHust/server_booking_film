import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from 'src/guards'
import { CreateScreeningDto } from './dto/create-screenings.dto'
import { EditScreeningDto } from './dto/edit-screenings.dto'
import { GetScreeningDto } from './dto/get-screenings.dto'
import { ScreeningsService } from './screenings.service'

@Controller({
  path: '/screenings',
  version: '1'
})
export class ScreeningsController {
  constructor(private screeningsService: ScreeningsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createScreeningDto: CreateScreeningDto) {
    return this.screeningsService.create(createScreeningDto)
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  getScreening(@Param('id') id: number) {
    return this.screeningsService.getScreening(id)
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  getscreenings(@Query() query: GetScreeningDto) {
    return this.screeningsService.getScreenings(query)
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard)
  editScreening(@Param('id') id: number, @Body() editScreeningDto: EditScreeningDto) {
    return this.screeningsService.editScreening(id, editScreeningDto)
  }

  @Delete('delete/:id')
  @UseGuards(AccessTokenGuard)
  deleteScreening(@Param('id') id: number) {
    return this.screeningsService.deleteScreening(id)
  }
}
