import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  tourId: number

  @IsNumber()
  @IsOptional()
  rating: number

  @IsString()
  @IsNotEmpty()
  comment: string
}
