import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { movieApi } from '../services/api';
import { MovieDetails } from '@/types';
import MovieDetailsComponent from '../components/movie/MovieDetails';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import { FaArrowLeft } from 'react-icons/fa';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await movieApi.getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError('Не вдалося завантажити інформацію про фільм');
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl mb-4">{error || 'Фільм не знайдено'}</p>
        <Button onClick={() => navigate('/movies')} leftIcon={<FaArrowLeft />}>
          Повернутися до каталогу
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-16"
    >
      <div className="container-custom">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="sm"
          leftIcon={<FaArrowLeft />}
          className="mb-6"
        >
          Назад
        </Button>

        <MovieDetailsComponent movie={movie} />
      </div>
    </motion.div>
  );
};

export default MovieDetailPage;