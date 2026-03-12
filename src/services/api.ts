import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  Movie, 
  MovieDetails, 
  ApiResponse, 
  MovieFilters,
  SearchParams,
  Person,
  Genre 
} from '@/types';

class MovieApiService {
  private api: AxiosInstance;
  private readonly API_KEY: string;
  private readonly BASE_URL: string = 'https://api.themoviedb.org/3';
  private readonly IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p';

  constructor() {
    this.API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
    
    if (!this.API_KEY) {
      throw new Error('TMDB API key is not defined');
    }

    this.api = axios.create({
      baseURL: this.BASE_URL,
      params: {
        api_key: this.API_KEY,
        language: 'uk-UA',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          console.error('Invalid API key');
        } else if (error.response?.status === 404) {
          console.error('Resource not found');
        } else if (error.response?.status === 429) {
          console.error('Too many requests');
        }
        return Promise.reject(error);
      }
    );
  }

  getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${this.IMAGE_BASE_URL}/${size}${path}`;
  }

  async getMovies(page: number = 1, filters: MovieFilters = {}): Promise<ApiResponse<Movie>> {
    try {
      const response: AxiosResponse<ApiResponse<Movie>> = await this.api.get('/discover/movie', {
        params: { page, ...filters },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  async searchMovies(params: SearchParams): Promise<ApiResponse<Movie>> {
    try {
      const response: AxiosResponse<ApiResponse<Movie>> = await this.api.get('/search/movie', {
        params: {
          query: params.query,
          page: params.page || 1,
          include_adult: params.include_adult || false,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  async getMovieDetails(id: string): Promise<MovieDetails> {
    try {
      const response: AxiosResponse<MovieDetails> = await this.api.get(`/movie/${id}`, {
        params: { append_to_response: 'videos,credits,similar,recommendations' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  async getPopularMovies(page: number = 1): Promise<ApiResponse<Movie>> {
    try {
      const response: AxiosResponse<ApiResponse<Movie>> = await this.api.get('/movie/popular', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  async getTopRatedMovies(page: number = 1): Promise<ApiResponse<Movie>> {
    try {
      const response: AxiosResponse<ApiResponse<Movie>> = await this.api.get('/movie/top_rated', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  }

  async getUpcomingMovies(page: number = 1): Promise<ApiResponse<Movie>> {
    try {
      const response: AxiosResponse<ApiResponse<Movie>> = await this.api.get('/movie/upcoming', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  }

  async getNowPlayingMovies(page: number = 1): Promise<ApiResponse<Movie>> {
    try {
      const response: AxiosResponse<ApiResponse<Movie>> = await this.api.get('/movie/now_playing', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  }

  async getGenres(): Promise<Genre[]> {
    try {
      const response: AxiosResponse<{ genres: Genre[] }> = await this.api.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }

  async getPersonDetails(id: string): Promise<Person> {
    try {
      const response: AxiosResponse<Person> = await this.api.get(`/person/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching person details:', error);
      throw error;
    }
  }

  async getSimilarMovies(id: string, page: number = 1): Promise<ApiResponse<Movie>> {
    try {
      const response: AxiosResponse<ApiResponse<Movie>> = await this.api.get(`/movie/${id}/similar`, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching similar movies:', error);
      throw error;
    }
  }

  async getRecommendations(id: string, page: number = 1): Promise<ApiResponse<Movie>> {
    try {
      const response: AxiosResponse<ApiResponse<Movie>> = await this.api.get(`/movie/${id}/recommendations`, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  }
}

export const movieApi = new MovieApiService();