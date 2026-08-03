import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface OrvynButtonProps {
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  light?: boolean;
  children: React.ReactNode;
  className?: string;
  full?: boolean;
}

export default function OrvynButton({
  to,
  onClick,
  variant = 'primary',
  light = false,
  children,
  className = '',
  full,
}: OrvynButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer orvyn-clip-sm';
  const styles =
    variant === 'primary'
      ? 'bg-sauge text-bone hover:bg-sauge-soft'
      : light
        ? 'border border-charbon/25 text-charbon hover:border-charbon/50'
        : 'border border-bone/30 text-bone hover:border-bone/60';

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      {variant === 'secondary' && (
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-sauge transition-all duration-500 group-hover:w-full" />
      )}
    </>
  );

  const cls = `${base} ${styles} ${full ? 'w-full' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
