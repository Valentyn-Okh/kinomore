import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  hover = true,
  className = '',
  ...props
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;