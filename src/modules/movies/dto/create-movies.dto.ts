import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

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
  @IsOptional()
  banner: string

  @IsString()
  @IsOptional()
  poster: string

  @IsNumber()
  @IsNotEmpty()
  cinemaId: number

  @IsString()
  @IsNotEmpty()
  descristion: string
}
