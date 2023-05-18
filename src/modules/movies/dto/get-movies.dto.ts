import { GenreType } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetMovieDto extends IQuery {
  @IsEnum(GenreType)
  @IsOptional()
  genre?: GenreType

  @IsOptional()
  title?: string

  @IsOptional()
  director?: string
}
