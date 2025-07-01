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
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { LanguageDto } from '../common/dto/language.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Interview } from './entities/interview.entity';

@ApiTags('Interviews')
@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  // Public routes
  @Get()
  @ApiOperation({ summary: 'Get all published interviews' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'List of interviews' })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() languageDto: LanguageDto,
    @I18n() i18n: I18nContext,
  ): Promise<PaginationResponseDto<Interview>> {
    return this.interviewsService.findAll(paginationDto, languageDto.lang);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured interviews' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'Featured interviews' })
  async getFeatured(
    @Query() languageDto: LanguageDto,
    @Query('limit') limit?: number,
  ): Promise<Interview[]> {
    return this.interviewsService.getFeatured(languageDto.lang, limit);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get interview by slug' })
  @ApiQuery({ name: 'lang', enum: ['kaz', 'qaz'], required: false })
  @ApiResponse({ status: 200, description: 'Interview details' })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async findBySlug(
    @Param('slug') slug: string,
    @Query() languageDto: LanguageDto,
  ): Promise<Interview> {
    return this.interviewsService.findBySlug(slug, languageDto.lang);
  }

  // Admin routes (protected)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('admin')
  @ApiOperation({ summary: 'Create new interview (Admin only)' })
  @ApiResponse({ status: 201, description: 'Interview created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createInterviewDto: CreateInterviewDto,
    @Request() req,
  ): Promise<Interview> {
    return this.interviewsService.create(createInterviewDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin')
  @ApiOperation({ summary: 'Get all interviews (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all interviews' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAllAdmin(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: string,
  ): Promise<PaginationResponseDto<Interview>> {
    return this.interviewsService.findAll(paginationDto, 'kaz', status as any);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin/:id')
  @ApiOperation({ summary: 'Get interview by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Interview details' })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async findOne(@Param('id') id: string): Promise<Interview> {
    return this.interviewsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('admin/:id')
  @ApiOperation({ summary: 'Update interview (Admin only)' })
  @ApiResponse({ status: 200, description: 'Interview updated successfully' })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async update(
    @Param('id') id: string,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ): Promise<Interview> {
    return this.interviewsService.update(id, updateInterviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('admin/:id')
  @ApiOperation({ summary: 'Delete interview (Admin only)' })
  @ApiResponse({ status: 200, description: 'Interview deleted successfully' })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.interviewsService.remove(id);
  }
}
