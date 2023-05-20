import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  movieId: number
}
