import { UserRole } from "@prisma/client";
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole
}
