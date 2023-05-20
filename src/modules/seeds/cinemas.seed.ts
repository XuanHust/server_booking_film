import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { BaseSeed } from './common/base.seed'
import CinemasDatas from './data/cinemas.json'

@Injectable()
export class CinemasSeed extends BaseSeed {
  constructor(protected prisma: PrismaService) {
    super(prisma)
  }

  async checkRun(): Promise<boolean> {
    return (await this.prisma.cinemas.count()) === 0
  }

  async importSeed(): Promise<void> {
    await this.prisma.cinemas.createMany({
      data: CinemasDatas
    })
  }
}
