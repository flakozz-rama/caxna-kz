import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Article, ArticleStatus } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  async create(
    createArticleDto: CreateArticleDto,
    authorId?: string,
  ): Promise<Article> {
    // Генерируем slug если не предоставлен
    if (!createArticleDto.slug) {
      createArticleDto.slug = this.generateSlug(createArticleDto.title);
    }

    const article = this.articleRepository.create({
      ...createArticleDto,
      authorId,
      publishedAt:
        createArticleDto.status === ArticleStatus.PUBLISHED ? new Date() : null,
    });
    return this.articleRepository.save(article);
  }

  async findAll(
    paginationDto: PaginationDto,
    status?: ArticleStatus,
  ): Promise<PaginationResponseDto<Article>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const queryBuilder = this.articleRepository.createQueryBuilder('article');
    if (status) {
      queryBuilder.where('article.status = :status', { status });
    } else {
      queryBuilder.where('article.status = :status', {
        status: ArticleStatus.PUBLISHED,
      });
    }
    const [articles, total] = await queryBuilder
      .orderBy('article.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return {
      data: articles,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async findBySlug(slug: string): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { slug } });
    if (!article || article.status !== ArticleStatus.PUBLISHED) {
      throw new NotFoundException('Article not found');
    }
    article.views += 1;
    await this.articleRepository.save(article);
    return article;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOne(id);

    // Генерируем slug если не предоставлен и изменился заголовок
    if (!updateArticleDto.slug && updateArticleDto.title) {
      updateArticleDto.slug = this.generateSlug(updateArticleDto.title);
    }

    if (
      updateArticleDto.status === ArticleStatus.PUBLISHED &&
      article.status !== ArticleStatus.PUBLISHED
    ) {
      updateArticleDto.publishedAt = new Date();
    }

    Object.assign(article, updateArticleDto);
    return this.articleRepository.save(article);
  }

  async remove(id: string): Promise<void> {
    const article = await this.findOne(id);
    await this.articleRepository.remove(article);
  }

  async search(
    query: string,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Article>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const [articles, total] = await this.articleRepository.findAndCount({
      where: [
        { title: ILike(`%${query}%`), status: ArticleStatus.PUBLISHED },
        { content: ILike(`%${query}%`), status: ArticleStatus.PUBLISHED },
        { tags: Like(`%${query}%`), status: ArticleStatus.PUBLISHED },
      ],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return {
      data: articles,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async getFeatured(limit?: number): Promise<Article[]> {
    const queryBuilder = this.articleRepository.createQueryBuilder('article');
    queryBuilder.where('article.status = :status', {
      status: ArticleStatus.PUBLISHED,
    });
    queryBuilder.orderBy('article.createdAt', 'DESC');
    if (limit) {
      queryBuilder.take(limit);
    }
    return queryBuilder.getMany();
  }
}
