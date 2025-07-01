import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

export enum ZhanalyqStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PENDING = 'pending',
}

export enum ZhanalyqCategory {
  CULTURE = 'culture',
  ART = 'art',
  THEATER = 'theater',
  MUSIC = 'music',
  CINEMA = 'cinema',
  LITERATURE = 'literature',
  FESTIVAL = 'festival',
  EXHIBITION = 'exhibition',
  AWARD = 'award',
  EVENT = 'event',
}

@Entity('zhanalyqtar')
@Index(['slug'], { unique: true })
@Index(['status', 'createdAt'])
export class Zhanalyq extends BaseEntity {
  @Column({ name: 'title', length: 500 })
  title: string;

  @Column({ name: 'title_qaz', length: 500, nullable: true })
  titleQaz: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'content_qaz', type: 'text', nullable: true })
  contentQaz: string;

  @Column({
    type: 'enum',
    enum: ZhanalyqCategory,
    default: ZhanalyqCategory.CULTURE,
  })
  category: ZhanalyqCategory;

  @Column({ unique: true, length: 255, nullable: true })
  slug: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: ZhanalyqStatus,
    default: ZhanalyqStatus.DRAFT,
  })
  status: ZhanalyqStatus;

  @Column({ default: 0 })
  views: number;

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date;

  @Column({ name: 'event_date', nullable: true })
  eventDate: Date;

  @Column({ name: 'location_kaz', length: 200, nullable: true })
  locationKaz: string;

  @Column({ name: 'location_qaz', length: 200, nullable: true })
  locationQaz: string;

  @Column({ name: 'author_id', nullable: true })
  authorId: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({ name: 'meta_description_kaz', length: 500, nullable: true })
  metaDescriptionKaz: string;

  @Column({ name: 'meta_description_qaz', length: 500, nullable: true })
  metaDescriptionQaz: string;

  @Column({ default: false })
  isFeatured: boolean;
}
