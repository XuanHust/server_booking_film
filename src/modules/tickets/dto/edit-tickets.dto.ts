import { IsNumber, IsOptional, IsString } from 'class-validator'

export class EditTicketDto {
  @IsNumber()
  @IsOptional()
  screeningId: number

  @IsString()
  @IsOptional()
  seatNumber: string

  @IsNumber()
  @IsOptional()
  price: number
}
