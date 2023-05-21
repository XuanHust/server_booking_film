import { IsNumber, IsOptional, IsString } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetTourDto extends IQuery {
  @IsString()
  @IsOptional()
  tourName: string

  @IsNumber()
  @IsOptional()
  price: number

  @IsString()
  @IsOptional()
  startDate: string

  @IsString()
  @IsOptional()
  endDate: string
}
