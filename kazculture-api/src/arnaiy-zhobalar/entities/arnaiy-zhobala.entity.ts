import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

export enum ArnaiyZhobalaStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

export enum ArnaiyZhobalaType {
  FESTIVAL = 'festival',
  EXHIBITION = 'exhibition',
  CONCERT = 'concert',
  CONFERENCE = 'conference',
  WORKSHOP = 'workshop',
  COMPETITION = 'competition',
  AWARD_CEREMONY = 'award_ceremony',
  SPECIAL_EVENT = 'special_event',
}

@Entity('arnaiy_zhobalar')
@Index(['slug'], { unique: true })
@Index(['status', 'eventDate'])
export class ArnaiyZhobala extends BaseEntity {
  @Column({ name: 'title', length: 500 })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: ArnaiyZhobalaType,
    default: ArnaiyZhobalaType.SPECIAL_EVENT,
  })
  type: ArnaiyZhobalaType;

  @Column({ unique: true, length: 255, nullable: true })
  slug: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: ArnaiyZhobalaStatus,
    default: ArnaiyZhobalaStatus.DRAFT,
  })
  status: ArnaiyZhobalaStatus;

  @Column({ name: 'event_date', nullable: true })
  eventDate: Date;

  @Column({ name: 'event_end_date', nullable: true })
  eventEndDate: Date;

  @Column({ name: 'contact_info', length: 500, nullable: true })
  contactInfo: string;

  @Column({ name: 'ticket_info', length: 500, nullable: true })
  ticketInfo: string;

  @Column({ default: 0 })
  views: number;

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date;

  @Column({ name: 'author_id', nullable: true })
  authorId: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isFree: boolean;
}
