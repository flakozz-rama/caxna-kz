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
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { LanguageDto } from '../common/dto/language.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Video } from './entities/video.entity';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  // Public routes
  @Get()
  @ApiOperation({ summary: 'Get all published videos' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'List of videos' })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() languageDto: LanguageDto,
    @I18n() i18n: I18nContext,
  ): Promise<PaginationResponseDto<Video>> {
    return this.videosService.findAll(paginationDto, languageDto.lang);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured videos' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'Featured videos' })
  async getFeatured(
    @Query() languageDto: LanguageDto,
    @Query('limit') limit?: number,
  ): Promise<Video[]> {
    return this.videosService.getFeatured(languageDto.lang, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get video by ID' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'Video details' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  async findById(
    @Param('id') id: string,
    @Query() languageDto: LanguageDto,
  ): Promise<Video> {
    return this.videosService.findById(id, languageDto.lang);
  }

  // Admin routes (protected)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('admin')
  @ApiOperation({ summary: 'Create new video (Admin only)' })
  @ApiResponse({ status: 201, description: 'Video created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @Request() req,
  ): Promise<Video> {
    return this.videosService.create(createVideoDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin')
  @ApiOperation({ summary: 'Get all videos (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all videos' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAllAdmin(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: string,
  ): Promise<PaginationResponseDto<Video>> {
    return this.videosService.findAll(paginationDto, 'kaz', status as any);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin/:id')
  @ApiOperation({ summary: 'Get video by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Video details' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  async findOne(@Param('id') id: string): Promise<Video> {
    return this.videosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('admin/:id')
  @ApiOperation({ summary: 'Update video (Admin only)' })
  @ApiResponse({ status: 200, description: 'Video updated successfully' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ): Promise<Video> {
    return this.videosService.update(id, updateVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('admin/:id')
  @ApiOperation({ summary: 'Delete video (Admin only)' })
  @ApiResponse({ status: 200, description: 'Video deleted successfully' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.videosService.remove(id);
  }
}
