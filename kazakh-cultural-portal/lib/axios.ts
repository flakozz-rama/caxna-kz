import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Создаем axios instance для публичного портала
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Удалить интерцептор, который добавляет lang к каждому запросу
// Удалить все поля типа titleQaz, contentQaz, descriptionQaz и т.д. из Article, News, Video, Interview, SpecialProject

// Типы для API ответов
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Типы для сущностей
export interface Article {
  id: string;
  title: string;
  content: string;
  slug?: string;
  author?: string;
  category?: string;
  status: 'draft' | 'published' | 'pending';
  views?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  slug?: string;
  author?: string;
  status: 'draft' | 'published' | 'pending';
  views?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  url?: string;
  duration?: string;
  author?: string;
  status: 'draft' | 'published' | 'pending';
  views?: number;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interview {
  id: string;
  title: string;
  content: string;
  slug?: string;
  interviewee?: string;
  author?: string;
  status: 'draft' | 'published' | 'pending';
  views?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpecialProject {
  id: string;
  title: string;
  content: string;
  slug?: string;
  author?: string;
  status: 'draft' | 'published' | 'pending';
  views?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  articles: Article[];
  news: News[];
  videos: Video[];
  interviews: Interview[];
  projects: SpecialProject[];
} 