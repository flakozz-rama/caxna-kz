import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import {
  ArnaiyZhobala,
  ArnaiyZhobalaStatus,
} from './entities/arnaiy-zhobala.entity';
import { CreateArnaiyZhobalaDto } from './dto/create-arnaiy-zhobala.dto';
import { UpdateArnaiyZhobalaDto } from './dto/update-arnaiy-zhobala.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';

@Injectable()
export class ArnaiyZhobalarService {
  constructor(
    @InjectRepository(ArnaiyZhobala)
    private readonly arnaiyZhobalaRepository: Repository<ArnaiyZhobala>,
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
    createArnaiyZhobalaDto: CreateArnaiyZhobalaDto,
    authorId?: string,
  ): Promise<ArnaiyZhobala> {
    // Генерируем slug если не предоставлен
    if (!createArnaiyZhobalaDto.slug) {
      createArnaiyZhobalaDto.slug = this.generateSlug(createArnaiyZhobalaDto.title);
    }

    const arnaiyZhobala = this.arnaiyZhobalaRepository.create({
      ...createArnaiyZhobalaDto,
      authorId,
      publishedAt:
        createArnaiyZhobalaDto.status === ArnaiyZhobalaStatus.PUBLISHED
          ? new Date()
          : null,
    });
    return this.arnaiyZhobalaRepository.save(arnaiyZhobala);
  }

  async findAll(
    paginationDto: PaginationDto,
    lang: 'kaz' | 'qaz' = 'kaz',
    status?: ArnaiyZhobalaStatus,
  ): Promise<PaginationResponseDto<ArnaiyZhobala>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder =
      this.arnaiyZhobalaRepository.createQueryBuilder('arnaiyZhobala');

    if (status) {
      queryBuilder.where('arnaiyZhobala.status = :status', { status });
    } else {
      queryBuilder.where('arnaiyZhobala.status = :status', {
        status: ArnaiyZhobalaStatus.PUBLISHED,
      });
    }

    const [arnaiyZhobalar, total] = await queryBuilder
      .orderBy('arnaiyZhobala.eventDate', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: arnaiyZhobalar,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async findOne(
    id: string,
    lang: 'kaz' | 'qaz' = 'kaz',
  ): Promise<ArnaiyZhobala> {
    const arnaiyZhobala = await this.arnaiyZhobalaRepository.findOne({
      where: { id },
    });
    if (!arnaiyZhobala) {
      throw new NotFoundException('Event not found');
    }
    return arnaiyZhobala;
  }

  async findBySlug(
    slug: string,
    lang: 'kaz' | 'qaz' = 'kaz',
  ): Promise<ArnaiyZhobala> {
    const arnaiyZhobala = await this.arnaiyZhobalaRepository.findOne({
      where: { slug },
    });
    if (
      !arnaiyZhobala ||
      arnaiyZhobala.status !== ArnaiyZhobalaStatus.PUBLISHED
    ) {
      throw new NotFoundException('Event not found');
    }

    // Increment views
    arnaiyZhobala.views += 1;
    await this.arnaiyZhobalaRepository.save(arnaiyZhobala);

    return arnaiyZhobala;
  }

  async update(
    id: string,
    updateArnaiyZhobalaDto: UpdateArnaiyZhobalaDto,
  ): Promise<ArnaiyZhobala> {
    const arnaiyZhobala = await this.findOne(id);

    // Генерируем slug если не предоставлен и изменился заголовок
    if (!updateArnaiyZhobalaDto.slug && updateArnaiyZhobalaDto.title) {
      updateArnaiyZhobalaDto.slug = this.generateSlug(updateArnaiyZhobalaDto.title);
    }

    if (
      updateArnaiyZhobalaDto.status === ArnaiyZhobalaStatus.PUBLISHED &&
      arnaiyZhobala.status !== ArnaiyZhobalaStatus.PUBLISHED
    ) {
      updateArnaiyZhobalaDto.publishedAt = new Date();
    }

    Object.assign(arnaiyZhobala, updateArnaiyZhobalaDto);
    return this.arnaiyZhobalaRepository.save(arnaiyZhobala);
  }

  async remove(id: string): Promise<void> {
    const arnaiyZhobala = await this.findOne(id);
    await this.arnaiyZhobalaRepository.remove(arnaiyZhobala);
  }

  async search(
    query: string,
    paginationDto: PaginationDto,
    lang: 'kaz' | 'qaz' = 'kaz',
  ): Promise<PaginationResponseDto<ArnaiyZhobala>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const titleField = lang === 'kaz' ? 'title' : 'titleQaz';
    const contentField = lang === 'kaz' ? 'content' : 'contentQaz';

    const [arnaiyZhobalar, total] =
      await this.arnaiyZhobalaRepository.findAndCount({
        where: [
          {
            [titleField]: ILike(`%${query}%`),
            status: ArnaiyZhobalaStatus.PUBLISHED,
          },
          {
            [contentField]: ILike(`%${query}%`),
            status: ArnaiyZhobalaStatus.PUBLISHED,
          },
          { tags: Like(`%${query}%`), status: ArnaiyZhobalaStatus.PUBLISHED },
        ],
        order: { eventDate: 'ASC' },
        skip,
        take: limit,
      });

    return {
      data: arnaiyZhobalar,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async getFeatured(
    lang: 'kaz' | 'qaz' = 'kaz',
    limit: number = 6,
  ): Promise<ArnaiyZhobala[]> {
    return this.arnaiyZhobalaRepository.find({
      where: { status: ArnaiyZhobalaStatus.PUBLISHED, isFeatured: true },
      order: { eventDate: 'ASC' },
      take: limit,
    });
  }
}
