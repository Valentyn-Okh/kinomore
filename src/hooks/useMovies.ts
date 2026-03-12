import { useState, useEffect, useCallback } from 'react';
import { movieApi } from '../services/api';
import { Movie, MovieFilters, ApiResponse } from '@/types';

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
  setFilters: (filters: MovieFilters) => void;
}

export const useMovies = (
  initialFilters: MovieFilters = {},
  initialPage: number = 1
): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<MovieFilters>(initialFilters);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: ApiResponse<Movie> = await movieApi.getMovies(page, filters);
      setMovies(prev => page === 1 ? data.results : [...prev, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('Помилка завантаження фільмів');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const loadMore = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const refetch = useCallback(() => {
    setPage(1);
    setMovies([]);
    fetchMovies();
  }, [fetchMovies]);

  const handleSetFilters = useCallback((newFilters: MovieFilters) => {
    setFilters(newFilters);
    setPage(1);
    setMovies([]);
  }, []);

  return {
    movies,
    loading,
    error,
    page,
    totalPages,
    hasMore: page < totalPages,
    loadMore,
    refetch,
    setFilters: handleSetFilters,
  };
};