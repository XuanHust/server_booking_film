import { Injectable } from '@nestjs/common'
import { CreateTourDto } from './dto/create-tour.dto'
import { UpdateTourDto } from './dto/update-tour.dto'
import { PrismaService } from '../prisma/prisma.service'
import { GetTourDto } from './dto/get-tour.dto'
import { Tours } from '@prisma/client'

@Injectable()
export class ToursService {
  constructor(private prisma: PrismaService) {}

  async create(
    createTourDto: CreateTourDto,
    files: {
      poster?: Express.Multer.File[]
      banner?: Express.Multer.File[]
    }
  ) {
    return await this.prisma.tours.create({
      data: {
        ...createTourDto,
        banner: files.banner[0].filename,
        poster: files.poster[0].filename
      }
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
      include: {
        reviews: true
      },
      skip,
      take: +size
    })
    const newData: Tours[] = data.map((item) => ({
      ...item,
      rate:
        item.reviews.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.rating
        }, 0) / item.reviews.length
    }))
    return {
      total,
      data: newData
    }
  }

  async findOne(id: number) {
    const data = await this.prisma.tours.findFirst({
      where: {
        id: id
      },
      include: {
        reviews: true,
        bookings: true
      }
    })
    const newData: Tours = {
      ...data,
      rate:
        data.reviews.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.rating
        }, 0) / data.reviews.length
    }
    return newData
  }

  async update(
    id: number,
    updateTourDto: UpdateTourDto,
    files?: {
      poster?: Express.Multer.File[]
      banner?: Express.Multer.File[]
    }
  ) {
    return await this.prisma.tours.update({
      where: {
        id: id
      },
      data: {
        ...updateTourDto,
        banner: files.banner[0].filename,
        poster: files.poster[0].filename
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.tours.delete({
      where: {
        id: id
      }
    })
  }

  async findLastTour() {
    const page = 1
    const size = 10
    const skip = (page - 1) * size

    const total = await this.prisma.tours.count({
      orderBy: {
        createdAt: 'desc'
      }
    })

    const data = await this.prisma.tours.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        reviews: true
      },
      skip,
      take: +size
    })
    const newData: Tours[] = data.map((item) => ({
      ...item,
      rate:
        item.reviews.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.rating
        }, 0) / item.reviews.length
    }))
    return {
      total,
      data: newData
    }
  }
}