import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateMovieDto } from './dto/create-movies.dto'
import { EditMovieDto } from './dto/edit-movies.dto'
import { GetMovieDto } from './dto/get-movies.dto'

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    return await this.prisma.movies.create({ data: createMovieDto })
  }

  async getMovie(id: number) {
    return await this.prisma.movies.findUnique({
      where: {
        id
      },
      include: {
        screenings: true,
        reviews: true,
        bookings: true
      }
    })
  }

  async getMovies(query: GetMovieDto) {
    const { page, size, genre, _q, director } = query
    const skip = (page - 1) * size

    const condition: any = {
      genre: genre,
      director: director
    }
    if (_q) {
      condition['OR'] = {
        OR: [
          {
            title: {
              contains: _q
            }
          },
          {
            title: {
              contains: _q
            }
          }
        ]
      }
    }

    const total = await this.prisma.movies.count({
      where: condition
    })

    const data = await this.prisma.movies.findMany({
      where: condition,
      skip,
      take: +size
    })
    return {
      total,
      data
    }
  }

  async editMovie(id: number, editMovieDto: EditMovieDto) {
    const exist = !!(await this.prisma.movies.count({ where: { id: id } }))
    if (!exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }
    return await this.prisma.movies.update({
      where: {
        id
      },
      data: editMovieDto
    })
  }

  async deleteMovie(id: number) {
    const exist = !!(await this.prisma.movies.count({ where: { id: id } }))
    if (!exist) {
      throw new BadRequestException('Có lỗi xảy ra!')
    }

    return await this.prisma.movies.delete({
      where: {
        id
      }
    })
  }
}
