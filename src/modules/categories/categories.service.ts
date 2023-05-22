import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from '../prisma/prisma.service'
import { GetCategoryDto } from './dto/get-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.categories.create({
      data: createCategoryDto
    })
  }

  async findAll(query: GetCategoryDto) {
    const { page, size, _q } = query
    const skip = (page - 1) * size

    const condition: any = {}
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
    return await this.prisma.categories.findFirst({
      where: {
        id: id
      },
      include: {
        tours: true
      }
    })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.categories.update({
      where: {
        id: id
      },
      data: updateCategoryDto
    })
  }

  async remove(id: number) {
    return await this.prisma.categories.delete({
      where: {
        id: id
      }
    })
  }
}
