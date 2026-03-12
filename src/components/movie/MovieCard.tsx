import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaStar, FaCalendar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';
import { RootState } from '../../store/store';
import { Movie } from '@/types';
import Card from '../ui/Card';
import Rating from '../ui/Rating';
import toast from 'react-hot-toast';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const isFavorite = favoriteIds.includes(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
      toast.error(`"${movie.title}" видалено з обраного`);
    } else {
      dispatch(addFavorite(movie.id));
      toast.success(`"${movie.title}" додано до обраного`);
    }
  };

  const getYear = (date: string): string => {
    return new Date(date).getFullYear().toString();
  };

  const getPosterUrl = (path: string | null): string => {
    if (path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    }
    return 'https://via.placeholder.com/500x750?text=No+Image';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card hover={true} className="group h-full">
        <Link to={`/movie/${movie.id}`} className="block h-full">
          <div className="relative aspect-[2/3] overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-dark-300 to-dark-400 animate-pulse" />
            )}
            
            {!imageError ? (
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-dark-300 to-dark-400 flex items-center justify-center">
                <span className="text-gray-500 text-center px-4">No Image</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-3 bg-dark-200/80 backdrop-blur-sm rounded-full hover:scale-110 transition-transform z-10"
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-white text-xl" />
              )}
            </motion.button>

            <div className="absolute top-3 left-3">
              <Rating value={movie.vote_average} size="sm" showValue={false} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
                <span className="flex items-center gap-1">
                  <FaCalendar className="text-primary-500" />
                  {getYear(movie.release_date)}
                </span>
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">
                {movie.overview || 'Опис відсутній'}
              </p>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary-500 transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{getYear(movie.release_date)}</span>
              <Rating value={movie.vote_average} size="sm" />
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
};

export default MovieCard;