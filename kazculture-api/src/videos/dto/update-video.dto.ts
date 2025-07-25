import { PartialType } from '@nestjs/swagger';
import { CreateVideoDto } from './create-video.dto';
import { IsOptional, IsDateString, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @ApiPropertyOptional({ description: 'Video title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Video description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Video published date' })
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;

  @ApiPropertyOptional({ description: 'Video slug' })
  @IsOptional()
  @IsString()
  slug?: string;
}
