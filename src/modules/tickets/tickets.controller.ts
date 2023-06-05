import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from 'src/guards'
import { CreateTicketDto } from './dto/create-tickets.dto'
import { EditTicketDto } from './dto/edit-tickets.dto'
import { GetTicketDto } from './dto/get-tickets.dto'
import { TicketsService } from './tickets.service'

@Controller({
  path: '/tickets',
  version: '1'
})
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto)
  }

  @Get(':id')
  // @UseGuards(AccessTokenGuard)
  getTicket(@Param('id') id: number) {
    return this.ticketsService.getTicket(id)
  }

  @Get()
  // @UseGuards(AccessTokenGuard)
  getTickets(@Query() query: GetTicketDto) {
    return this.ticketsService.getTickets(query)
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard)
  editTicket(@Param('id') id: number, @Body() editTicketDto: EditTicketDto) {
    return this.ticketsService.editTicket(id, editTicketDto)
  }

  @Delete('delete/:id')
  @UseGuards(AccessTokenGuard)
  deleteTicket(@Param('id') id: number) {
    return this.ticketsService.deleteTicket(id)
  }
}
