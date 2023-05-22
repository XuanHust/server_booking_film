import { Status } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetBookingDto extends IQuery {
  @IsNumber()
  @IsOptional()
  userId: number

  @IsNumber()
  @IsOptional()
  tourId: number

  @IsEnum(Status)
  @IsOptional()
  status: Status
}
