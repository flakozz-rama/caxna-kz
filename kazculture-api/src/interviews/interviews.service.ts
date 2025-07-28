import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Interview, InterviewStatus } from './entities/interview.entity';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
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
    createInterviewDto: CreateInterviewDto,
    authorId?: string,
  ): Promise<Interview> {
    // Генерируем slug если не предоставлен или если он пустой
    if (!createInterviewDto.slug || !createInterviewDto.slug.trim()) {
      createInterviewDto.slug = this.generateSlug(createInterviewDto.title);
    }

    // Проверяем уникальность slug
    let finalSlug = createInterviewDto.slug;
    let counter = 1;
    while (await this.interviewRepository.findOne({ where: { slug: finalSlug } })) {
      finalSlug = `${createInterviewDto.slug}-${counter}`;
      counter++;
    }

    const interview = this.interviewRepository.create({
      ...createInterviewDto,
      slug: finalSlug,
      authorId,
      publishedAt:
        createInterviewDto.status === InterviewStatus.PUBLISHED
          ? new Date()
          : null,
    });
    return this.interviewRepository.save(interview);
  }

  async findAll(
    paginationDto: PaginationDto,
    status?: InterviewStatus,
  ): Promise<PaginationResponseDto<Interview>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const queryBuilder = this.interviewRepository.createQueryBuilder('interview');
    
    // Если статус указан, фильтруем по нему, иначе показываем все
    if (status) {
      queryBuilder.where('interview.status = :status', { status });
    }
    
    const [interviews, total] = await queryBuilder
      .orderBy('interview.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return {
      data: interviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async findOne(id: string): Promise<Interview> {
    const interview = await this.interviewRepository.findOne({ where: { id } });
    if (!interview) {
      throw new NotFoundException('Interview not found');
    }
    return interview;
  }

  async findBySlug(slug: string): Promise<Interview> {
    const interview = await this.interviewRepository.findOne({ where: { slug } });
    if (!interview || interview.status !== InterviewStatus.PUBLISHED) {
      throw new NotFoundException('Interview not found');
    }
    interview.views += 1;
    await this.interviewRepository.save(interview);
    return interview;
  }

  async update(
    id: string,
    updateInterviewDto: UpdateInterviewDto,
  ): Promise<Interview> {
    const interview = await this.findOne(id);

    // Генерируем slug если не предоставлен и изменился заголовок
    if (!updateInterviewDto.slug && updateInterviewDto.title) {
      updateInterviewDto.slug = this.generateSlug(updateInterviewDto.title);
    }

    if (
      updateInterviewDto.status === InterviewStatus.PUBLISHED &&
      interview.status !== InterviewStatus.PUBLISHED
    ) {
      updateInterviewDto.publishedAt = new Date();
    }

    Object.assign(interview, updateInterviewDto);
    return this.interviewRepository.save(interview);
  }

  async remove(id: string): Promise<void> {
    const interview = await this.findOne(id);
    await this.interviewRepository.remove(interview);
  }

  async search(
    query: string,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Interview>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const [interviews, total] = await this.interviewRepository.findAndCount({
      where: [
        { title: ILike(`%${query}%`), status: InterviewStatus.PUBLISHED },
        { content: ILike(`%${query}%`), status: InterviewStatus.PUBLISHED },
        { tags: Like(`%${query}%`), status: InterviewStatus.PUBLISHED },
      ],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return {
      data: interviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async getFeatured(limit?: number): Promise<Interview[]> {
    const queryBuilder = this.interviewRepository.createQueryBuilder('interview');
    queryBuilder.where('interview.status = :status', {
      status: InterviewStatus.PUBLISHED,
    });
    queryBuilder.orderBy('interview.createdAt', 'DESC');
    if (limit) {
      queryBuilder.take(limit);
    }
    return queryBuilder.getMany();
  }
}
