import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VideoCategory, VideoStatus } from '../entities/video.entity';

export class CreateVideoDto {
  @ApiProperty({ description: 'Video title in Kazakh' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Video title in Qazaq' })
  @IsOptional()
  @IsString()
  titleQaz?: string;

  @ApiPropertyOptional({ description: 'Video description in Kazakh' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Video description in Qazaq' })
  @IsOptional()
  @IsString()
  descriptionQaz?: string;

  @ApiPropertyOptional({ description: 'Video duration (format: MM:SS)' })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string;

  @ApiProperty({ description: 'Video URL' })
  @IsUrl()
  url: string;

  @ApiPropertyOptional({ enum: VideoCategory, description: 'Video category' })
  @IsOptional()
  @IsEnum(VideoCategory)
  category?: VideoCategory;

  @ApiPropertyOptional({ enum: VideoStatus, description: 'Video status' })
  @IsOptional()
  @IsEnum(VideoStatus)
  status?: VideoStatus;

  @ApiPropertyOptional({ description: 'Video tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Meta description in Kazakh' })
  @IsOptional()
  @IsString()
  metaDescriptionKaz?: string;

  @ApiPropertyOptional({ description: 'Meta description in Qazaq' })
  @IsOptional()
  @IsString()
  metaDescriptionQaz?: string;
}
