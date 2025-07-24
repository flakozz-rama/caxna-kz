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
import { ArnaiyZhobalarService } from './arnaiy-zhobalar.service';
import { CreateArnaiyZhobalaDto } from './dto/create-arnaiy-zhobala.dto';
import { UpdateArnaiyZhobalaDto } from './dto/update-arnaiy-zhobala.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { ArnaiyZhobala } from './entities/arnaiy-zhobala.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ArnaiyZhobalar')
@Controller('arnaiy-zhobalar')
export class ArnaiyZhobalarController {
  constructor(private readonly arnaiyZhobalarService: ArnaiyZhobalarService) {}

  // Public routes
  @Get()
  @ApiOperation({ summary: 'Get all published special events' })
  @ApiResponse({ status: 200, description: 'List of special events' })
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<ArnaiyZhobala>> {
    return this.arnaiyZhobalarService.findAll(paginationDto);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured special events' })
  @ApiResponse({ status: 200, description: 'Featured special events' })
  async getFeatured(
    @Query('limit') limit?: number,
  ): Promise<ArnaiyZhobala[]> {
    return this.arnaiyZhobalarService.getFeatured(limit);
  }

  // Публичный роут для поиска по id (если slug не задан)
  @Get('id/:id')
  @ApiOperation({ summary: 'Get special project by id (public)' })
  @ApiResponse({ status: 200, description: 'Special project details' })
  @ApiResponse({ status: 404, description: 'Special project not found' })
  async findByIdPublic(@Param('id') id: string): Promise<ArnaiyZhobala> {
    return this.arnaiyZhobalarService.findOne(id);
  }

  // --- ADMIN ROUTES (move above :slug) ---
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('admin')
  @ApiOperation({ summary: 'Create new special event (Admin only)' })
  @ApiResponse({ status: 201, description: 'Special event created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createArnaiyZhobalaDto: CreateArnaiyZhobalaDto,
    @Request() req,
  ): Promise<ArnaiyZhobala> {
    return this.arnaiyZhobalarService.create(
      createArnaiyZhobalaDto,
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin')
  @ApiOperation({ summary: 'Get all special events (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all special events' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAllAdmin(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: string,
  ): Promise<PaginationResponseDto<ArnaiyZhobala>> {
    return this.arnaiyZhobalarService.findAll(paginationDto, status as any);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('admin/:id')
  @ApiOperation({ summary: 'Get special event by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Special event details' })
  @ApiResponse({ status: 404, description: 'Special event not found' })
  async findOne(@Param('id') id: string): Promise<ArnaiyZhobala> {
    return this.arnaiyZhobalarService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('admin/:id')
  @ApiOperation({ summary: 'Update special event (Admin only)' })
  @ApiResponse({ status: 200, description: 'Special event updated successfully' })
  @ApiResponse({ status: 404, description: 'Special event not found' })
  async update(
    @Param('id') id: string,
    @Body() updateArnaiyZhobalaDto: UpdateArnaiyZhobalaDto,
  ): Promise<ArnaiyZhobala> {
    return this.arnaiyZhobalarService.update(id, updateArnaiyZhobalaDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('admin/:id')
  @ApiOperation({ summary: 'Delete special event (Admin only)' })
  @ApiResponse({ status: 200, description: 'Special event deleted successfully' })
  @ApiResponse({ status: 404, description: 'Special event not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.arnaiyZhobalarService.remove(id);
  }
  // --- END ADMIN ROUTES ---

  @Get(':slug')
  @ApiOperation({ summary: 'Get special event by slug' })
  @ApiResponse({ status: 200, description: 'Special event details' })
  @ApiResponse({ status: 404, description: 'Special event not found' })
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<ArnaiyZhobala> {
    return this.arnaiyZhobalarService.findBySlug(slug);
  }
}
