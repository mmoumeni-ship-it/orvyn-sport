import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}: SectionHeaderProps) {
  const center = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${center ? 'text-center mx-auto' : 'text-left'} max-w-3xl space-y-5`}
    >
      <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        <span className="h-[2px] w-8 bg-orvyn-performance" />
        <span className={`font-mono text-[10px] uppercase tracking-[0.3em] font-bold ${light ? 'text-orvyn-olive' : 'text-orvyn-performance'}`}>
          {eyebrow}
        </span>
      </div>
      <h2
        className={`font-display text-4xl font-bold leading-[1.05] tracking-[-0.01em] sm:text-5xl ${
          light ? 'text-orvyn-carbon' : 'text-orvyn-bone'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-sm leading-relaxed ${light ? 'text-orvyn-carbon/70' : 'text-orvyn-bone/70'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
