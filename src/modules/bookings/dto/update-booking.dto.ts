import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Status } from '@prisma/client'
export class UpdateBookingDto {
  @IsNumber()
  @IsOptional()
  userId?: number

  @IsNumber()
  @IsOptional()
  movieId?: number

  @IsEnum(Status)
  @IsOptional()
  status: Status

  @IsNumber()
  @IsOptional()
  totalPrice: number

  @IsString()
  @IsOptional()
  bookingDate: string
}
