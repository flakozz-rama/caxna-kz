import { IsString, IsNotEmpty, IsOptional, IsArray, IsEnum, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReviewStatus } from '../entities/review.entity';

export class CreateReviewDto {
  @ApiProperty({ description: 'Review title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Review content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: 'Review tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Review slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ enum: ReviewStatus, description: 'Review status' })
  @IsOptional()
  @IsEnum(ReviewStatus)
  status?: ReviewStatus;
} 