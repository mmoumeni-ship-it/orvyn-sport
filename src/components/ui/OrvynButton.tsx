import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface OrvynButtonProps {
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  full?: boolean;
}

export default function OrvynButton({
  to,
  onClick,
  variant = 'primary',
  children,
  className = '',
  full,
}: OrvynButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden px-7 py-3.5 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer';
  const styles =
    variant === 'primary'
      ? 'bg-orvyn-performance text-graphite hover:bg-brass-soft'
      : 'border border-orvyn-olive/50 text-orvyn-bone hover:border-brass hover:text-orvyn-bone';

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-stone/20 transition-transform duration-500 ease-out group-hover:translate-x-0" />
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brass transition-all duration-500 group-hover:w-full" />
    </>
  );

  const cls = `${base} ${styles} orvyn-clip-sm ${full ? 'w-full' : ''} ${className}`;

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
