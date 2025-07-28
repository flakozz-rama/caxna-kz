import { useQuery } from '@tanstack/react-query';
import { axiosInstance, type ApiResponse, type PaginatedResponse } from './axios';
import type { 
  Article, 
  News, 
  Video, 
  Interview, 
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



export const useSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.search(query),
    queryFn: () => searchApi.search(query),
    enabled: !!query && query.length > 2,
  });
};

// Экспортируем старые функции для обратной совместимости
export const getArticles = articlesApi.getAll;
export const getArticleById = async (id: string): Promise<Article> => {
  const response = await axiosInstance.get<Article>(`/articles/id/${id}`);
  return response.data;
};
export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const isUuid = /^[0-9a-fA-F-]{36}$/.test(slug);
  if (isUuid) {
    const response = await axiosInstance.get<Article>(`/articles/id/${slug}`);
    return response.data;
  } else {
    const response = await axiosInstance.get<Article>(`/articles/${slug}`);
    return response.data;
  }
};
export const getNews = newsApi.getAll;
export const getNewsById = async (id: string): Promise<News> => {
  const response = await axiosInstance.get<News>(`/zhanalyqtar/id/${id}`);
  return response.data;
};
export const getNewsBySlug = async (slug: string): Promise<News> => {
  const isUuid = /^[0-9a-fA-F-]{36}$/.test(slug);
  if (isUuid) {
    const response = await axiosInstance.get<News>(`/zhanalyqtar/id/${slug}`);
    return response.data;
  } else {
    const response = await axiosInstance.get<News>(`/zhanalyqtar/${slug}`);
    return response.data;
  }
};
export const getVideos = videosApi.getAll;
export const getVideoById = videosApi.getById;
export const getInterviews = interviewsApi.getAll;
export const getInterviewById = interviewsApi.getById;
export const getInterviewBySlug = async (slug: string): Promise<Interview> => {
  const isUuid = /^[0-9a-fA-F-]{36}$/.test(slug);
  if (isUuid) {
    const response = await axiosInstance.get<Interview>(`/interviews/id/${slug}`);
    return response.data;
  } else {
    const response = await axiosInstance.get<Interview>(`/interviews/${slug}`);
    return response.data;
  }
};


// Функции для пьес и рецензий
export const getPlays = async () => {
  const response = await axiosInstance.get<any[]>('/plays');
  return response.data || [];
};

export const getPlayBySlug = async (slug: string) => {
  const response = await axiosInstance.get<any>(`/plays/slug/${slug}`);
  return response.data;
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
  const response = await axiosInstance.get<any[]>('/reviews');
  return response.data || [];
};

export const getReviewBySlug = async (slug: string) => {
  const response = await axiosInstance.get<any>(`/reviews/slug/${slug}`);
  return response.data;
}; 

export const getPlayById = async (id: string) => {
  const response = await axiosInstance.get<any>(`/plays/id/${id}`);
  return response.data;
};

export const getReviewById = async (id: string) => {
  const response = await axiosInstance.get<any>(`/reviews/id/${id}`);
  return response.data;
};

export const getCommentById = async (id: string) => {
  // TODO: Replace with real API call when available
  // Example: const response = await axiosInstance.get<Comment>(`/pikirlers/${id}`);
  throw new Error('Пікірлер по id пока не поддерживаются в API');
}; 