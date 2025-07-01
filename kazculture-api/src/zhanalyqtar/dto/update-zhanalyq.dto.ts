import { PartialType } from '@nestjs/swagger';
import { CreateZhanalyqDto } from './create-zhanalyq.dto';
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateZhanalyqDto extends PartialType(CreateZhanalyqDto) {
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
