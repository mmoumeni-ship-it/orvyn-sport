import React from 'react';

interface PerformanceLineProps {
  animated?: boolean;
  className?: string;
}

export default function PerformanceLine({ animated = true, className = '' }: PerformanceLineProps) {
  if (animated) {
    return <div className={`performance-line w-full ${className}`} aria-hidden="true" />;
  }
  return (
    <div className={`relative performance-line-static w-full ${className}`} aria-hidden="true">
      <span className="performance-line-arrow" />
    </div>
  );
}
