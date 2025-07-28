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
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { Interview } from './entities/interview.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InterviewStatus } from './entities/interview.entity';

@ApiTags('Interviews')
@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  // Public routes
  @Get()
  @ApiOperation({ summary: 'Get all published interviews' })
  @ApiResponse({ status: 200, description: 'List of interviews' })
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Interview>> {
    return this.interviewsService.findAll(paginationDto);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured interviews' })
  @ApiResponse({ status: 200, description: 'Featured interviews' })
  async getFeatured(
    @Query('limit') limit?: number,
  ): Promise<Interview[]> {
    return this.interviewsService.getFeatured(limit);
  }

  // Публичный роут для поиска по id (если slug не задан)
  @Get('id/:id')
  @ApiOperation({ summary: 'Get interview by id (public)' })
  @ApiResponse({ status: 200, description: 'Interview details' })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async findByIdPublic(@Param('id') id: string): Promise<Interview> {
    return this.interviewsService.findOne(id);
  }

  // --- ADMIN ROUTES ---
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
    // Если статус не передан, показываем все интервью (включая черновики)
    const interviewStatus = status ? (status as InterviewStatus) : undefined;
    return this.interviewsService.findAll(paginationDto, interviewStatus);
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

  // --- Только после admin-ручек ---
  @Get(':slug')
  @ApiOperation({ summary: 'Get interview by slug' })
  @ApiResponse({ status: 200, description: 'Interview details' })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<Interview> {
    return this.interviewsService.findBySlug(slug);
  }
}
