import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { plainToClass } from "class-transformer";
import configuration from "src/config/configuration";
import { PrismaService } from "../prisma/prisma.service";
import { UserEntity } from "../user/entities/user.entity";
import { AuthDto } from "./dto";
import { JwtPayload, Tokens } from "./types";

@Injectable()
export class AuthService {
  private logger = new Logger("AuthService");

  constructor(private prisma: PrismaService, private jwtService: JwtService) {
    // console.log(prisma, "prisma");
  }

  //login
  async signIn(auth: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: auth.username
      }
    });

    if (!user) throw new ForbiddenException("Tên đăng nhập hoặc mật khẩu không chính xác.");

    const passwordMatches = await argon.verify(user.password, auth.password);
    if (!passwordMatches) throw new ForbiddenException("Tên đăng nhập hoặc mật khẩu không chính xác.");
    if (!user.active) throw new ForbiddenException("Tài khoản đã bị khóa.");

    const tokens = await this.getTokens(user.id, user.username, user.email, user.phoneNumber, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return {
      auth: tokens,
      user: plainToClass(UserEntity, user)
    };
  }

  //get access_token + refresh_token
  async getTokens(userId: number, username: string, email: string, phoneNumber: string, role: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      username: username,
      phoneNumber: phoneNumber,
      email: email,
      role: role
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: configuration.accessTokenSecret,
        expiresIn: configuration.accessTokenExpires
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: configuration.refreshTokenSecret,
        expiresIn: configuration.refreshTokenExpires
      })
    ]);

    return {
      access_token,
      refresh_token
    };
  }
  //update hashedRT
  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hashedRt: hash
      }
    });
  }
  //logout
  async logout(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null
        }
      },
      data: {
        hashedRt: null
      }
    });
    return true;
  }
  //change password admin
  async changePassword(userId: number, newPassword: string): Promise<boolean> {
    const hash = await argon.hash(newPassword);
    await this.prisma.user.updateMany({
      where: {
        id: userId
      },
      data: {
        password: hash
      }
    });
    return true;
  }

  // refresh token
  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user || !user.hashedRt) throw new ForbiddenException("Quyền truy cập bị từ chối.");

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException("Quyền truy cập bị từ chối.");

    const tokens = await this.getTokens(user.id, user.username, user.email, user.phoneNumber, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
}
