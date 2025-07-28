import { z } from 'zod';

// Схемы валидации для статей
export const articleSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(500, 'Заголовок не должен превышать 500 символов'),
  content: z.string().min(1, 'Содержание обязательно'),
  category: z.enum(['culture', 'art', 'history', 'literature', 'music', 'theater', 'cinema', 'traditions']).optional(),
  slug: z.string().optional(),
  imageUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'pending']).default('draft'),
  tags: z.array(z.string()).optional(),
});

export const createArticleSchema = articleSchema;
export const updateArticleSchema = articleSchema.partial();

// Схемы валидации для новостей
export const newsSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(500, 'Заголовок не должен превышать 500 символов'),
  content: z.string().min(1, 'Содержание обязательно'),
  category: z.enum(['culture', 'art', 'theater', 'music', 'cinema', 'literature', 'festival', 'exhibition', 'award', 'event']).optional(),
  slug: z.string().optional(),
  imageUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'pending']).default('draft'),
  eventDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const createNewsSchema = newsSchema;
export const updateNewsSchema = newsSchema.partial();

// Схемы валидации для видео
export const videoSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(500, 'Заголовок не должен превышать 500 символов'),
  description: z.string().optional(),
  url: z.string().url('Неверный формат URL').min(1, 'URL обязателен'),
  duration: z.string().optional(),
  thumbnailUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  category: z.enum(['music', 'theater', 'art', 'cinema', 'dance', 'culture', 'interview', 'documentary']).optional(),
  status: z.enum(['draft', 'published', 'pending']).default('draft'),
  tags: z.array(z.string()).optional(),
});

export const createVideoSchema = videoSchema;
export const updateVideoSchema = videoSchema.partial();

// Схемы валидации для интервью
export const interviewSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(500, 'Заголовок не должен превышать 500 символов'),
  content: z.string().min(1, 'Содержание обязательно'),
  interviewee: z.string().optional(),
  slug: z.string().optional(),
  imageUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'pending']).default('draft'),
  interviewDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const createInterviewSchema = interviewSchema;
export const updateInterviewSchema = interviewSchema.partial();

// Схемы валидации для специальных проектов
export const specialProjectSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(500, 'Заголовок не должен превышать 500 символов'),
  content: z.string().min(1, 'Содержание обязательно'),
  type: z.enum(['festival', 'exhibition', 'concert', 'conference', 'workshop', 'competition', 'award_ceremony', 'special_event']).optional(),
  slug: z.string().optional(),
  imageUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'pending', 'cancelled']).default('draft'),
  eventDate: z.string().optional(),
  eventEndDate: z.string().optional(),
  contactInfo: z.string().optional(),
  ticketInfo: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  isFree: z.boolean().optional(),
});

export const createSpecialProjectSchema = specialProjectSchema;
export const updateSpecialProjectSchema = specialProjectSchema.partial();

// Схемы валидации для пьес
export const playSchema = z.object({
  title: z.string().min(1, 'Тақырып міндетті').max(500, 'Тақырып 500 таңбадан аспауы керек'),
  content: z.string().min(1, 'Мазмұн міндетті'),
  slug: z.string().optional(),
  imageUrl: z.string().url('URL форматы дұрыс емес').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'pending']).default('draft'),
  tags: z.array(z.string()).optional(),
});

export const createPlaySchema = playSchema;
export const updatePlaySchema = playSchema.partial();

// Схемы валидации для рецензий
export const reviewSchema = z.object({
  title: z.string().min(1, 'Тақырып міндетті').max(500, 'Тақырып 500 таңбадан аспауы керек'),
  content: z.string().min(1, 'Мазмұн міндетті'),
  slug: z.string().optional(),
  imageUrl: z.string().url('URL форматы дұрыс емес').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'pending']).default('draft'),
  tags: z.array(z.string()).optional(),
});

export const createReviewSchema = reviewSchema;
export const updateReviewSchema = reviewSchema.partial();

// Схема валидации для входа
export const loginSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

// Схема валидации для загрузки файлов (только на клиенте)
export const uploadFileSchema = z.object({
  file: z.any().refine(
    (file) => {
      if (typeof window === 'undefined') return true; // Пропускаем на сервере
      return file instanceof File;
    },
    'Файл должен быть выбран'
  ).refine(
    (file) => {
      if (typeof window === 'undefined') return true; // Пропускаем на сервере
      return file.size <= 5 * 1024 * 1024; // 5MB
    },
    'Размер файла не должен превышать 5MB'
  ).refine(
    (file) => {
      if (typeof window === 'undefined') return true; // Пропускаем на сервере
      return ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type);
    },
    'Поддерживаются только изображения (JPEG, PNG, WebP, GIF)'
  ),
});

// Типы для TypeScript
export type CreateArticleData = z.infer<typeof createArticleSchema>;
export type UpdateArticleData = z.infer<typeof updateArticleSchema>;
export type CreateNewsData = z.infer<typeof createNewsSchema>;
export type UpdateNewsData = z.infer<typeof updateNewsSchema>;
export type CreateVideoData = z.infer<typeof createVideoSchema>;
export type UpdateVideoData = z.infer<typeof updateVideoSchema>;
export type CreateInterviewData = z.infer<typeof createInterviewSchema>;
export type UpdateInterviewData = z.infer<typeof updateInterviewSchema>;
export type CreateSpecialProjectData = z.infer<typeof createSpecialProjectSchema>;
export type UpdateSpecialProjectData = z.infer<typeof updateSpecialProjectSchema>;
export type CreatePlayData = z.infer<typeof createPlaySchema>;
export type UpdatePlayData = z.infer<typeof updatePlaySchema>;
export type CreateReviewData = z.infer<typeof createReviewSchema>;
export type UpdateReviewData = z.infer<typeof updateReviewSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type UploadFileData = z.infer<typeof uploadFileSchema>; 