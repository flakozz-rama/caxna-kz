import { PartialType } from '@nestjs/swagger';
import { CreatePlayDto } from './create-play.dto';
import { IsOptional, IsDateString, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePlayDto extends PartialType(CreatePlayDto) {
  @ApiPropertyOptional({ description: 'Play title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Play content' })
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
} 