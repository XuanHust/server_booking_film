import { Controller, Get, Post, Query, UseGuards, Body, Patch, Param, Delete } from '@nestjs/common'
import { ToursService } from './tours.service'
import { CreateTourDto } from './dto/create-tour.dto'
import { UpdateTourDto } from './dto/update-tour.dto'
import { GetTourDto } from './dto/get-tour.dto'
import { AccessTokenGuard } from 'src/guards'

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto)
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
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto)
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
