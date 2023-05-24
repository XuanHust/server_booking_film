import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

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
  @IsNotEmpty()
  banner: string

  @IsString()
  @IsNotEmpty()
  poster: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNumber()
  @IsNotEmpty()
  capacity: number
}
