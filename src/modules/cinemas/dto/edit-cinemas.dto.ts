import { IsNotEmpty, IsString } from 'class-validator'

export class EditCinemaDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsNotEmpty()
  city: string
}
