import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

export enum InterviewStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PENDING = 'pending',
}

@Entity('interviews')
@Index(['slug'], { unique: true })
@Index(['status', 'createdAt'])
export class Interview extends BaseEntity {
  @Column({ name: 'title', length: 500 })
  title: string;

  @Column({ name: 'title_qaz', length: 500, nullable: true })
  titleQaz: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'content_qaz', type: 'text', nullable: true })
  contentQaz: string;

  @Column({ name: 'interviewee', length: 200, nullable: true })
  interviewee: string;

  @Column({ unique: true, length: 255, nullable: true })
  slug: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: InterviewStatus,
    default: InterviewStatus.DRAFT,
  })
  status: InterviewStatus;

  @Column({ default: 0 })
  views: number;

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date;

  @Column({ name: 'interview_date', nullable: true })
  interviewDate: Date;

  @Column({ name: 'author_id', nullable: true })
  authorId: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({ name: 'meta_description_kaz', length: 500, nullable: true })
  metaDescriptionKaz: string;

  @Column({ name: 'meta_description_qaz', length: 500, nullable: true })
  metaDescriptionQaz: string;
}
