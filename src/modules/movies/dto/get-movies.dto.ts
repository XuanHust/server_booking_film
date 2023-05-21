import { IsOptional } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetMovieDto extends IQuery {
  @IsOptional()
  genre?: string

  @IsOptional()
  title?: string

  @IsOptional()
  director?: string
}
