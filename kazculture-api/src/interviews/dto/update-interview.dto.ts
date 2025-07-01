import { PartialType } from '@nestjs/swagger';
import { CreateInterviewDto } from './create-interview.dto';
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateInterviewDto extends PartialType(CreateInterviewDto) {
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
