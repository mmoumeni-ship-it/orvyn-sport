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
  'Prise de masse': 'bg-frais/15 text-frais border-frais/30',
  'Sèche': 'bg-citron/15 text-citron border-citron/30',
  'Perte de poids': 'bg-frais/15 text-frais border-frais/30',
  'Récupération': 'bg-sauge/25 text-bone border-sauge/45',
  'Performance': 'bg-citron/15 text-citron border-citron/30',
  'Maintien': 'bg-frais/15 text-frais border-frais/30',
};

interface GoalBadgeProps {
  goal: string;
}

export default function GoalBadge({ goal }: GoalBadgeProps) {
  const meta = GOAL_META[goal] ?? { label: goal, code: 'X' };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sans text-[9px] font-semibold uppercase tracking-widest ${GOAL_COLORS[goal] ?? 'bg-bone/10 text-bone/60 border-bone/20'}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
