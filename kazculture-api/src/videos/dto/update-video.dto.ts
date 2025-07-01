import { PartialType } from '@nestjs/swagger';
import { CreateVideoDto } from './create-video.dto';
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
