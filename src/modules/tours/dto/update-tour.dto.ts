import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateTourDto {
  @IsString()
  @IsOptional()
  tourName: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  startDate: string

  @IsString()
  @IsOptional()
  endDate: string

  @IsNumber()
  @IsOptional()
  price: number

  @IsNumber()
  @IsOptional()
  capacity: number
}
