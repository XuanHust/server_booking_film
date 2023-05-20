import { Injectable } from '@nestjs/common'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateBookingDto } from './dto/update-booking.dto'
import { GetBookingDto } from './dto/get-booking.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    return await this.prisma.bookings.create({
      data: createBookingDto
    })
  }

  async findAll(query: GetBookingDto) {
    const { page, size, movieId, _q, userId } = query
    const skip = (page - 1) * size

    const condition: any = {
      movieId: movieId,
      userId: userId
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

    const total = await this.prisma.bookings.count({
      where: condition
    })

    const data = await this.prisma.bookings.findMany({
      where: condition,
      skip,
      take: +size
    })
    return {
      total,
      data
    }
  }

  async findOne(id: number) {
    return await this.prisma.bookings.findFirst({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    return await this.prisma.bookings.update({
      where: {
        id: id
      },
      data: updateBookingDto
    })
  }

  async remove(id: number) {
    return await this.prisma.bookings.delete({
      where: {
        id: id
      }
    })
  }
}
