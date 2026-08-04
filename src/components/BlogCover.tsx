import React from 'react';

export type BlogCategory = 'recovery' | 'nutrition' | 'muscle-gain' | 'cut' | 'bowls' | 'tips';

interface BlogCoverProps {
  category: BlogCategory;
  label?: string;
  className?: string;
}

interface CategoryConfig {
  label: string;
  accent: string;
  accentSoft: string;
  ink: string;
  paper: string;
}

const CONFIG: Record<BlogCategory, CategoryConfig> = {
  recovery: { label: 'Récupération', accent: '#6F7F68', accentSoft: '#87927A', ink: '#242824', paper: '#FCFBF8' },
  nutrition: { label: 'Nutrition', accent: '#87927A', accentSoft: '#6F7F68', ink: '#242824', paper: '#FCFBF8' },
  'muscle-gain': { label: 'Prise de masse', accent: '#242824', accentSoft: '#6F7F68', ink: '#242824', paper: '#FCFBF8' },
  cut: { label: 'Sèche', accent: '#6F7F68', accentSoft: '#87927A', ink: '#242824', paper: '#FCFBF8' },
  bowls: { label: 'Bowls', accent: '#87927A', accentSoft: '#6F7F68', ink: '#242824', paper: '#FCFBF8' },
  tips: { label: 'Conseils', accent: '#242824', accentSoft: '#6F7F68', ink: '#242824', paper: '#FCFBF8' }
};

function Band({ category, cfg }: { category: BlogCategory; cfg: CategoryConfig }) {
  const { accent, accentSoft, ink, paper } = cfg;

  if (category === 'recovery') {
    return (
      <g fill="none" strokeLinecap="round">
        <circle cx="128" cy="46" r="19" stroke={accent} strokeWidth="1.3" />
        <path d="M 126 20 A 27 27 0 0 1 154 42" stroke={accentSoft} strokeWidth="1.4" />
        <path d="M 152 30 L 156 41 L 145 38" stroke={accentSoft} strokeWidth="1.3" />
        <circle cx="60" cy="30" r="2" fill={accent} opacity="0.5" />
        <circle cx="78" cy="24" r="1.6" fill={accentSoft} opacity="0.6" />
        <circle cx="52" cy="54" r="1.8" fill={ink} opacity="0.25" />
      </g>
    );
  }

  if (category === 'nutrition') {
    return (
      <g>
        <path d="M 36 64 A 38 38 0 0 1 112 64 Z" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <path d="M 32 64 H 116" stroke={accentSoft} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="62" cy="54" r="3" fill={accentSoft} />
        <circle cx="78" cy="46" r="3.5" fill={accent} />
        <circle cx="94" cy="54" r="3" fill={accentSoft} />
        <circle cx="70" cy="38" r="2" fill={ink} opacity="0.35" />
        <circle cx="120" cy="40" r="2.5" fill={accent} opacity="0.55" />
        <circle cx="128" cy="52" r="2" fill={accentSoft} opacity="0.7" />
      </g>
    );
  }

  if (category === 'muscle-gain') {
    return (
      <g fill="none" strokeLinecap="round">
        <path d="M 38 28 V 64" stroke={accentSoft} strokeWidth="3" strokeOpacity="0.55" />
        <path d="M 166 28 V 64" stroke={accentSoft} strokeWidth="3" strokeOpacity="0.55" />
        <g transform="translate(102 46) scale(1.05)" stroke={accent}>
          <path d="M-34 0 H34" strokeWidth="2.5" />
          <path d="M-30 -12 V12" strokeWidth="5" />
          <path d="M-22 -16 V16" strokeWidth="6" />
          <path d="M22 -16 V16" strokeWidth="6" />
          <path d="M30 -12 V12" strokeWidth="5" />
        </g>
      </g>
    );
  }

  if (category === 'cut') {
    return (
      <g fill="none" strokeLinecap="round">
        <path d="M 36 22 C 90 34 132 48 168 60" stroke={accent} strokeWidth="1.6" />
        <path d="M 168 60 L 155 56 M 168 60 L 166 72" stroke={accent} strokeWidth="1.3" strokeOpacity="0.8" />
        <path d="M 144 18 C 158 8 172 10 180 21 C 168 29 152 29 144 18 Z" stroke={accentSoft} strokeWidth="1.6" />
        <path d="M 150 21 C 160 18 170 19 176 21" stroke={accentSoft} strokeWidth="1.2" />
        <path d="M 36 70 H 172" stroke={ink} strokeWidth="1" strokeOpacity="0.16" />
      </g>
    );
  }

  if (category === 'bowls') {
    return (
      <g>
        <circle cx="100" cy="46" r="30" fill={paper} stroke={accent} strokeWidth="2" />
        <circle cx="100" cy="46" r="18" fill="none" stroke={accentSoft} strokeWidth="1.4" />
        <path d="M 100 16 L 100 46 L 127 63" stroke={accentSoft} strokeWidth="1.2" strokeOpacity="0.7" />
        <path d="M 100 46 L 73 63" stroke={accentSoft} strokeWidth="1.2" strokeOpacity="0.7" />
        <circle cx="100" cy="30" r="2.4" fill={accent} />
        <circle cx="114" cy="54" r="2.4" fill={accentSoft} />
        <circle cx="86" cy="54" r="2.4" fill={accentSoft} />
      </g>
    );
  }

  return (
    <g fill="none" stroke={accent} strokeLinecap="round" strokeLinejoin="round">
      <rect x="72" y="18" width="56" height="56" rx="8" fill={paper} strokeWidth="1.8" />
      <path d="M 85 36 l5 5 l8 -10" strokeWidth="1.8" />
      <path d="M 84 50 H 114" strokeWidth="1.6" strokeOpacity="0.55" />
      <path d="M 84 60 H 114" strokeWidth="1.6" strokeOpacity="0.55" />
    </g>
  );
}

export default function BlogCover({ category, label, className = '' }: BlogCoverProps) {
  const cfg = CONFIG[category];
  const title = (label || cfg.label).toUpperCase();

  return (
    <div
      role="img"
      aria-label={`Illustration ${cfg.label} ORVYN`}
      className={`relative w-full h-[76px] overflow-hidden bg-[#F7F4EE] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(36,40,36,0.045)_1px,transparent_1px)] [background-size:18px_18px]" />
      <span
        className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-[10px] font-semibold uppercase tracking-[0.28em]"
        style={{ color: 'rgba(36,40,36,0.18)' }}
        aria-hidden="true"
      >
        {title}
      </span>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
        <svg width="140" height="64" viewBox="0 0 200 92" fill="none" focusable="false" aria-hidden="true">
          <Band category={category} cfg={cfg} />
        </svg>
      </div>
    </div>
  );
}
