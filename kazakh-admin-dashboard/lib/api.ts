import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, type ApiResponse, type PaginatedResponse } from './axios';
import type { 
  Article, 
  News, 
  Video, 
  Interview, 
  User, 
  LoginResponse, 
  DashboardStats,
  UploadResponse
} from './axios';

// Types for new entities
export interface Play {
  id: string;
  title: string;
  content: string;
  status: "draft" | "published" | "pending";
  views: number;
  createdAt: string;
  publishedAt?: string;
  slug?: string;
  imageUrl?: string;
  tags?: string[];
  authorId?: string;
}

export interface Review {
  id: string;
  title: string;
  content: string;
  status: "draft" | "published" | "pending";
  views: number;
  createdAt: string;
  publishedAt?: string;
  slug?: string;
  imageUrl?: string;
  tags?: string[];
  authorId?: string;
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  },
};

// Upload API
export const uploadApi = {
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axiosInstance.post<UploadResponse>('/admin/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Articles API
export const articlesApi = {
  getAll: async (): Promise<Article[]> => {
    const response = await axiosInstance.get<{data: Article[]}>('/articles/admin');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<Article> => {
    const response = await axiosInstance.get<Article>(`/articles/admin/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<Article>): Promise<Article> => {
    const response = await axiosInstance.post<Article>('/articles/admin', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Article>): Promise<Article> => {
    const response = await axiosInstance.patch<Article>(`/articles/admin/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/articles/admin/${id}`);
  },
};

// News API
export const newsApi = {
  getAll: async (): Promise<News[]> => {
    const response = await axiosInstance.get<{data: News[]}>('/zhanalyqtar/admin');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<News> => {
    const response = await axiosInstance.get<News>(`/zhanalyqtar/admin/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<News>): Promise<News> => {
    const response = await axiosInstance.post<News>('/zhanalyqtar/admin', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<News>): Promise<News> => {
    const response = await axiosInstance.patch<News>(`/zhanalyqtar/admin/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/zhanalyqtar/admin/${id}`);
  },
};

// Videos API
export const videosApi = {
  getAll: async (): Promise<Video[]> => {
    const response = await axiosInstance.get<{data: Video[]}>('/videos/admin');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<Video> => {
    const response = await axiosInstance.get<Video>(`/videos/admin/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<Video>): Promise<Video> => {
    const response = await axiosInstance.post<Video>('/videos/admin', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Video>): Promise<Video> => {
    const response = await axiosInstance.patch<Video>(`/videos/admin/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/videos/admin/${id}`);
  },
};

// Interviews API
export const interviewsApi = {
  getAll: async (): Promise<Interview[]> => {
    const response = await axiosInstance.get<{data: Interview[]}>('/interviews/admin');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<Interview> => {
    const response = await axiosInstance.get<Interview>(`/interviews/admin/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<Interview>): Promise<Interview> => {
    const response = await axiosInstance.post<Interview>('/interviews/admin', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Interview>): Promise<Interview> => {
    const response = await axiosInstance.patch<Interview>(`/interviews/admin/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/interviews/admin/${id}`);
  },
};

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await axiosInstance.get<{data: User[]}>('/users');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.post<User>('/users', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.patch<User>(`/users/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/users/${id}`);
  },
};



// Plays API
export const playsApi = {
  getAll: async (): Promise<Play[]> => {
    const response = await axiosInstance.get<Play[]>('/plays/admin');
    return response.data || [];
  },
  
  getById: async (id: string): Promise<Play> => {
    const response = await axiosInstance.get<Play>(`/plays/admin/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<Play>): Promise<Play> => {
    const response = await axiosInstance.post<Play>('/plays', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Play>): Promise<Play> => {
    const response = await axiosInstance.patch<Play>(`/plays/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/plays/${id}`);
  },
};

// Reviews API
export const reviewsApi = {
  getAll: async (): Promise<Review[]> => {
    const response = await axiosInstance.get<Review[]>('/reviews/admin');
    return response.data || [];
  },
  
  getById: async (id: string): Promise<Review> => {
    const response = await axiosInstance.get<Review>(`/reviews/admin/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<Review>): Promise<Review> => {
    const response = await axiosInstance.post<Review>('/reviews', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Review>): Promise<Review> => {
    const response = await axiosInstance.patch<Review>(`/reviews/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/reviews/${id}`);
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      const [articles, news, videos, interviews, users, plays, reviews] = await Promise.all([
        articlesApi.getAll(),
        newsApi.getAll(),
        videosApi.getAll(),
        interviewsApi.getAll(),
        usersApi.getAll(),
        playsApi.getAll(),
        reviewsApi.getAll(),
      ]);

      return {
        articlesCount: articles.length,
        newsCount: news.length,
        videosCount: videos.length,
        interviewsCount: interviews.length,
        usersCount: users.length,
        playsCount: plays.length,
        reviewsCount: reviews.length,
        totalViews: articles.reduce((sum: number, article: any) => sum + (article.views || 0), 0) +
                   news.reduce((sum: number, item: any) => sum + (item.views || 0), 0) +
                   videos.reduce((sum: number, video: any) => sum + (video.views || 0), 0) +
                   interviews.reduce((sum: number, interview: any) => sum + (interview.views || 0), 0) +
                   plays.reduce((sum: number, play: any) => sum + (play.views || 0), 0) +
                   reviews.reduce((sum: number, review: any) => sum + (review.views || 0), 0),
      };
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      return {
        articlesCount: 0,
        newsCount: 0,
        videosCount: 0,
        interviewsCount: 0,
        usersCount: 0,
        playsCount: 0,
        reviewsCount: 0,
        totalViews: 0,
      };
    }
  },
};

// Query Keys
export const queryKeys = {
  articles: ['articles'] as const,
  article: (id: string) => ['articles', id] as const,
  news: ['news'] as const,
  newsItem: (id: string) => ['news', id] as const,
  videos: ['videos'] as const,
  video: (id: string) => ['videos', id] as const,
  interviews: ['interviews'] as const,
  interview: (id: string) => ['interviews', id] as const,
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,

  plays: ['plays'] as const,
  play: (id: string) => ['plays', id] as const,
  reviews: ['reviews'] as const,
  review: (id: string) => ['reviews', id] as const,
  dashboardStats: ['dashboardStats'] as const,
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

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: usersApi.getAll,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
};



export const usePlays = () => {
  return useQuery({
    queryKey: queryKeys.plays,
    queryFn: playsApi.getAll,
  });
};

export const usePlay = (id: string) => {
  return useQuery({
    queryKey: queryKeys.play(id),
    queryFn: () => playsApi.getById(id),
    enabled: !!id,
  });
};

export const useReviews = () => {
  return useQuery({
    queryKey: queryKeys.reviews,
    queryFn: reviewsApi.getAll,
  });
};

export const useReview = (id: string) => {
  return useQuery({
    queryKey: queryKeys.review(id),
    queryFn: () => reviewsApi.getById(id),
    enabled: !!id,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: dashboardApi.getStats,
  });
};

// Mutation Hooks
export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: articlesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles });
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Article> }) => 
      articlesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles });
      queryClient.invalidateQueries({ queryKey: queryKeys.article(id) });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: articlesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles });
    },
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: newsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news });
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<News> }) => 
      newsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news });
      queryClient.invalidateQueries({ queryKey: queryKeys.newsItem(id) });
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: newsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news });
    },
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: videosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos });
    },
  });
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Video> }) => 
      videosApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos });
      queryClient.invalidateQueries({ queryKey: queryKeys.video(id) });
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: videosApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos });
    },
  });
};

