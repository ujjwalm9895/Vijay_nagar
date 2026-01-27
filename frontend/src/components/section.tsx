'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ 
          duration: 0.6,
          type: 'spring',
          stiffness: 100,
          damping: 20
        }}
        className="max-w-4xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
