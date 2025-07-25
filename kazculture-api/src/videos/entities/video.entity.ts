import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

export enum VideoStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PENDING = 'pending',
}

export enum VideoCategory {
  MUSIC = 'music',
  THEATER = 'theater',
  ART = 'art',
  CINEMA = 'cinema',
  DANCE = 'dance',
  CULTURE = 'culture',
  INTERVIEW = 'interview',
  DOCUMENTARY = 'documentary',
}

@Entity('videos')
@Index(['status', 'createdAt'])
export class Video extends BaseEntity {
  @Column({ name: 'title', length: 500 })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ length: 10, nullable: true }) // Format: "15:30"
  duration: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'slug', unique: true, nullable: true })
  slug: string;

  @Column({
    type: 'enum',
    enum: VideoCategory,
    default: VideoCategory.CULTURE,
  })
  category: VideoCategory;

  @Column({
    type: 'enum',
    enum: VideoStatus,
    default: VideoStatus.DRAFT,
  })
  status: VideoStatus;

  @Column({ default: 0 })
  views: number;

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date;

  @Column({ name: 'author_id', nullable: true })
  authorId: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];
}
