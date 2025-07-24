import { PartialType } from '@nestjs/swagger';
import { CreateZhanalyqDto } from './create-zhanalyq.dto';
import { IsOptional, IsDateString, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateZhanalyqDto extends PartialType(CreateZhanalyqDto) {
  @ApiPropertyOptional({ description: 'News title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'News content' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'Location' })
  @IsOptional()
  @IsString()
  locationKaz?: string;

  @ApiPropertyOptional({ description: 'Meta description' })
  @IsOptional()
  @IsString()
  metaDescriptionKaz?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
