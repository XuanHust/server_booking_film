import { IsOptional, IsString } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetCinemaDto extends IQuery {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsString()
  @IsOptional()
  city?: string
}
