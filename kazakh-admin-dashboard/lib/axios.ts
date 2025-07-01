import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Создаем axios instance для админ панели
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor для добавления JWT токена
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    if (error.response?.status === 401) {
      // JWT токен истек или недействителен
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    
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

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
  isActive: boolean;
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

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface DashboardStats {
  articlesCount: number;
  newsCount: number;
  videosCount: number;
  interviewsCount: number;
  usersCount: number;
  projectsCount: number;
  totalViews: number;
}

export interface UploadResponse {
  url: string;
  filename: string;
} 