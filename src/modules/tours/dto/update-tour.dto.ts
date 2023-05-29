import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator'

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
  banner: string

  @IsString()
  @IsOptional()
  poster: string

  @IsString()
  @IsOptional()
  endDate: string

  @IsNumber()
  @IsOptional()
  price: number

  @IsNumber()
  @IsOptional()
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
