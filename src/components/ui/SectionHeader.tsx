import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  serifWord?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  serifWord,
}: SectionHeaderProps) {
  const center = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`${center ? 'text-center mx-auto' : 'text-left'} max-w-3xl space-y-6`}
    >
      <div className={`flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
        <span className="hairline w-8 bg-brass opacity-60" />
        <span className={`font-mono text-[10px] uppercase tracking-[0.3em] font-semibold ${light ? 'text-olive' : 'text-brass'}`}>
          {eyebrow}
        </span>
        {center && <span className="hairline w-8 bg-brass opacity-60" />}
      </div>
      <h2
        className={`text-4xl font-semibold leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem] ${
          light ? 'text-graphite' : 'text-orvyn-bone'
        }`}
      >
        {title}
        {serifWord && (
          <>
            {' '}
            <em className="serif-word text-brass">{serifWord}</em>
          </>
        )}
      </h2>
      {description && (
        <p className={`text-[15px] leading-relaxed font-sans ${light ? 'text-graphite/70' : 'text-orvyn-bone/65'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
