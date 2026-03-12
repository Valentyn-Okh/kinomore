import { motion } from 'framer-motion';
import { SpinnerSize } from '@/types';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  color?: string;
}

const Spinner = ({ 
  size = 'md', 
  className = '',
  color = 'primary-600'
}: SpinnerProps) => {
  const sizes: Record<SpinnerSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors: Record<string, string> = {
    'primary-600': 'border-primary-600',
    'white': 'border-white',
    'gray-600': 'border-gray-600',
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <motion.div
        className={`absolute inset-0 border-4 border-${color} rounded-full opacity-30`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute inset-0 border-4 border-${color} rounded-full border-t-transparent`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Spinner;