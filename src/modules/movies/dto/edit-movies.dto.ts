import { GenreType } from '@prisma/client'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class EditMovieDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  genre: GenreType

  @IsString()
  @IsOptional()
  director: string

  @IsNumber()
  @IsOptional()
  duration: number
}
