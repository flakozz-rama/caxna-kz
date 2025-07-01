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

// Request interceptor для добавления языка
axiosInstance.interceptors.request.use(
  (config) => {
    // Получаем язык из localStorage или используем по умолчанию
    const lang = localStorage.getItem('language') || 'kaz';
    if (config.params) {
      config.params.lang = lang;
    } else {
      config.params = { lang };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor для обработки ошибок
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Логируем ошибку для отладки
    console.error('API Error:', error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);

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
  titleQaz?: string;
  content: string;
  contentQaz?: string;
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
  titleQaz?: string;
  content: string;
  contentQaz?: string;
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
  titleQaz?: string;
  description?: string;
  descriptionQaz?: string;
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
  titleQaz?: string;
  content: string;
  contentQaz?: string;
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
  titleQaz?: string;
  content: string;
  contentQaz?: string;
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