export const useCreateInterview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: interviewsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews });
    },
  });
};

export const useUpdateInterview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Interview> }) => 
      interviewsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews });
      queryClient.invalidateQueries({ queryKey: queryKeys.interview(id) });
    },
  });
};

export const useDeleteInterview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: interviewsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews });
    },
  });
};



export const useCreatePlay = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: playsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plays });
    },
  });
};

export const useUpdatePlay = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Play> }) => 
      playsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plays });
      queryClient.invalidateQueries({ queryKey: queryKeys.play(id) });
    },
  });
};

export const useDeletePlay = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: playsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plays });
    },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reviewsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Review> }) => 
      reviewsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews });
      queryClient.invalidateQueries({ queryKey: queryKeys.review(id) });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reviewsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: usersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadApi.uploadFile,
  });
};

// Экспортируем старые функции для обратной совместимости
export const login = authApi.login;
export const getArticles = articlesApi.getAll;
export const getArticleById = articlesApi.getById;
export const createArticle = articlesApi.create;
export const updateArticle = articlesApi.update;
export const deleteArticle = articlesApi.delete;
export const getNews = newsApi.getAll;
export const getNewsById = newsApi.getById;
export const createNews = newsApi.create;
export const updateNews = newsApi.update;
export const deleteNews = newsApi.delete;
export const getVideos = videosApi.getAll;
export const getVideoById = videosApi.getById;
export const createVideo = videosApi.create;
export const updateVideo = videosApi.update;
export const deleteVideo = videosApi.delete;
export const getInterviews = interviewsApi.getAll;
export const getInterviewById = interviewsApi.getById;
export const createInterview = interviewsApi.create;
export const updateInterview = interviewsApi.update;
export const deleteInterview = interviewsApi.delete;
export const getUsers = usersApi.getAll;
export const getUserById = usersApi.getById;
export const createUser = usersApi.create;
export const updateUser = usersApi.update;
export const deleteUser = usersApi.delete;

export const getDashboardStats = dashboardApi.getStats; 