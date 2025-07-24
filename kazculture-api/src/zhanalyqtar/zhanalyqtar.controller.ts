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
import { ZhanalyqtarService } from './zhanalyqtar.service';
import { CreateZhanalyqDto } from './dto/create-zhanalyq.dto';
import { UpdateZhanalyqDto } from './dto/update-zhanalyq.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { Zhanalyq } from './entities/zhanalyq.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Zhanalyqtar')
@Controller('zhanalyqtar')
export class ZhanalyqtarController {
  constructor(private readonly zhanalyqtarService: ZhanalyqtarService) {}

  // Public routes
  @Get()
  @ApiOperation({ summary: 'Get all published news' })
  @ApiResponse({ status: 200, description: 'List of news' })
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Zhanalyq>> {
    return this.zhanalyqtarService.findAll(paginationDto);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured news' })
  @ApiResponse({ status: 200, description: 'Featured news' })
  async getFeatured(
    @Query('limit') limit?: number,
  ): Promise<Zhanalyq[]> {
    return this.zhanalyqtarService.getFeatured(limit);
  }

  // Публичный роут для поиска по id (если slug не задан)
  @Get('id/:id')
  @ApiOperation({ summary: 'Get news by id (public)' })
  @ApiResponse({ status: 200, description: 'News details' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async findByIdPublic(@Param('id') id: string): Promise<Zhanalyq> {
    return this.zhanalyqtarService.findOne(id);
  }

  // --- ADMIN ROUTES ---
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
    return this.zhanalyqtarService.findAll(paginationDto, status as any);
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

  // --- Только после admin-ручек ---
  @Get(':slug')
  @ApiOperation({ summary: 'Get news by slug' })
  @ApiResponse({ status: 200, description: 'News details' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<Zhanalyq> {
    return this.zhanalyqtarService.findBySlug(slug);
  }
}
