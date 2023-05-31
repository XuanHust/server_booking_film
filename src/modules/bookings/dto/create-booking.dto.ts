import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Status } from '@prisma/client'
export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  movieId: number

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number

  @IsString()
  @IsNotEmpty()
  bookingDate: string
}
