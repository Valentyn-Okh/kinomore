import { Movie } from '@/types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
}

const MovieGrid = ({ movies, loading = false }: MovieGridProps) => {
  if (!loading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-400 text-lg">Фільми не знайдено</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
};

export default MovieGrid;