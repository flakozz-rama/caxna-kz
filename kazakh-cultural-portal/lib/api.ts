import { useQuery } from '@tanstack/react-query';
import { axiosInstance, type ApiResponse, type PaginatedResponse } from './axios';
import type { 
  Article, 
  News, 
  Video, 
  Interview, 
  SpecialProject,
  SearchResult
} from './axios';

// Articles API
export const articlesApi = {
  getAll: async (): Promise<Article[]> => {
    const response = await axiosInstance.get<PaginatedResponse<Article>>('/articles');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<Article> => {
    const response = await axiosInstance.get<Article>(`/articles/${id}`);
    return response.data;
  },
  
  getBySlug: async (slug: string): Promise<Article> => {
    const response = await axiosInstance.get<Article>(`/articles/${slug}`);
    return response.data;
  },

  getFeatured: async (): Promise<Article[]> => {
    const response = await axiosInstance.get<Article[]>('/articles/featured');
    return response.data;
  },
};

// News API
export const newsApi = {
  getAll: async (): Promise<News[]> => {
    const response = await axiosInstance.get<PaginatedResponse<News>>('/zhanalyqtar');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<News> => {
    const response = await axiosInstance.get<News>(`/zhanalyqtar/${id}`);
    return response.data;
  },
  
  getBySlug: async (slug: string): Promise<News> => {
    const response = await axiosInstance.get<News>(`/zhanalyqtar/${slug}`);
    return response.data;
  },

  getFeatured: async (): Promise<News[]> => {
    const response = await axiosInstance.get<News[]>('/zhanalyqtar/featured');
    return response.data;
  },
};

// Videos API
export const videosApi = {
  getAll: async (): Promise<Video[]> => {
    const response = await axiosInstance.get<PaginatedResponse<Video>>('/videos');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<Video> => {
    const response = await axiosInstance.get<Video>(`/videos/${id}`);
    return response.data;
  },

  getFeatured: async (): Promise<Video[]> => {
    const response = await axiosInstance.get<Video[]>('/videos/featured');
    return response.data;
  },
};

// Interviews API
export const interviewsApi = {
  getAll: async (): Promise<Interview[]> => {
    const response = await axiosInstance.get<PaginatedResponse<Interview>>('/interviews');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<Interview> => {
    const response = await axiosInstance.get<Interview>(`/interviews/${id}`);
    return response.data;
  },
  
  getBySlug: async (slug: string): Promise<Interview> => {
    const response = await axiosInstance.get<Interview>(`/interviews/${slug}`);
    return response.data;
  },

  getFeatured: async (): Promise<Interview[]> => {
    const response = await axiosInstance.get<Interview[]>('/interviews/featured');
    return response.data;
  },
};

// Special Projects API
export const specialProjectsApi = {
  getAll: async (): Promise<SpecialProject[]> => {
    const response = await axiosInstance.get<PaginatedResponse<SpecialProject>>('/arnaiy-zhobalar');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<SpecialProject> => {
    const response = await axiosInstance.get<SpecialProject>(`/arnaiy-zhobalar/${id}`);
    return response.data;
  },
  
  getBySlug: async (slug: string): Promise<SpecialProject> => {
    const response = await axiosInstance.get<SpecialProject>(`/arnaiy-zhobalar/${slug}`);
    return response.data;
  },

  getFeatured: async (): Promise<SpecialProject[]> => {
    const response = await axiosInstance.get<SpecialProject[]>('/arnaiy-zhobalar/featured');
    return response.data;
  },
};

// Search API
export const searchApi = {
  search: async (query: string): Promise<SearchResult> => {
    const response = await axiosInstance.get<SearchResult>(`/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};

// Query Keys
export const queryKeys = {
  articles: ['articles'] as const,
  article: (id: string) => ['articles', id] as const,
  articleBySlug: (slug: string) => ['articles', 'slug', slug] as const,
  featuredArticles: ['articles', 'featured'] as const,
  news: ['news'] as const,
  newsItem: (id: string) => ['news', id] as const,
  newsBySlug: (slug: string) => ['news', 'slug', slug] as const,
  featuredNews: ['news', 'featured'] as const,
  videos: ['videos'] as const,
  video: (id: string) => ['videos', id] as const,
  featuredVideos: ['videos', 'featured'] as const,
  interviews: ['interviews'] as const,
  interview: (id: string) => ['interviews', id] as const,
  interviewBySlug: (slug: string) => ['interviews', 'slug', slug] as const,
  featuredInterviews: ['interviews', 'featured'] as const,
  specialProjects: ['specialProjects'] as const,
  specialProject: (id: string) => ['specialProjects', id] as const,
  specialProjectBySlug: (slug: string) => ['specialProjects', 'slug', slug] as const,
  featuredSpecialProjects: ['specialProjects', 'featured'] as const,
  search: (query: string) => ['search', query] as const,
};

// React Query Hooks
export const useArticles = () => {
  return useQuery({
    queryKey: queryKeys.articles,
    queryFn: articlesApi.getAll,
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: queryKeys.article(id),
    queryFn: () => articlesApi.getById(id),
    enabled: !!id,
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.articleBySlug(slug),
    queryFn: () => articlesApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useFeaturedArticles = () => {
  return useQuery({
    queryKey: queryKeys.featuredArticles,
    queryFn: articlesApi.getFeatured,
  });
};

export const useNews = () => {
  return useQuery({
    queryKey: queryKeys.news,
    queryFn: newsApi.getAll,
  });
};

export const useNewsItem = (id: string) => {
  return useQuery({
    queryKey: queryKeys.newsItem(id),
    queryFn: () => newsApi.getById(id),
    enabled: !!id,
  });
};

export const useNewsBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.newsBySlug(slug),
    queryFn: () => newsApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useFeaturedNews = () => {
  return useQuery({
    queryKey: queryKeys.featuredNews,
    queryFn: newsApi.getFeatured,
  });
};

export const useVideos = () => {
  return useQuery({
    queryKey: queryKeys.videos,
    queryFn: videosApi.getAll,
  });
};

export const useVideo = (id: string) => {
  return useQuery({
    queryKey: queryKeys.video(id),
    queryFn: () => videosApi.getById(id),
    enabled: !!id,
  });
};

export const useFeaturedVideos = () => {
  return useQuery({
    queryKey: queryKeys.featuredVideos,
    queryFn: videosApi.getFeatured,
  });
};

export const useInterviews = () => {
  return useQuery({
    queryKey: queryKeys.interviews,
    queryFn: interviewsApi.getAll,
  });
};

export const useInterview = (id: string) => {
  return useQuery({
    queryKey: queryKeys.interview(id),
    queryFn: () => interviewsApi.getById(id),
    enabled: !!id,
  });
};

export const useInterviewBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.interviewBySlug(slug),
    queryFn: () => interviewsApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useFeaturedInterviews = () => {
  return useQuery({
    queryKey: queryKeys.featuredInterviews,
    queryFn: interviewsApi.getFeatured,
  });
};

export const useSpecialProjects = () => {
  return useQuery({
    queryKey: queryKeys.specialProjects,
    queryFn: specialProjectsApi.getAll,
  });
};

export const useSpecialProject = (id: string) => {
  return useQuery({
    queryKey: queryKeys.specialProject(id),
    queryFn: () => specialProjectsApi.getById(id),
    enabled: !!id,
  });
};

export const useSpecialProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.specialProjectBySlug(slug),
    queryFn: () => specialProjectsApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useFeaturedSpecialProjects = () => {
  return useQuery({
    queryKey: queryKeys.featuredSpecialProjects,
    queryFn: specialProjectsApi.getFeatured,
  });
};

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.search(query),
    queryFn: () => searchApi.search(query),
    enabled: !!query && query.length > 2,
  });
};

// Экспортируем старые функции для обратной совместимости
export const getArticles = articlesApi.getAll;
export const getArticleById = articlesApi.getById;
export const getArticleBySlug = articlesApi.getBySlug;
export const getNews = newsApi.getAll;
export const getNewsById = newsApi.getById;
export const getNewsBySlug = newsApi.getBySlug;
export const getVideos = videosApi.getAll;
export const getVideoById = videosApi.getById;
export const getInterviews = interviewsApi.getAll;
export const getInterviewById = interviewsApi.getById;
export const getInterviewBySlug = interviewsApi.getBySlug;
export const getSpecialProjects = specialProjectsApi.getAll;
export const getSpecialProjectById = specialProjectsApi.getById;
export const getSpecialProjectBySlug = specialProjectsApi.getBySlug;

// Заглушки для функций, которые не реализованы в API
export const getPlays = async () => {
  // Заглушка для пьес - пока не реализовано в API
  return [];
};

export const getPlayBySlug = async (slug: string) => {
  // Заглушка для пьесы по slug
  throw new Error('Пьесы пока не поддерживаются в API');
};

export const getOpinions = async () => {
  // Заглушка для мнений - пока не реализовано в API
  return [];
};

export const getOpinionBySlug = async (slug: string) => {
  // Заглушка для мнения по slug
  throw new Error('Мнения пока не поддерживаются в API');
};

export const getReviews = async () => {
  // Заглушка для рецензий - пока не реализовано в API
  return [];
};

export const getReviewBySlug = async (slug: string) => {
  // Заглушка для рецензии по slug
  throw new Error('Рецензии пока не поддерживаются в API');
}; 