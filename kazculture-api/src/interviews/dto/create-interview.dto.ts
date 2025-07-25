import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InterviewStatus } from '../entities/interview.entity';

export class CreateInterviewDto {
  @ApiProperty({ description: 'Interview title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Interview content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: 'Interviewee name' })
  @IsOptional()
  @IsString()
  interviewee?: string;

  @ApiPropertyOptional({ description: 'Interview slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({
    enum: InterviewStatus,
    description: 'Interview status',
  })
  @IsOptional()
  @IsEnum(InterviewStatus)
  status?: InterviewStatus;

  @ApiPropertyOptional({ description: 'Interview date' })
  @IsOptional()
  @IsDateString()
  interviewDate?: string;

  @ApiPropertyOptional({ description: 'Interview tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
