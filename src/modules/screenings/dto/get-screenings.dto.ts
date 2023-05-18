import { IsNumber, IsOptional, IsString } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetScreeningDto extends IQuery {
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
