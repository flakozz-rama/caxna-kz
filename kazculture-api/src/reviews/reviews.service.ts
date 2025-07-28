import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review, ReviewStatus } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    if (!createReviewDto.slug || !createReviewDto.slug.trim()) {
      createReviewDto.slug = this.generateSlug(createReviewDto.title);
    }
    if (!createReviewDto.slug) {
      createReviewDto.slug = uuidv4();
    }

    // Ensure unique slug
    let counter = 1;
    let originalSlug = createReviewDto.slug;
    while (await this.reviewsRepository.findOne({ where: { slug: createReviewDto.slug } })) {
      createReviewDto.slug = `${originalSlug}-${counter}`;
      counter++;
    }

    const review = this.reviewsRepository.create(createReviewDto);
    return this.reviewsRepository.save(review);
  }

  async findAll(status?: ReviewStatus): Promise<Review[]> {
    const query = this.reviewsRepository.createQueryBuilder('review');
    
    if (status) {
      query.where('review.status = :status', { status });
    }
    
    return query.orderBy('review.createdAt', 'DESC').getMany();
  }

  async findAllAdmin(status?: ReviewStatus): Promise<Review[]> {
    const query = this.reviewsRepository.createQueryBuilder('review');
    
    if (status) {
      query.where('review.status = :status', { status });
    }
    
    return query.orderBy('review.createdAt', 'DESC').getMany();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewsRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async findBySlug(slug: string): Promise<Review> {
    const review = await this.reviewsRepository.findOne({ where: { slug } });
    if (!review) {
      throw new NotFoundException(`Review with slug ${slug} not found`);
    }
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    
    if (updateReviewDto.title && updateReviewDto.title !== review.title) {
      updateReviewDto.slug = this.generateSlug(updateReviewDto.title);
      
      // Ensure unique slug
      let counter = 1;
      let originalSlug = updateReviewDto.slug;
      while (await this.reviewsRepository.findOne({ 
        where: { slug: updateReviewDto.slug, id: { $ne: id } as any } 
      })) {
        updateReviewDto.slug = `${originalSlug}-${counter}`;
        counter++;
      }
    }

    Object.assign(review, updateReviewDto);
    return this.reviewsRepository.save(review);
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewsRepository.remove(review);
  }

  async incrementViews(id: string): Promise<void> {
    await this.reviewsRepository.increment({ id }, 'views', 1);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  async getStats() {
    const [total, published, draft, pending] = await Promise.all([
      this.reviewsRepository.count(),
      this.reviewsRepository.count({ where: { status: ReviewStatus.PUBLISHED } }),
      this.reviewsRepository.count({ where: { status: ReviewStatus.DRAFT } }),
      this.reviewsRepository.count({ where: { status: ReviewStatus.PENDING } }),
    ]);

    return { total, published, draft, pending };
  }
} 