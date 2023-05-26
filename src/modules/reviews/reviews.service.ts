import { Injectable } from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { PrismaService } from '../prisma/prisma.service'
import { GetReviewDto } from './dto/get-review.dto'

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.prisma.reviews.create({
      data: createReviewDto
    })
  }

  async findAll(query: GetReviewDto) {
    const { page, size, userId, tourId, rating } = query
    const skip = (page - 1) * size

    const condition: any = {
      userId: userId,
      tourId: tourId,
      rating: rating
    }

    const total = await this.prisma.reviews.count({
      where: condition
    })

    const data = await this.prisma.reviews.findMany({
      include: {
        user: true,
        tours: true
      },
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
    return await this.prisma.reviews.findFirst({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return await this.prisma.reviews.update({
      where: {
        id: id
      },
      data: updateReviewDto
    })
  }

  async remove(id: number) {
    return await this.prisma.reviews.delete({
      where: {
        id: id
      }
    })
  }
}
