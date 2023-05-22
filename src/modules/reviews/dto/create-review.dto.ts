import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  tourId: number

  @IsNumber()
  @IsNotEmpty()
  rating: number

  @IsString()
  @IsNotEmpty()
  comment: string
}
