import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  star: number

  @IsString()
  @IsNotEmpty()
  message: string

  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  moviesId: number
}
