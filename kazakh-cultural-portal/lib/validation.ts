import { z } from 'zod';

// Схема валидации для поиска
export const searchSchema = z.object({
  query: z.string().min(2, 'Поисковый запрос должен содержать минимум 2 символа').max(100, 'Поисковый запрос не должен превышать 100 символов'),
});

// Схема валидации для фильтров
export const filterSchema = z.object({
  category: z.enum(['all', 'articles', 'news', 'videos', 'interviews', 'projects']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  language: z.enum(['kaz', 'qaz']).optional(),
});

// Схема валидации для контактной формы
export const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа').max(100, 'Имя не должно превышать 100 символов'),
  email: z.string().email('Неверный формат email'),
  subject: z.string().min(5, 'Тема должна содержать минимум 5 символов').max(200, 'Тема не должна превышать 200 символов'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов').max(1000, 'Сообщение не должно превышать 1000 символов'),
});

// Схема валидации для подписки на новости
export const newsletterSchema = z.object({
  email: z.string().email('Неверный формат email'),
  language: z.enum(['kaz', 'qaz']).optional(),
});

// Типы для TypeScript
export type SearchData = z.infer<typeof searchSchema>;
export type FilterData = z.infer<typeof filterSchema>;
export type ContactData = z.infer<typeof contactSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>; 