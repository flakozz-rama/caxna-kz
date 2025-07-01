import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ZhanalyqtarService } from './zhanalyqtar.service';
import { CreateZhanalyqDto } from './dto/create-zhanalyq.dto';
import { UpdateZhanalyqDto } from './dto/update-zhanalyq.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { LanguageDto } from '../common/dto/language.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Zhanalyq } from './entities/zhanalyq.entity';

@ApiTags('Zhanalyqtar')
@Controller('zhanalyqtar')
export class ZhanalyqtarController {
  constructor(private readonly zhanalyqtarService: ZhanalyqtarService) {}

  // Public routes
  @Get()
  @ApiOperation({ summary: 'Get all published news' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'List of news' })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() languageDto: LanguageDto,
    @I18n() i18n: I18nContext,
  ): Promise<PaginationResponseDto<Zhanalyq>> {
    return this.zhanalyqtarService.findAll(paginationDto, languageDto.lang);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured news' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'Featured news' })
  async getFeatured(
    @Query() languageDto: LanguageDto,
    @Query('limit') limit?: number,
  ): Promise<Zhanalyq[]> {
    return this.zhanalyqtarService.getFeatured(languageDto.lang, limit);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get news by slug' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'News details' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async findBySlug(
    @Param('slug') slug: string,
    @Query() languageDto: LanguageDto,
  ): Promise<Zhanalyq> {
    return this.zhanalyqtarService.findBySlug(slug, languageDto.lang);
  }

  // Admin routes (protected)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('admin')
  @ApiOperation({ summary: 'Create new news (Admin only)' })
  @ApiResponse({ status: 201, description: 'News created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createZhanalyqDto: CreateZhanalyqDto,
    @Request() req,
  ): Promise<Zhanalyq> {
    return this.zhanalyqtarService.create(createZhanalyqDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin')
  @ApiOperation({ summary: 'Get all news (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all news' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAllAdmin(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: string,
  ): Promise<PaginationResponseDto<Zhanalyq>> {
    return this.zhanalyqtarService.findAll(paginationDto, 'kaz', status as any);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin/:id')
  @ApiOperation({ summary: 'Get news by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'News details' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async findOne(@Param('id') id: string): Promise<Zhanalyq> {
    return this.zhanalyqtarService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('admin/:id')
  @ApiOperation({ summary: 'Update news (Admin only)' })
  @ApiResponse({ status: 200, description: 'News updated successfully' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async update(
    @Param('id') id: string,
    @Body() updateZhanalyqDto: UpdateZhanalyqDto,
  ): Promise<Zhanalyq> {
    return this.zhanalyqtarService.update(id, updateZhanalyqDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('admin/:id')
  @ApiOperation({ summary: 'Delete news (Admin only)' })
  @ApiResponse({ status: 200, description: 'News deleted successfully' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.zhanalyqtarService.remove(id);
  }
}
