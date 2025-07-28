import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Article } from './articles/entities/article.entity';
import { Video } from './videos/entities/video.entity';
import { Interview } from './interviews/entities/interview.entity';
import { Zhanalyq } from './zhanalyqtar/entities/zhanalyq.entity';
import { ArnaiyZhobala } from './arnaiy-zhobalar/entities/arnaiy-zhobala.entity';
import { Play } from './plays/entities/play.entity';
import { Review } from './reviews/entities/review.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
    @InjectRepository(Zhanalyq)
    private zhanalyqtarRepository: Repository<Zhanalyq>,
    @InjectRepository(ArnaiyZhobala)
    private arnaiyZhobalarRepository: Repository<ArnaiyZhobala>,
    @InjectRepository(Play)
    private playsRepository: Repository<Play>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDashboardStats() {
    const [
      usersCount,
      articlesCount,
      videosCount,
      interviewsCount,
      zhanalyqtarCount,
      arnaiyZhobalarCount,
      playsCount,
      reviewsCount,
    ] = await Promise.all([
      this.usersRepository.count(),
      this.articlesRepository.count(),
      this.videosRepository.count(),
      this.interviewsRepository.count(),
      this.zhanalyqtarRepository.count(),
      this.arnaiyZhobalarRepository.count(),
      this.playsRepository.count(),
      this.reviewsRepository.count(),
    ]);

    return {
      usersCount,
      articlesCount,
      videosCount,
      interviewsCount,
      zhanalyqtarCount,
      arnaiyZhobalarCount,
      playsCount,
      reviewsCount,
    };
  }
}
