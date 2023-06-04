import { IsNumber, IsOptional, IsString } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetScreeningDto extends IQuery {
  @IsString()
  @IsOptional()
  name: string

  @IsNumber()
  @IsOptional()
  movieId: number

  @IsNumber()
  @IsOptional()
  cinemaId: number

  @IsString()
  @IsOptional()
  startTime: string
}
