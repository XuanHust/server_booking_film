import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTourDto } from './dto/create-tours.dto'
import { EditTourDto } from './dto/edit-tours.dto'
import { GetTourDto } from './dto/get-tours.dto'

@Injectable()
export class TourService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateTourDto) {
    return await this.prisma.tours.create({ data: createMovieDto })
  }

  async getMovie(id: number) {
    return await this.prisma.tours.findUnique({
      where: {
        id
      }
    })
  }

  async getMovies(query: GetTourDto) {
    const { page, size, genre, _q, title, director } = query
    const skip = (page - 1) * size

    const condition: any = {
      genre: genre,
      title: title,
      director: director
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

  async editMovie(id: number, editMovieDto: EditTourDto) {
    const exist = !!(await this.prisma.tours.count({ where: { id: id } }))
    if (exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }
    return await this.prisma.tours.update({
      where: {
        id
      },
      data: editMovieDto
    })
  }

  async deleteMovie(id: number) {
    const exist = !!(await this.prisma.tours.count({ where: { id: id } }))
    if (exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }

    return await this.prisma.tours.delete({
      where: {
        id
      }
    })
  }
}
