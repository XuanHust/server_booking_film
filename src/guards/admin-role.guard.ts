import { CanActivate, ExecutionContext, HttpException, HttpStatus, mixin, Type } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { UserService } from "src/modules/user/user.service";
import { PrismaService } from "src/modules/prisma/prisma.service";

const RoleGuard = (role: UserRole | UserRole[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    private userService = new UserService(PrismaService.getInstance());

    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const userEntity = await this.userService.findById(user?.id);

      if (!userEntity?.active) {
        throw new HttpException("Tài khoản của bạn đã bị khóa.", HttpStatus.NOT_ACCEPTABLE); // 406
      }
      return Array.isArray(role) ? role.includes(user?.role) : user?.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
