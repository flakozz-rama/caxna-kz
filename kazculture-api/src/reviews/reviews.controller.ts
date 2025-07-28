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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewStatus } from './entities/review.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'Review created successfully', type: Review })
  create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all published reviews' })
  @ApiResponse({ status: 200, description: 'List of published reviews', type: [Review] })
  findAll(@Query('status') status?: ReviewStatus): Promise<Review[]> {
    return this.reviewsService.findAll(status);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all reviews for admin' })
  @ApiResponse({ status: 200, description: 'List of all reviews', type: [Review] })
  findAllAdmin(@Query('status') status?: ReviewStatus): Promise<Review[]> {
    return this.reviewsService.findAllAdmin(status);
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get review by ID' })
  @ApiResponse({ status: 200, description: 'Review found', type: Review })
  @ApiResponse({ status: 404, description: 'Review not found' })
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get review by slug' })
  @ApiResponse({ status: 200, description: 'Review found', type: Review })
  @ApiResponse({ status: 404, description: 'Review not found' })
  findBySlug(@Param('slug') slug: string): Promise<Review> {
    return this.reviewsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update review' })
  @ApiResponse({ status: 200, description: 'Review updated successfully', type: Review })
  @ApiResponse({ status: 404, description: 'Review not found' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete review' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.reviewsService.remove(id);
  }

  @Post(':id/view')
  @ApiOperation({ summary: 'Increment review views' })
  @ApiResponse({ status: 200, description: 'View count incremented' })
  incrementViews(@Param('id') id: string): Promise<void> {
    return this.reviewsService.incrementViews(id);
  }

  @Get('stats/admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get reviews statistics for admin' })
  @ApiResponse({ status: 200, description: 'Reviews statistics' })
  getStats() {
    return this.reviewsService.getStats();
  }
} 