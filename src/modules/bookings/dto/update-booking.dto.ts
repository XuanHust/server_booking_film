import { Status } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateBookingDto {
  @IsNumber()
  @IsOptional()
  userId: number

  @IsNumber()
  @IsOptional()
  tourId: number

  @IsString()
  @IsOptional()
  bookingDate: string

  @IsEnum(Status)
  @IsOptional()
  status: Status
}
