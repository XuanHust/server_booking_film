import { IsNumber, IsOptional } from 'class-validator'
import { IQuery } from 'src/dto/query'
import { Status } from '@prisma/client'

export class GetBookingDto extends IQuery {
  @IsNumber()
  @IsOptional()
  userId?: number

  @IsEnum(Status)
  @IsOptional()
  status: Status

  @IsNumber()
  @IsOptional()
  movieId?: number
}
