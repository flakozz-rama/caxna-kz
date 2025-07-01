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
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { LanguageDto } from '../common/dto/language.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Article } from './entities/article.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // Public routes
  @Get()
  @ApiOperation({ summary: 'Get all published articles' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'List of articles' })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() languageDto: LanguageDto,
    @I18n() i18n: I18nContext,
  ): Promise<PaginationResponseDto<Article>> {
    return this.articlesService.findAll(paginationDto, languageDto.lang);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured articles' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'Featured articles' })
  async getFeatured(
    @Query() languageDto: LanguageDto,
    @Query('limit') limit?: number,
  ): Promise<Article[]> {
    return this.articlesService.getFeatured(languageDto.lang, limit);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get article by slug' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'Article details' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async findBySlug(
    @Param('slug') slug: string,
    @Query() languageDto: LanguageDto,
  ): Promise<Article> {
    return this.articlesService.findBySlug(slug, languageDto.lang);
  }

  // Admin routes (protected)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('admin')
  @ApiOperation({ summary: 'Create new article (Admin only)' })
  @ApiResponse({ status: 201, description: 'Article created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req,
  ): Promise<Article> {
    return this.articlesService.create(createArticleDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin')
  @ApiOperation({ summary: 'Get all articles (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all articles' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAllAdmin(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: string,
  ): Promise<PaginationResponseDto<Article>> {
    return this.articlesService.findAll(paginationDto, 'kaz', status as any);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin/:id')
  @ApiOperation({ summary: 'Get article by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Article details' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('admin/:id')
  @ApiOperation({ summary: 'Update article (Admin only)' })
  @ApiResponse({ status: 200, description: 'Article updated successfully' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articlesService.update(id, updateArticleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('admin/:id')
  @ApiOperation({ summary: 'Delete article (Admin only)' })
  @ApiResponse({ status: 200, description: 'Article deleted successfully' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.articlesService.remove(id);
  }
}
