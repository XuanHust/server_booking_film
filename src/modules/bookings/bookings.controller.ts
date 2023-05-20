import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { BookingsService } from './bookings.service'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateBookingDto } from './dto/update-booking.dto'
import { GetBookingDto } from './dto/get-booking.dto'
import { AccessTokenGuard } from 'src/guards'

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto)
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(@Query() query: GetBookingDto) {
    return this.bookingsService.findAll(query)
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto)
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id)
  }
}
