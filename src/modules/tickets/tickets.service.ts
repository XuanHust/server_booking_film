import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTicketDto } from './dto/create-tickets.dto'
import { EditTicketDto } from './dto/edit-tickets.dto'
import { GetTicketDto } from './dto/get-tickets.dto'

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    return await this.prisma.tickets.create({ data: createTicketDto })
  }

  async getTicket(id: number) {
    return await this.prisma.tickets.findUnique({
      where: {
        id
      }
    })
  }

  async getTickets(query: GetTicketDto) {
    const { page, size, screeningId, _q, seatNumber } = query
    const skip = (page - 1) * size

    const condition: any = {
      screeningId: screeningId,
      seatNumber: seatNumber
    }
    if (_q) {
      condition['OR'] = {
        OR: [
          {
            code: {
              contains: _q
            }
          },
          {
            name: {
              contains: _q
            }
          }
        ]
      }
    }

    const total = await this.prisma.tickets.count({
      where: condition
    })

    const data = await this.prisma.tickets.findMany({
      where: condition,
      skip,
      take: +size
    })
    return {
      total,
      data
    }
  }

  async editTicket(id: number, editTicketDto: EditTicketDto) {
    const exist = !!(await this.prisma.tickets.count({ where: { id: id } }))
    if (exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }
    return await this.prisma.tickets.update({
      where: {
        id
      },
      data: editTicketDto
    })
  }

  async deleteTicket(id: number) {
    const exist = !!(await this.prisma.tickets.count({ where: { id: id } }))
    if (exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }

    return await this.prisma.tickets.delete({
      where: {
        id
      }
    })
  }
}
