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
import {
  ArnaiyZhobalaStatus,
  ArnaiyZhobalaType,
} from '../entities/arnaiy-zhobala.entity';

export class CreateArnaiyZhobalaDto {
  @ApiProperty({ description: 'Event title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Event content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ enum: ArnaiyZhobalaType, description: 'Event type' })
  @IsOptional()
  @IsEnum(ArnaiyZhobalaType)
  type?: ArnaiyZhobalaType;

  @ApiPropertyOptional({ description: 'Event slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({
    enum: ArnaiyZhobalaStatus,
    description: 'Event status',
  })
  @IsOptional()
  @IsEnum(ArnaiyZhobalaStatus)
  status?: ArnaiyZhobalaStatus;

  @ApiPropertyOptional({ description: 'Event date' })
  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @ApiPropertyOptional({ description: 'Event end date' })
  @IsOptional()
  @IsDateString()
  eventEndDate?: string;

  @ApiPropertyOptional({ description: 'Location' })
  @IsOptional()
  @IsString()
  locationKaz?: string;

  @ApiPropertyOptional({ description: 'Organizer' })
  @IsOptional()
  @IsString()
  organizerKaz?: string;

  @ApiPropertyOptional({ description: 'Contact information' })
  @IsOptional()
  @IsString()
  contactInfo?: string;

  @ApiPropertyOptional({ description: 'Ticket information' })
  @IsOptional()
  @IsString()
  ticketInfo?: string;

  @ApiPropertyOptional({ description: 'Event tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Meta description' })
  @IsOptional()
  @IsString()
  metaDescriptionKaz?: string;

  @ApiPropertyOptional({ description: 'Is featured event' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Is free event' })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;
}
