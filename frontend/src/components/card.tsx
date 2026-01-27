'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={hover ? { y: -8, scale: 1.02, rotate: 0.5 } : undefined}
      transition={{ 
        duration: 0.3,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      className={cn(
        'rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6',
        hover && 'hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
