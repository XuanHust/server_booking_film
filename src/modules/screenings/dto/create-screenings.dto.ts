import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateScreeningDto {
  @IsNumber()
  @IsNotEmpty()
  movieId: number

  @IsNumber()
  @IsNotEmpty()
  cinemaId: number

  @IsString()
  @IsNotEmpty()
  startTime: string

  @IsString()
  @IsNotEmpty()
  endTime: string
}
