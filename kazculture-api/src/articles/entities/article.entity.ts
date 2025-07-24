import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PENDING = 'pending',
}

export enum ArticleCategory {
  CULTURE = 'culture',
  ART = 'art',
  HISTORY = 'history',
  LITERATURE = 'literature',
  MUSIC = 'music',
  THEATER = 'theater',
  CINEMA = 'cinema',
  TRADITIONS = 'traditions',
}

@Entity('articles')
@Index(['slug'], { unique: true })
@Index(['status', 'createdAt'])
export class Article extends BaseEntity {
  @Column({ name: 'title', length: 500 })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({
    type: 'enum',
    enum: ArticleCategory,
    default: ArticleCategory.CULTURE,
  })
  category: ArticleCategory;

  @Column({ unique: true, length: 255, nullable: true })
  slug: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.DRAFT,
  })
  status: ArticleStatus;

  @Column({ default: 0 })
  views: number;

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date;

  @Column({ name: 'author_id', nullable: true })
  authorId: string;
}
