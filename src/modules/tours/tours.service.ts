import { Injectable } from '@nestjs/common'
import { CreateTourDto } from './dto/create-tour.dto'
import { UpdateTourDto } from './dto/update-tour.dto'
import { PrismaService } from '../prisma/prisma.service'
import { GetTourDto } from './dto/get-tour.dto'

@Injectable()
export class ToursService {
  constructor(private prisma: PrismaService) {}

  async create(createTourDto: CreateTourDto) {
    return await this.prisma.tours.create({
      data: createTourDto
    })
  }

  async findAll(query: GetTourDto) {
    const { page, size, _q, endDate, startDate } = query
    const skip = (page - 1) * size

    const condition: any = {
      endDate: endDate,
      startDate: startDate
    }
    if (_q) {
      condition['OR'] = {
        OR: [
          {
            tourName: {
              contains: _q
            }
          },
          {
            tourName: {
              contains: _q
            }
          }
        ]
      }
    }

    const total = await this.prisma.tours.count({
      where: condition
    })

    const data = await this.prisma.tours.findMany({
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
    return await this.prisma.tours.findFirst({
      where: {
        id: id
      },
      include: {
        reviews: true,
        bookings: true
      }
    })
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    return await this.prisma.tours.update({
      where: {
        id: id
      },
      data: updateTourDto
    })
  }

  async remove(id: number) {
    return await this.prisma.tours.delete({
      where: {
        id: id
      }
    })
  }
}
