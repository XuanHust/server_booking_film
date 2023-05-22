import { IsNumber, IsOptional, IsString } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetReviewDto extends IQuery {
  @IsNumber()
  @IsOptional()
  userId: number

  @IsNumber()
  @IsOptional()
  tourId: number

  @IsString()
  @IsOptional()
  rating: string
}
