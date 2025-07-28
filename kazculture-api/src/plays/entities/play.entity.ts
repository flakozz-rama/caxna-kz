import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

export enum PlayStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PENDING = 'pending',
}

@Entity('plays')
@Index(['slug'], { unique: true })
@Index(['status', 'createdAt'])
export class Play extends BaseEntity {
  @Column({ name: 'title', length: 500 })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({ unique: true, length: 255, nullable: true })
  slug: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: PlayStatus,
    default: PlayStatus.DRAFT,
  })
  status: PlayStatus;

  @Column({ default: 0 })
  views: number;

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date;

  @Column({ name: 'author_id', nullable: true })
  authorId: string;
} 