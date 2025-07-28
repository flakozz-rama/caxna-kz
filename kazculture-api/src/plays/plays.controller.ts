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
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PlaysService } from './plays.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';
import { Play, PlayStatus } from './entities/play.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('plays')
@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new play' })
  @ApiResponse({ status: 201, description: 'Play created successfully', type: Play })
  create(@Body() createPlayDto: CreatePlayDto): Promise<Play> {
    return this.playsService.create(createPlayDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all published plays' })
  @ApiResponse({ status: 200, description: 'List of published plays', type: [Play] })
  findAll(@Query('status') status?: PlayStatus): Promise<Play[]> {
    return this.playsService.findAll(status);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all plays for admin' })
  @ApiResponse({ status: 200, description: 'List of all plays', type: [Play] })
  findAllAdmin(@Query('status') status?: PlayStatus): Promise<Play[]> {
    return this.playsService.findAllAdmin(status);
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get play by ID' })
  @ApiResponse({ status: 200, description: 'Play found', type: Play })
  @ApiResponse({ status: 404, description: 'Play not found' })
  findOne(@Param('id') id: string): Promise<Play> {
    return this.playsService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get play by slug' })
  @ApiResponse({ status: 200, description: 'Play found', type: Play })
  @ApiResponse({ status: 404, description: 'Play not found' })
  findBySlug(@Param('slug') slug: string): Promise<Play> {
    return this.playsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update play' })
  @ApiResponse({ status: 200, description: 'Play updated successfully', type: Play })
  @ApiResponse({ status: 404, description: 'Play not found' })
  update(@Param('id') id: string, @Body() updatePlayDto: UpdatePlayDto): Promise<Play> {
    return this.playsService.update(id, updatePlayDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete play' })
  @ApiResponse({ status: 200, description: 'Play deleted successfully' })
  @ApiResponse({ status: 404, description: 'Play not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.playsService.remove(id);
  }

  @Post(':id/view')
  @ApiOperation({ summary: 'Increment play views' })
  @ApiResponse({ status: 200, description: 'View count incremented' })
  incrementViews(@Param('id') id: string): Promise<void> {
    return this.playsService.incrementViews(id);
  }

  @Get('stats/admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get plays statistics for admin' })
  @ApiResponse({ status: 200, description: 'Plays statistics' })
  getStats() {
    return this.playsService.getStats();
  }
} 