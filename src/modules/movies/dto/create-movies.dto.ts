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

  @IsString()
  @IsNotEmpty()
  banner: string

  @IsString()
  @IsNotEmpty()
  poster: string

  @IsString()
  @IsNotEmpty()
  cinemaId: number

  @IsString()
  @IsNotEmpty()
  descristion: string
}
