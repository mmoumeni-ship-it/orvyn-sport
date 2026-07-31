import React from 'react';

export const GOAL_META: Record<string, { label: string; code: string }> = {
  'Prise de masse': { label: 'Prise de masse', code: 'MASS' },
  'Sèche': { label: 'Sèche', code: 'CUT' },
  'Perte de poids': { label: 'Perte de poids', code: 'LOSS' },
  'Récupération': { label: 'Récupération', code: 'REC' },
  'Performance': { label: 'Performance', code: 'PERF' },
  'Maintien': { label: 'Équilibre', code: 'EQ' },
};

const GOAL_COLORS: Record<string, string> = {
  'Prise de masse': 'bg-clay/12 text-clay border-clay/25',
  'Sèche': 'bg-lime/15 text-lime border-lime/30',
  'Perte de poids': 'bg-lime/15 text-lime border-lime/30',
  'Récupération': 'bg-olive/20 text-sand border-olive/40',
  'Performance': 'bg-lime/15 text-lime border-lime/30',
  'Maintien': 'bg-clay/10 text-sand border-clay/25',
};

interface GoalBadgeProps {
  goal: string;
}

export default function GoalBadge({ goal }: GoalBadgeProps) {
  const meta = GOAL_META[goal] ?? { label: goal, code: 'X' };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${GOAL_COLORS[goal] ?? 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
