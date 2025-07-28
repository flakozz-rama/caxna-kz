import { IsString, IsNotEmpty, IsOptional, IsArray, IsEnum, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlayStatus } from '../entities/play.entity';

export class CreatePlayDto {
  @ApiProperty({ description: 'Play title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Play content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: 'Play tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Play slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ enum: PlayStatus, description: 'Play status' })
  @IsOptional()
  @IsEnum(PlayStatus)
  status?: PlayStatus;
} 