import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateReviewDto {
  @IsNumber()
  @IsOptional()
  star?: number

  @IsString()
  @IsOptional()
  message?: string

  @IsNumber()
  @IsOptional()
  userId?: number

  @IsNumber()
  @IsOptional()
  moviesId?: number
}
