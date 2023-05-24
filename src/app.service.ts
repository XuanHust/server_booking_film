import { Injectable } from '@nestjs/common'
import { SeedService } from './modules/seeds'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  async onApplicationBootstrap() {
    new SeedService().run()
  }
}
