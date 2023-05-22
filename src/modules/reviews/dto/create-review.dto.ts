import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  tourId: number

  @IsString()
  @IsNotEmpty()
  rating: string

  @IsString()
  @IsNotEmpty()
  comment: string
}
