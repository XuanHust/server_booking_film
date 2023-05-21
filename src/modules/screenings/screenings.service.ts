import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateScreeningDto } from './dto/create-screenings.dto'
import { EditScreeningDto } from './dto/edit-screenings.dto'
import { GetScreeningDto } from './dto/get-screenings.dto'

@Injectable()
export class ScreeningsService {
  constructor(private prisma: PrismaService) {}

  async create(createScreeningDto: CreateScreeningDto) {
    return await this.prisma.screenings.create({ data: createScreeningDto })
  }

  async getScreening(id: number) {
    return await this.prisma.screenings.findUnique({
      where: {
        id
      },
      include: {
        tickets: true
      }
    })
  }

  async getScreenings(query: GetScreeningDto) {
    const { page, size, movieId, _q, cinemaId, startTime } = query
    const skip = (page - 1) * size

    const condition: any = {
      movieId: movieId,
      cinemaId: cinemaId,
      startTime: startTime
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

    const total = await this.prisma.screenings.count({
      where: condition
    })

    const data = await this.prisma.screenings.findMany({
      where: condition,
      skip,
      take: +size
    })
    return {
      total,
      data
    }
  }

  async editScreening(id: number, editScreeningDto: EditScreeningDto) {
    const exist = !!(await this.prisma.screenings.count({ where: { id: id } }))
    if (exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }
    return await this.prisma.screenings.update({
      where: {
        id
      },
      data: editScreeningDto
    })
  }

  async deleteScreening(id: number) {
    const exist = !!(await this.prisma.screenings.count({ where: { id: id } }))
    if (exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }

    return await this.prisma.screenings.delete({
      where: {
        id
      }
    })
  }
}
