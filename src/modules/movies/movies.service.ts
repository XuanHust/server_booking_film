import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateMovieDto } from './dto/create-movies.dto'
import { EditMovieDto } from './dto/edit-movies.dto'

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    return await this.prisma.movies.create({ data: createMovieDto })
  }

  // async edit(editMovieDto: EditMovieDto) {
  //   re
  // }
}
