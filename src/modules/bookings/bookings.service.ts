import { Injectable } from '@nestjs/common'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateBookingDto } from './dto/update-booking.dto'
import { PrismaService } from '../prisma/prisma.service'
import { GetBookingDto } from './dto/get-booking.dto'

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    return await this.prisma.bookings.create({
      data: createBookingDto
    })
  }

  async findAll(query: GetBookingDto) {
    const { page, _q, size, userId, tourId, status } = query
    const skip = (page - 1) * size

    const condition: any = {
      userId: userId,
      tourId: tourId,
      status: status
    }

    if (_q) {
      condition['OR'] = {
        OR: [
          {
            include: {
              user: {
                contain: _q
              }
            }
          },
          {
            include: {
              tours: {
                contain: _q
              }
            }
          },
          {
            comment: {
              contain: _q
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
      take: +size,
      include: {
        user: true,
        tours: true
      }
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
      },
      include: {
        tours: true,
        user: true
      }
    })
  }

  async getMoviesBooingest() {
    const page = 1
    const size = 10
    const skip = (page - 1) * size

    const data = await this.prisma.tours.findMany({
      include: {
        bookings: true
      },
      skip,
      take: +size
    })
    const newDataBookingest = data
      .map((item) => ({
        ...item,
        numberBooking: item.bookings.length
      }))
      .sort((ob1, ob2) => ob2.numberBooking - ob1.numberBooking)
    return {
      data: newDataBookingest
    }
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
