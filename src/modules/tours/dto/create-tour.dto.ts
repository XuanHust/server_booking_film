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

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNumber()
  @IsNotEmpty()
  capacity: number
}
