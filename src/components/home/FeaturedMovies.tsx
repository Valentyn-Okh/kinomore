import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { movieApi } from '../../services/api';
import { Movie } from '@/types';
import MovieCard from '../movie/MovieCard';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';
import { FaArrowRight } from 'react-icons/fa';

interface FeaturedMoviesProps {
  title: string;
  category: 'popular' | 'top_rated' | 'upcoming' | 'now_playing';
}

const FeaturedMovies = ({ title, category }: FeaturedMoviesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        switch (category) {
          case 'popular':
            data = await movieApi.getPopularMovies();
            break;
          case 'top_rated':
            data = await movieApi.getTopRatedMovies();
            break;
          case 'upcoming':
            data = await movieApi.getUpcomingMovies();
            break;
          case 'now_playing':
            data = await movieApi.getNowPlayingMovies();
            break;
        }
        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold"
          >
            <span className="gradient-text">{title}</span>
          </motion.h2>
          <Link to={`/movies?category=${category}`}>
            <Button variant="ghost" size="sm" rightIcon={<FaArrowRight />}>
              Всі фільми
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;