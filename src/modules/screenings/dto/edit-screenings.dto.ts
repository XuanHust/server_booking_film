import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class EditScreeningDto {
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
