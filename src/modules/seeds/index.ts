import { PrismaService } from '../prisma/prisma.service'
import { BaseSeed } from './common/base.seed'
import UserAdminSeed from './data/user-admin.json'

export class SeedService {
  private prisma = PrismaService.getInstance()
  private seedService: Array<any> = [UserAdminSeed]

  async run() {
    const createInstance = <T extends BaseSeed>(seed: new (prisma: PrismaService) => T): T => {
      return new seed(this.prisma)
    }

    for (const Seed of this.seedService) {
      await createInstance(Seed).run()
    }
  }
}
