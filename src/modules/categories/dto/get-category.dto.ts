import { IsOptional, IsString } from 'class-validator'
import { IQuery } from 'src/dto/query'

export class GetCategoryDto extends IQuery {
  @IsString()
  @IsOptional()
  name: string
}
