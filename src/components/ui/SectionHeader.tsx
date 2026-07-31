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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`${center ? 'text-center mx-auto' : 'text-left'} max-w-3xl space-y-6`}
    >
      <div className={`flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
        <span className="hairline w-8 bg-clay opacity-50" />
        <span className={`text-xs uppercase tracking-[0.24em] font-semibold ${light ? 'text-olive' : 'text-clay'}`}>
          {eyebrow}
        </span>
        {center && <span className="hairline w-8 bg-clay opacity-50" />}
      </div>
      <h2
        className={`text-4xl font-semibold leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem] ${
          light ? 'text-carbon' : 'text-orvyn-bone'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-[15px] leading-relaxed font-sans ${light ? 'text-carbon/70' : 'text-orvyn-bone/65'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
