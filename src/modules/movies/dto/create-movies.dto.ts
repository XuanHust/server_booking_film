import { GenreType } from '@prisma/client'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  genre: GenreType

  @IsString()
  @IsNotEmpty()
  director: string

  @IsNumber()
  @IsNotEmpty()
  duration: number
}
