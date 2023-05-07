import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private static instance: PrismaService;
  private static instanceCount = 0;

  public static getInstanceCount(): number {
    return this.instanceCount;
  }

  public static getInstance(): PrismaService {
    this.instanceCount++;
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.setupMiddelware();
  }

  setupMiddelware(): void {
    // this.$use(this.onPackageCreateMiddleware);
    this.$use(this.onUserModifyMiddleware);
  }

  async onUserModifyMiddleware(
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>
  ): Promise<any> {
    const result = await next(params);
    if (params.model == "User" && ["create", "update"].includes(params.action)) {
      result.firstName = result.name.split(" ").slice(-1).join("");
      result.lastName = result.name.split(" ").slice(0, 1).join("");
      result.middleName = result.name.split(" ").slice(1, -1).join("");

      await prisma.user.update({
        where: {
          id: result.id
        },
        data: result
      });
    }
    return result;
  }

  // async onPackageCreateMiddleware(
  //   params: Prisma.MiddlewareParams,
  //   next: (params: Prisma.MiddlewareParams) => Promise<any>
  // ) {
  //   if (params.model == "Package" && params.action == "create") {
  //     params.args.data["code"] = randomUUID();
  //   }
  //   const result = await next(params);
  //   if (params.model == "Package" && params.action == "create") {
  //     console.log("tesst", result.packageType);
  //     if (result.packageType === "TIME") {
  //       result.code = "T" + result.id.toString().padStart(3, "0");
  //     }
  //     if (result.packageType === "REQUEST") {
  //       result.code = "R" + result.id.toString().padStart(3, "0");
  //     }
  //     if (result.packageType === "TIME_REQUEST") {
  //       result.code = "TR" + result.id.toString().padStart(3, "0");
  //     }

  //     await prisma.package.update({
  //       where: {
  //         id: result.id
  //       },
  //       data: result
  //     });
  //   }
  //   return result;
  // }
}

export const prisma = PrismaService.getInstance();
