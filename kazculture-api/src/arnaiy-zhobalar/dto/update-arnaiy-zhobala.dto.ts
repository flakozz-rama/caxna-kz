import { PartialType } from '@nestjs/swagger';
import { CreateArnaiyZhobalaDto } from './create-arnaiy-zhobala.dto';
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateArnaiyZhobalaDto extends PartialType(
  CreateArnaiyZhobalaDto,
) {
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
