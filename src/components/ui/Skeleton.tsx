import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: boolean;
}

const Skeleton = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = true,
}: SkeletonProps) => {
  const baseClasses = 'bg-gradient-to-r from-dark-300 to-dark-400';
  const animationClasses = animation ? 'animate-pulse' : '';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : undefined),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;