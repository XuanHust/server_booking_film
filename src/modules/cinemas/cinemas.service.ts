import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCinemaDto } from './dto/create-cinemas.dto'
import { EditCinemaDto } from './dto/edit-cinemas.dto'
import { GetCinemaDto } from './dto/get-cinemas.dto'

@Injectable()
export class CinemasService {
  constructor(private prisma: PrismaService) {}

  async create(createCinemaDto: CreateCinemaDto) {
    return await this.prisma.cinemas.create({ data: createCinemaDto })
  }

  async getCinema(id: number) {
    return await this.prisma.cinemas.findUnique({
      where: {
        id
      },
      include: {
        screenings: true
      }
    })
  }

  async getCinemas(query: GetCinemaDto) {
    const { page, size, _q, address, city } = query
    const skip = (page - 1) * size

    const condition: any = {
      address: address,
      city: city
    }
    if (_q) {
      condition['OR'] = {
        OR: [
          {
            name: {
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

    const total = await this.prisma.cinemas.count({
      where: condition
    })

    const data = await this.prisma.cinemas.findMany({
      where: condition,
      skip,
      take: +size
    })
    return {
      total,
      data
    }
  }

  async editCinema(id: number, editCinemaDto: EditCinemaDto) {
    const exist = !!(await this.prisma.cinemas.count({ where: { id: id } }))
    if (!exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }
    return await this.prisma.cinemas.update({
      where: {
        id
      },
      data: editCinemaDto
    })
  }

  async deleteCinema(id: number) {
    const exist = !!(await this.prisma.cinemas.count({ where: { id: id } }))
    if (!exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }

    return await this.prisma.cinemas.delete({
      where: {
        id
      }
    })
  }
}
