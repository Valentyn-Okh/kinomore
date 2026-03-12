import { useState } from 'react';
import { MovieDetails as MovieDetailsType } from '@/types';
import { FaCalendar, FaClock, FaFilm, FaLanguage, FaPlay } from 'react-icons/fa';
import Rating from '../ui/Rating';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  
  const trailer = movie.videos?.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}год ${mins}хв`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-xl text-gray-400 mb-4 italic">"{movie.tagline}"</p>
          )}

          <div className="flex items-center gap-6 mb-6">
            <Rating value={movie.vote_average} size="lg" />
            <span className="text-gray-400">{movie.vote_count} голосів</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-dark-300/50 rounded-lg p-3 text-center">
              <FaCalendar className="mx-auto mb-2 text-primary-500" />
              <p className="text-sm text-gray-400">Рік</p>
              <p className="font-semibold">{new Date(movie.release_date).getFullYear()}</p>
            </div>
            <div className="bg-dark-300/50 rounded-lg p-3 text-center">
              <FaClock className="mx-auto mb-2 text-primary-500" />
              <p className="text-sm text-gray-400">Тривалість</p>
              <p className="font-semibold">{formatRuntime(movie.runtime)}</p>
            </div>
            <div className="bg-dark-300/50 rounded-lg p-3 text-center">
              <FaFilm className="mx-auto mb-2 text-primary-500" />
              <p className="text-sm text-gray-400">Статус</p>
              <p className="font-semibold">{movie.status}</p>
            </div>
            <div className="bg-dark-300/50 rounded-lg p-3 text-center">
              <FaLanguage className="mx-auto mb-2 text-primary-500" />
              <p className="text-sm text-gray-400">Мова</p>
              <p className="font-semibold">{movie.original_language.toUpperCase()}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Жанри</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-primary-500/20 text-primary-500 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Опис</h3>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>

          {trailer && (
            <Button
              onClick={() => setShowTrailer(true)}
              variant="primary"
              size="lg"
              leftIcon={<FaPlay />}
              className="mb-6"
            >
              Дивитися трейлер
            </Button>
          )}

          {(movie.budget > 0 || movie.revenue > 0) && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {movie.budget > 0 && (
                <div className="bg-dark-300/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Бюджет</p>
                  <p className="text-xl font-bold text-primary-500">
                    {formatCurrency(movie.budget)}
                  </p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="bg-dark-300/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Касові збори</p>
                  <p className="text-xl font-bold text-green-500">
                    {formatCurrency(movie.revenue)}
                  </p>
                </div>
              )}
            </div>
          )}

          {movie.production_companies.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Виробництво</h3>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="flex items-center gap-2">
                    {company.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                        alt={company.name}
                        className="h-8 object-contain"
                      />
                    ) : (
                      <span className="text-gray-500">{company.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        title="Трейлер"
        size="2xl"
      >
        {trailer && (
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default MovieDetails;