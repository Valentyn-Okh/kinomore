import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { movieApi } from '../services/api';
import { Movie } from '@/types';
import MovieGrid from '../components/movie/MovieGrid';
import Spinner from '../components/ui/Spinner';
import { FaSearch } from 'react-icons/fa';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const data = await movieApi.searchMovies({ query, page });
        setMovies(prev => page === 1 ? data.results : [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query, page]);

  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [query]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FaSearch className="text-6xl text-gray-600 mb-4" />
        <p className="text-xl text-gray-400">Введіть пошуковий запит</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Результати пошуку: <span className="gradient-text">"{query}"</span>
          </h1>
          <p className="text-gray-400">
            Знайдено фільмів: {movies.length}
          </p>
        </motion.div>

        {loading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : movies.length > 0 ? (
          <>
            <MovieGrid movies={movies} />
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
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">Нічого не знайдено</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;