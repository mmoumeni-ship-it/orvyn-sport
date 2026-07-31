import React from 'react';

interface OrvynOProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizes = {
  sm: 'h-10 w-10',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
  xl: 'h-40 w-40',
};

export default function OrvynO({ size = 'md', className = '', label }: OrvynOProps) {
  return (
    <div
      className={`orvyn-o flex items-center justify-center ${sizes[size]} ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {label && (
        <span className="font-display text-[0.6em] font-bold text-orvyn-performance">{label}</span>
      )}
    </div>
  );
}
