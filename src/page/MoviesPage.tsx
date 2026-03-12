import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MovieGrid from '../components/movie/MovieGrid';
import MovieFilters from '../components/movie/MovieFilters';
import { movieApi } from '../services/api';
import Spinner from '../components/ui/Spinner';
import { Movie, MovieFilters as FiltersType } from '@/types';
import { FaFilter } from 'react-icons/fa';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const getFiltersFromParams = useCallback((): FiltersType => {
    const filters: FiltersType = {};
    searchParams.forEach((value, key) => {
      filters[key as keyof FiltersType] = value;
    });
    return filters;
  }, [searchParams]);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const filters = getFiltersFromParams();
      const data = await movieApi.getMovies(page, filters);
      setMovies(prev => page === 1 ? data.results : [...prev, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [page, getFiltersFromParams]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleFilterChange = (filters: FiltersType): void => {
    setSearchParams(filters as Record<string, string>);
    setPage(1);
  };

  const loadMore = (): void => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold"
          >
            <span className="gradient-text">Каталог</span> фільмів
          </motion.h1>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-dark-300 rounded-lg"
          >
            <FaFilter />
            Фільтри
          </button>
        </div>

        <div className="flex gap-8">
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-80`}>
            <MovieFilters onFilterChange={handleFilterChange} />
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {loading && page === 1 ? (
                <div className="flex justify-center items-center h-64">
                  <Spinner size="lg" />
                </div>
              ) : (
                <MovieGrid movies={movies} />
              )}
            </AnimatePresence>

            {page < totalPages && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Завантаження...' : 'Завантажити ще'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;