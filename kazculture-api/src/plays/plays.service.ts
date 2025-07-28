import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Play, PlayStatus } from './entities/play.entity';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlaysService {
  constructor(
    @InjectRepository(Play)
    private playsRepository: Repository<Play>,
  ) {}

  async create(createPlayDto: CreatePlayDto): Promise<Play> {
    if (!createPlayDto.slug || !createPlayDto.slug.trim()) {
      createPlayDto.slug = this.generateSlug(createPlayDto.title);
    }
    if (!createPlayDto.slug) {
      createPlayDto.slug = uuidv4();
    }

    // Ensure unique slug
    let counter = 1;
    let originalSlug = createPlayDto.slug;
    while (await this.playsRepository.findOne({ where: { slug: createPlayDto.slug } })) {
      createPlayDto.slug = `${originalSlug}-${counter}`;
      counter++;
    }

    const play = this.playsRepository.create(createPlayDto);
    return this.playsRepository.save(play);
  }

  async findAll(status?: PlayStatus): Promise<Play[]> {
    const query = this.playsRepository.createQueryBuilder('play');
    
    if (status) {
      query.where('play.status = :status', { status });
    }
    
    return query.orderBy('play.createdAt', 'DESC').getMany();
  }

  async findAllAdmin(status?: PlayStatus): Promise<Play[]> {
    const query = this.playsRepository.createQueryBuilder('play');
    
    if (status) {
      query.where('play.status = :status', { status });
    }
    
    return query.orderBy('play.createdAt', 'DESC').getMany();
  }

  async findOne(id: string): Promise<Play> {
    const play = await this.playsRepository.findOne({ where: { id } });
    if (!play) {
      throw new NotFoundException(`Play with ID ${id} not found`);
    }
    return play;
  }

  async findBySlug(slug: string): Promise<Play> {
    const play = await this.playsRepository.findOne({ where: { slug } });
    if (!play) {
      throw new NotFoundException(`Play with slug ${slug} not found`);
    }
    return play;
  }

  async update(id: string, updatePlayDto: UpdatePlayDto): Promise<Play> {
    const play = await this.findOne(id);
    
    if (updatePlayDto.title && updatePlayDto.title !== play.title) {
      updatePlayDto.slug = this.generateSlug(updatePlayDto.title);
      
      // Ensure unique slug
      let counter = 1;
      let originalSlug = updatePlayDto.slug;
      while (await this.playsRepository.findOne({ 
        where: { slug: updatePlayDto.slug, id: { $ne: id } as any } 
      })) {
        updatePlayDto.slug = `${originalSlug}-${counter}`;
        counter++;
      }
    }

    Object.assign(play, updatePlayDto);
    return this.playsRepository.save(play);
  }

  async remove(id: string): Promise<void> {
    const play = await this.findOne(id);
    await this.playsRepository.remove(play);
  }

  async incrementViews(id: string): Promise<void> {
    await this.playsRepository.increment({ id }, 'views', 1);
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
      this.playsRepository.count(),
      this.playsRepository.count({ where: { status: PlayStatus.PUBLISHED } }),
      this.playsRepository.count({ where: { status: PlayStatus.DRAFT } }),
      this.playsRepository.count({ where: { status: PlayStatus.PENDING } }),
    ]);

    return { total, published, draft, pending };
  }
} 