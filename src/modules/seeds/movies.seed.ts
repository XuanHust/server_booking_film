import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { BaseSeed } from './common/base.seed'
import MoviesDatas from './data/movies.json'

@Injectable()
export class MoviesSeed extends BaseSeed {
  constructor(protected prisma: PrismaService) {
    super(prisma)
  }

  async checkRun(): Promise<boolean> {
    return (await this.prisma.movies.count()) === 0
  }

  async importSeed(): Promise<void> {
    await this.prisma.movies.createMany({
      data: MoviesDatas
    })
  }
}
