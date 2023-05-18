import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateTicketDto {
  @IsNumber()
  @IsNotEmpty()
  screeningId: number

  @IsString()
  @IsNotEmpty()
  seatNumber: string

  @IsNumber()
  @IsNotEmpty()
  price: number
}
