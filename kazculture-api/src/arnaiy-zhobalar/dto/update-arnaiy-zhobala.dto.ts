import { PartialType } from '@nestjs/swagger';
import { CreateArnaiyZhobalaDto } from './create-arnaiy-zhobala.dto';
import { IsOptional, IsDateString, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArnaiyZhobalaDto extends PartialType(
  CreateArnaiyZhobalaDto,
) {
  @ApiPropertyOptional({ description: 'Event title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Event content' })
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
