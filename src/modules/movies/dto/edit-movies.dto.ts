import { IsNumber, IsOptional, IsString } from 'class-validator'

export class EditMovieDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  genre: string

  @IsString()
  @IsOptional()
  director: string

  @IsNumber()
  @IsOptional()
  duration: number

  @IsString()
  @IsOptional()
  trailer: string

  @IsString()
  @IsOptional()
  banner: string

  @IsString()
  @IsOptional()
  poster: string
}
