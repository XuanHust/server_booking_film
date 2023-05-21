import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { plainToClass } from 'class-transformer'
import { PrismaService } from '../prisma/prisma.service'
import { EditUserDto } from './dto'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserDto } from './dto/get-user.dto'
import { UserEntity } from './entities/user.entity'
import * as argon from 'argon2'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const usernameUnique = await this.prisma.user.count({
      where: {
        username: createUserDto.username
      }
    })
    if (usernameUnique) {
      throw new ConflictException('Username đã tồn tại. Vui lòng thử lại!')
    }

    const emailUnique = await this.prisma.user.count({
      where: {
        email: createUserDto.email
      }
    })
    if (emailUnique) {
      throw new ConflictException('Email đã được sử dụng. Vui lòng thử lại!')
    }

    const hash = await argon.hash(createUserDto.password)
    const user = await this.prisma.user
      .create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          phoneNumber: createUserDto.phoneNumber,
          password: hash,
          name: createUserDto.name
        }
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect')
          }
        }
        throw error
      })

    return plainToClass(UserEntity, user)
  }

  async changePasswordUser(uid: number, newPassword: string): Promise<boolean> {
    const hash = await argon.hash(newPassword)
    await this.prisma.user.updateMany({
      where: {
        id: uid
      },
      data: {
        password: hash
      }
    })
    return true
  }

  async findById(userId: number): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        bookings: true,
        reviews: true
      }
    })

    return user
  }

  async editUser(userId: number, dto: EditUserDto): Promise<UserEntity> {
    const existUser = await this.prisma.user.count({
      where: {
        id: userId
      }
    })
    if (!existUser) {
      throw new ConflictException('Tài khoản không tồn tại!')
    }

    if (dto.email) {
      const emailUnique = await this.prisma.user.count({
        where: {
          email: dto.email,
          NOT: {
            id: userId
          }
        }
      })
      if (emailUnique) {
        throw new ConflictException('Email đã được sử dụng. Vui lòng thử lại!')
      }
    }
    const user = await this.prisma.user
      .update({
        where: {
          id: userId
        },
        data: {
          ...dto
        }
      })
      .catch((error) => {
        throw error
      })
    return plainToClass(UserEntity, user)
  }

  // get user list
  async getUserList(query: GetUserDto) {
    const { page = 1, size = 10, _q, active, role, name } = query
    const skip = (page - 1) * size
    const queryCustom = {
      skip,
      take: +size,
      where: {
        active: typeof active === 'number' ? !!active : undefined,
        role,
        name: {
          contains: name
        }
      }
    }
    if (_q) {
      queryCustom.where['OR'] = {
        OR: [
          {
            name: {
              contains: _q
            }
          },
          {
            username: {
              contains: _q
            }
          },
          {
            email: {
              contains: _q
            }
          },
          {
            phoneNumber: {
              contains: _q
            }
          }
        ]
      }
    }
    const [total, userList] = await Promise.all([
      this.prisma.user.count({ where: queryCustom.where }),
      this.prisma.user.findMany({
        ...queryCustom,
        orderBy: [
          {
            firstName: 'asc'
          },
          { lastName: 'asc' },
          {
            middleName: 'asc'
          }
        ]
      })
    ])
    return {
      data: plainToClass(UserEntity, <any[]>userList),
      pagination: {
        total,
        page,
        size,
        pageCount: Math.ceil(parseInt(total + '') / size)
      }
    }
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({ where: { id: id } })
  }
}
