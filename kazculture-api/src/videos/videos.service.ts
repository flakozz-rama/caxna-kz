import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Video, VideoStatus } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async create(
    createVideoDto: CreateVideoDto,
    authorId?: string,
  ): Promise<Video> {
    const video = this.videoRepository.create({
      ...createVideoDto,
      authorId,
      publishedAt:
        createVideoDto.status === VideoStatus.PUBLISHED ? new Date() : null,
    });
    return this.videoRepository.save(video);
  }

  async findAll(
    paginationDto: PaginationDto,
    status?: VideoStatus,
  ): Promise<PaginationResponseDto<Video>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const queryBuilder = this.videoRepository.createQueryBuilder('video');
    if (status) {
      queryBuilder.where('video.status = :status', { status });
    } else {
      queryBuilder.where('video.status = :status', {
        status: VideoStatus.PUBLISHED,
      });
    }
    const [videos, total] = await queryBuilder
      .orderBy('video.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return {
      data: videos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.videoRepository.findOne({ where: { id } });
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    return video;
  }

  async findById(id: string): Promise<Video> {
    const video = await this.videoRepository.findOne({ where: { id } });
    if (!video || video.status !== VideoStatus.PUBLISHED) {
      throw new NotFoundException('Video not found');
    }
    video.views += 1;
    await this.videoRepository.save(video);
    return video;
  }

  async update(id: string, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.findOne(id);

    if (
      updateVideoDto.status === VideoStatus.PUBLISHED &&
      video.status !== VideoStatus.PUBLISHED
    ) {
      updateVideoDto.publishedAt = new Date();
    }

    Object.assign(video, updateVideoDto);
    return this.videoRepository.save(video);
  }

  async remove(id: string): Promise<void> {
    const video = await this.findOne(id);
    await this.videoRepository.remove(video);
  }

  async search(
    query: string,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Video>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const [videos, total] = await this.videoRepository.findAndCount({
      where: [
        { title: ILike(`%${query}%`), status: VideoStatus.PUBLISHED },
        { description: ILike(`%${query}%`), status: VideoStatus.PUBLISHED },
        { tags: Like(`%${query}%`), status: VideoStatus.PUBLISHED },
      ],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return {
      data: videos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async getFeatured(limit?: number): Promise<Video[]> {
    const queryBuilder = this.videoRepository.createQueryBuilder('video');
    queryBuilder.where('video.status = :status', {
      status: VideoStatus.PUBLISHED,
    });
    queryBuilder.orderBy('video.createdAt', 'DESC');
    if (limit) {
      queryBuilder.take(limit);
    }
    return queryBuilder.getMany();
  }
}
