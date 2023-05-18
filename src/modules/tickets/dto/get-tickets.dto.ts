import { IsNumber, IsOptional, IsString } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetTicketDto extends IQuery {
  @IsNumber()
  @IsOptional()
  screeningId: number

  @IsNumber()
  @IsOptional()
  seatNumber: number
}
