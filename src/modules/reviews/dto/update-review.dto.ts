import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateReviewDto {
  @IsNumber()
  @IsOptional()
  userId: number

  @IsNumber()
  @IsOptional()
  tourId: number

  @IsNumber()
  @IsOptional()
  rating: number

  @IsString()
  @IsOptional()
  comment: string
}
