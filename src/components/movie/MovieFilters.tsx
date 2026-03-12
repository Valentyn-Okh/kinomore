import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { movieApi } from '../../services/api';
import { MovieFilters as FiltersType, Genre } from '@/types';
import Button from '../ui/Button';
import { FaFilter, FaTimes } from 'react-icons/fa';

interface MovieFiltersProps {
  onFilterChange: (filters: FiltersType) => void;
}

const filterSchema = z.object({
  with_genres: z.string().optional(),
  primary_release_year: z.string().regex(/^\d{4}$/, 'Рік має бути 4-значним числом').optional().or(z.literal('')),
  'vote_average.gte': z.string().regex(/^\d*\.?\d+$/, 'Введіть число').optional().or(z.literal('')),
  sort_by: z.enum([
    'popularity.desc', 
    'popularity.asc',
    'release_date.desc', 
    'release_date.asc',
    'vote_average.desc', 
    'vote_average.asc',
    'title.asc', 
    'title.desc'
  ]).optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

const MovieFilters = ({ onFilterChange }: MovieFiltersProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      sort_by: 'popularity.desc',
    },
  });

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await movieApi.getGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    };
    loadGenres();
  }, []);

  const onSubmit: SubmitHandler<FilterFormData> = (data) => {
    const filters: FiltersType = {};
    
    if (data.with_genres) filters.with_genres = data.with_genres;
    if (data.primary_release_year) filters.primary_release_year = data.primary_release_year;
    if (data['vote_average.gte']) filters['vote_average.gte'] = data['vote_average.gte'];
    if (data.sort_by) filters.sort_by = data.sort_by;
    
    onFilterChange(filters);
    setIsOpen(false);
  };

  const handleReset = (): void => {
    reset({
      with_genres: '',
      primary_release_year: '',
      'vote_average.gte': '',
      sort_by: 'popularity.desc',
    });
    onFilterChange({});
  };

  return (
    <div className="bg-dark-200/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Фільтри</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
        >
          {isOpen ? <FaTimes /> : <FaFilter />}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={`${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Сортувати за
          </label>
          <select
            {...register('sort_by')}
            className="w-full p-3 rounded-lg bg-dark-300/50 border border-white/10 text-white focus:border-primary-500 focus:outline-none transition-colors"
          >
            <option value="popularity.desc">За популярністю (спадання)</option>
            <option value="popularity.asc">За популярністю (зростання)</option>
            <option value="release_date.desc">За датою (новіші)</option>
            <option value="release_date.asc">За датою (старіші)</option>
            <option value="vote_average.desc">За рейтингом (спадання)</option>
            <option value="vote_average.asc">За рейтингом (зростання)</option>
            <option value="title.asc">За назвою (А-Я)</option>
            <option value="title.desc">За назвою (Я-А)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Жанр
          </label>
          <select
            {...register('with_genres')}
            className="w-full p-3 rounded-lg bg-dark-300/50 border border-white/10 text-white focus:border-primary-500 focus:outline-none transition-colors"
          >
            <option value="">Всі жанри</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Рік випуску
          </label>
          <input
            type="text"
            {...register('primary_release_year')}
            placeholder="2024"
            className={`w-full p-3 rounded-lg bg-dark-300/50 border ${
              errors.primary_release_year ? 'border-red-500' : 'border-white/10'
            } text-white focus:border-primary-500 focus:outline-none transition-colors`}
          />
          {errors.primary_release_year && (
            <p className="text-red-500 text-sm mt-1">{errors.primary_release_year.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Мінімальний рейтинг
          </label>
          <input
            type="text"
            {...register('vote_average.gte')}
            placeholder="7.5"
            className={`w-full p-3 rounded-lg bg-dark-300/50 border ${
              errors['vote_average.gte'] ? 'border-red-500' : 'border-white/10'
            } text-white focus:border-primary-500 focus:outline-none transition-colors`}
          />
          {errors['vote_average.gte'] && (
            <p className="text-red-500 text-sm mt-1">{errors['vote_average.gte'].message}</p>
          )}
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" size="md" fullWidth>
            Застосувати
          </Button>
          <Button type="button" variant="secondary" size="md" onClick={handleReset}>
            Скинути
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MovieFilters;