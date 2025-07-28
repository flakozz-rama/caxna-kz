import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Zhanalyq, ZhanalyqStatus } from './entities/zhanalyq.entity';
import { CreateZhanalyqDto } from './dto/create-zhanalyq.dto';
import { UpdateZhanalyqDto } from './dto/update-zhanalyq.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ZhanalyqtarService {
  constructor(
    @InjectRepository(Zhanalyq)
    private readonly zhanalyqRepository: Repository<Zhanalyq>,
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
    createZhanalyqDto: CreateZhanalyqDto,
    authorId?: string,
  ): Promise<Zhanalyq> {
    // Генерируем slug если не предоставлен или если он пустой
    if (!createZhanalyqDto.slug || !createZhanalyqDto.slug.trim()) {
      createZhanalyqDto.slug = this.generateSlug(createZhanalyqDto.title);
    }

    // Проверяем уникальность slug
    let finalSlug = createZhanalyqDto.slug;
    let counter = 1;
    while (await this.zhanalyqRepository.findOne({ where: { slug: finalSlug } })) {
      finalSlug = `${createZhanalyqDto.slug}-${counter}`;
      counter++;
    }

    const zhanalyq = this.zhanalyqRepository.create({
      ...createZhanalyqDto,
      slug: finalSlug,
      authorId,
      publishedAt:
        createZhanalyqDto.status === ZhanalyqStatus.PUBLISHED
          ? new Date()
          : null,
    });
    return this.zhanalyqRepository.save(zhanalyq);
  }

  async findAll(
    paginationDto: PaginationDto,
    status?: ZhanalyqStatus,
  ): Promise<PaginationResponseDto<Zhanalyq>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const queryBuilder = this.zhanalyqRepository.createQueryBuilder('zhanalyq');
    
    // Если статус указан, фильтруем по нему, иначе показываем все
    if (status) {
      queryBuilder.where('zhanalyq.status = :status', { status });
    }
    
    const [zhanalyqtar, total] = await queryBuilder
      .orderBy('zhanalyq.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return {
      data: zhanalyqtar,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async findOne(id: string): Promise<Zhanalyq> {
    const zhanalyq = await this.zhanalyqRepository.findOne({ where: { id } });
    if (!zhanalyq) {
      throw new NotFoundException('News not found');
    }
    return zhanalyq;
  }

  async findBySlug(slug: string): Promise<Zhanalyq> {
    const zhanalyq = await this.zhanalyqRepository.findOne({ where: { slug } });
    if (!zhanalyq || zhanalyq.status !== ZhanalyqStatus.PUBLISHED) {
      throw new NotFoundException('News not found');
    }
    zhanalyq.views += 1;
    await this.zhanalyqRepository.save(zhanalyq);
    return zhanalyq;
  }

  async update(
    id: string,
    updateZhanalyqDto: UpdateZhanalyqDto,
  ): Promise<Zhanalyq> {
    const zhanalyq = await this.findOne(id);

    // Генерируем slug если не предоставлен и изменился заголовок
    if (!updateZhanalyqDto.slug && updateZhanalyqDto.title) {
      updateZhanalyqDto.slug = this.generateSlug(updateZhanalyqDto.title);
    }

    if (
      updateZhanalyqDto.status === ZhanalyqStatus.PUBLISHED &&
      zhanalyq.status !== ZhanalyqStatus.PUBLISHED
    ) {
      updateZhanalyqDto.publishedAt = new Date();
    }

    Object.assign(zhanalyq, updateZhanalyqDto);
    return this.zhanalyqRepository.save(zhanalyq);
  }

  async remove(id: string): Promise<void> {
    const zhanalyq = await this.findOne(id);
    await this.zhanalyqRepository.remove(zhanalyq);
  }

  async search(
    query: string,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Zhanalyq>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const [zhanalyqtar, total] = await this.zhanalyqRepository.findAndCount({
      where: [
        { title: ILike(`%${query}%`), status: ZhanalyqStatus.PUBLISHED },
        { content: ILike(`%${query}%`), status: ZhanalyqStatus.PUBLISHED },
        { tags: Like(`%${query}%`), status: ZhanalyqStatus.PUBLISHED },
      ],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return {
      data: zhanalyqtar,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async getFeatured(limit?: number): Promise<Zhanalyq[]> {
    const queryBuilder = this.zhanalyqRepository.createQueryBuilder('zhanalyq');
    queryBuilder.where('zhanalyq.status = :status', {
      status: ZhanalyqStatus.PUBLISHED,
    });
    queryBuilder.orderBy('zhanalyq.createdAt', 'DESC');
    if (limit) {
      queryBuilder.take(limit);
    }
    return queryBuilder.getMany();
  }
}
