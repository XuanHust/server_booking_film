import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  genre: string

  @IsString()
  @IsNotEmpty()
  director: string

  @IsString()
  @IsNotEmpty()
  trailer: string

  @IsNumber()
  @IsNotEmpty()
  duration: number

  @IsNumber()
  @IsNotEmpty()
  bookingId: number
}
