import { Status } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  tourId: number

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status
}
