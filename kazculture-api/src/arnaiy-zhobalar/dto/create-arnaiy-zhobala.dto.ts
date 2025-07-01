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
  @ApiProperty({ description: 'Event title in Kazakh' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Event title in Qazaq' })
  @IsOptional()
  @IsString()
  titleQaz?: string;

  @ApiProperty({ description: 'Event content in Kazakh' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: 'Event content in Qazaq' })
  @IsOptional()
  @IsString()
  contentQaz?: string;

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

  @ApiPropertyOptional({ description: 'Location in Kazakh' })
  @IsOptional()
  @IsString()
  locationKaz?: string;

  @ApiPropertyOptional({ description: 'Location in Qazaq' })
  @IsOptional()
  @IsString()
  locationQaz?: string;

  @ApiPropertyOptional({ description: 'Organizer in Kazakh' })
  @IsOptional()
  @IsString()
  organizerKaz?: string;

  @ApiPropertyOptional({ description: 'Organizer in Qazaq' })
  @IsOptional()
  @IsString()
  organizerQaz?: string;

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

  @ApiPropertyOptional({ description: 'Meta description in Kazakh' })
  @IsOptional()
  @IsString()
  metaDescriptionKaz?: string;

  @ApiPropertyOptional({ description: 'Meta description in Qazaq' })
  @IsOptional()
  @IsString()
  metaDescriptionQaz?: string;

  @ApiPropertyOptional({ description: 'Is featured event' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Is free event' })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;
}
