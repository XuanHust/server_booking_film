import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'

export class CreateTourDto {
  @IsString()
  @IsNotEmpty()
  tourName: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  startDate: string

  @IsString()
  @IsNotEmpty()
  endDate: string

  @IsString()
  @IsOptional()
  banner: string

  @IsString()
  @IsOptional()
  poster: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNumber()
  @IsNotEmpty()
  capacity: number

  @IsNumber()
  @IsNotEmpty()
  cateId: number

  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsNotEmpty()
  transport: string

  @IsString()
  @IsNotEmpty()
  listLocation: string

  @IsString()
  @IsNotEmpty()
  startLocation: string

  @IsString()
  @IsNotEmpty()
  listDate: string
}
