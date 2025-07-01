import { IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LanguageDto {
  @ApiPropertyOptional({
    enum: ['kaz', 'qaz'],
    description: 'Language preference',
  })
  @IsOptional()
  @IsIn(['kaz', 'qaz'])
  lang?: 'kaz' | 'qaz' = 'kaz';
}
