import { Status } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  tourId: number

  @IsString()
  @IsNotEmpty()
  bookingDate: string

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status
}
