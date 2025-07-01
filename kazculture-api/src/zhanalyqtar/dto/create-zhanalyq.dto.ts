import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  IsUrl,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ZhanalyqStatus, ZhanalyqCategory } from '../entities/zhanalyq.entity';

export class CreateZhanalyqDto {
  @ApiProperty({ description: 'News title in Kazakh' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'News title in Qazaq' })
  @IsOptional()
  @IsString()
  titleQaz?: string;

  @ApiProperty({ description: 'News content in Kazakh' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: 'News content in Qazaq' })
  @IsOptional()
  @IsString()
  contentQaz?: string;

  @ApiPropertyOptional({ enum: ZhanalyqCategory, description: 'News category' })
  @IsOptional()
  @IsEnum(ZhanalyqCategory)
  category?: ZhanalyqCategory;

  @ApiPropertyOptional({ description: 'News slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ enum: ZhanalyqStatus, description: 'News status' })
  @IsOptional()
  @IsEnum(ZhanalyqStatus)
  status?: ZhanalyqStatus;

  @ApiPropertyOptional({ description: 'Event date' })
  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @ApiPropertyOptional({ description: 'Location in Kazakh' })
  @IsOptional()
  @IsString()
  locationKaz?: string;

  @ApiPropertyOptional({ description: 'Location in Qazaq' })
  @IsOptional()
  @IsString()
  locationQaz?: string;

  @ApiPropertyOptional({ description: 'News tags' })
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

  @ApiPropertyOptional({ description: 'Is featured news' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
