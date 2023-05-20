import { IsNumber, IsOptional } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetBookingDto extends IQuery {
  @IsNumber()
  @IsOptional()
  userId?: number

  @IsNumber()
  @IsOptional()
  movieId?: number
}
