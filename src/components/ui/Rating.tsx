import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const Rating = ({
  value,
  max = 10,
  size = 'md',
  showValue = true,
  className = '',
}: RatingProps) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  const percentage = (value / max) * 100;
  const stars = 5;
  const starPercentage = (percentage / 100) * stars;
  const fullStars = Math.floor(starPercentage);
  const hasHalfStar = starPercentage % 1 >= 0.5;

  const getRatingColor = (rating: number): string => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    if (rating >= 4) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className={`flex items-center gap-2 ${sizes[size]} ${className}`}>
      <div className="flex gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar
            key={`full-${i}`}
            size={iconSizes[size]}
            className="text-yellow-500"
          />
        ))}
        {hasHalfStar && (
          <FaStarHalfAlt
            size={iconSizes[size]}
            className="text-yellow-500"
          />
        )}
        {[...Array(stars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FaRegStar
            key={`empty-${i}`}
            size={iconSizes[size]}
            className="text-gray-500"
          />
        ))}
      </div>
      {showValue && (
        <span className={`font-bold ${getRatingColor(value)}`}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;