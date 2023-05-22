import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateReviewDto {
  @IsNumber()
  @IsOptional()
  userId: number

  @IsNumber()
  @IsOptional()
  tourId: number

  @IsString()
  @IsOptional()
  rating: string

  @IsString()
  @IsOptional()
  comment: string
}
