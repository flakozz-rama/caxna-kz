import { PartialType } from '@nestjs/swagger';
import { CreateInterviewDto } from './create-interview.dto';
import { IsOptional, IsDateString, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInterviewDto extends PartialType(CreateInterviewDto) {
  @ApiPropertyOptional({ description: 'Interview title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Interview content' })
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
