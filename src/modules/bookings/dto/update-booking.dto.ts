import { IsNumber, IsOptional } from 'class-validator'

export class UpdateBookingDto {
  @IsNumber()
  @IsOptional()
  userId?: number

  @IsNumber()
  @IsOptional()
  movieId?: number
}
