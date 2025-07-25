import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArticleCategory, ArticleStatus } from '../entities/article.entity';

export class CreateArticleDto {
  @ApiProperty({ description: 'Article title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Article content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: 'Article tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    enum: ArticleCategory,
    description: 'Article category',
  })
  @IsOptional()
  @IsEnum(ArticleCategory)
  category?: ArticleCategory;

  @ApiPropertyOptional({ description: 'Article slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ enum: ArticleStatus, description: 'Article status' })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;
}
