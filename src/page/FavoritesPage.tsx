import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { movieApi } from '../services/api';
import { Movie } from '@/types';
import MovieGrid from '../components/movie/MovieGrid';
import Spinner from '../components/ui/Spinner';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const FavoritesPage = () => {
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (favoriteIds.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const moviePromises = favoriteIds.map(id => movieApi.getMovieDetails(id.toString()));
        const movieDetails = await Promise.all(moviePromises);
        setMovies(movieDetails);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteIds]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-8">
          <FaHeart className="text-red-500 text-3xl" />
          <h1 className="text-4xl font-bold">
            <span className="gradient-text">Обране</span>
          </h1>
        </div>

        {movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400 mb-4">
              У вас поки немає обраних фільмів
            </p>
            <Link to="/movies">
              <Button variant="primary">
                Перейти до каталогу
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;