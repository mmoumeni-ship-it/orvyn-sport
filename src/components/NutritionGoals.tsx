import React from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Flame, Zap, Scale, Heart, ShieldCheck, Check, Leaf, Ban, Activity, Compass } from 'lucide-react';

interface NutritionGoalsProps {
  activeGoal: string;
  setActiveGoal: (goal: string) => void;
  activeTag: string;
  setActiveTag: (tag: string) => void;
  scrollToMenu: () => void;
}

export default function NutritionGoals({
  activeGoal,
  setActiveGoal,
  activeTag,
  setActiveTag,
  scrollToMenu
}: NutritionGoalsProps) {
  
  const goalsList = [
    {
      id: 'Prise de masse',
      name: 'Prise de masse',
      description: 'Développer de la masse musculaire propre grâce à un surplus d\'acides aminés de qualité supérieure.',
      icon: Dumbbell,
      badge: 'PROTÉINES ++',
      glow: 'group-hover:border-emerald-500/30'
    },
    {
      id: 'Perte de poids',
      name: 'Perte de poids',
      description: 'Atteindre un déficit énergétique contrôlé et sain tout en maintenant une satiété optimale.',
      icon: Scale,
      badge: 'FIBRES & RASSASIANT',
      glow: 'group-hover:border-blue-500/30'
    },
    {
      id: 'Sèche',
      name: 'Sèche musculaire',
      description: 'Éliminer la masse grasse et l\'eau sous-cutanée pour sculpter une définition anatomique extrême.',
      icon: Flame,
      badge: 'LOW CARB',
      glow: 'group-hover:border-orange-500/30'
    },
    {
      id: 'Maintien',
      name: 'Maintien Équilibré',
      description: 'Nourrir l\'organisme avec une précision chirurgicale pour stabiliser son poids et sa vitalité.',
      icon: Heart,
      badge: 'VITALITÉ BIO',
      glow: 'group-hover:border-teal-500/30'
    },
    {
      id: 'Performance',
      name: 'Performance Force',
      description: 'Maximiser votre explosivité, force maximale et endurance lors de vos séances à haute intensité.',
      icon: Zap,
      badge: 'HYDRATES COMPLEXES',
      glow: 'group-hover:border-yellow-500/30'
    },
    {
      id: 'Récupération',
      name: 'Récupération',
      description: 'Réparer rapidement les micro-déchirures musculaires et reconstituer les stocks de glycogène.',
      icon: Activity,
      badge: 'RECONSTRUCTION ++',
      glow: 'group-hover:border-pink-500/30'
    }
  ];

  const dietaryFilters = [
    { id: 'Halal', name: 'Halal', icon: ShieldCheck, description: 'Viandes sélectionnées certifiées conformes.' },
    { id: 'Vegan', name: 'Vegan', icon: Leaf, description: 'Aucun ingrédient d\'origine animale.' },
    { id: 'Végétarien', name: 'Végétarien', icon: Heart, description: 'Recettes végétales équilibrées.' },
    { id: 'Sans gluten', name: 'Sans gluten', icon: Ban, description: 'Garanti sans blé ou dérivés.' },
    { id: 'Sans lactose', name: 'Sans lactose', icon: Ban, description: 'Haute digestibilité garantie.' },
    { id: 'Sans porc', name: 'Sans porc', icon: Ban, description: 'Formulé sans aucune trace.' },
    { id: 'Riches en protéines', name: 'Riches en Protéines', icon: Dumbbell, description: 'Densité protéique maximale.' },
    { id: 'Faibles calories', name: 'Faibles Calories', icon: Flame, description: 'Repas légers sous les 400 kcal.' }
  ];

  const handleGoalSelect = (goalId: string) => {
    setActiveGoal(goalId === activeGoal ? '' : goalId);
    scrollToMenu();
  };

  const handleTagSelect = (tagId: string) => {
    setActiveTag(tagId === activeTag ? '' : tagId);
    scrollToMenu();
  };

  const handleResetFilters = () => {
    setActiveGoal('');
    setActiveTag('');
    scrollToMenu();
  };

  return (
    <section id="goals-section" className="bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              SYSTÈME DE FILTRES AVANCÉS
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              Ciblez vos objectifs athlétiques
            </h2>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed">
              Sélectionnez votre objectif ou vos préférences alimentaires. Notre catalogue se mettra instantanément à jour pour vous proposer uniquement les formules adaptées à votre physiologie.
            </p>
          </div>
          
          {(activeGoal || activeTag) && (
            <button
              id="reset-goals-btn"
              onClick={handleResetFilters}
              className="font-mono text-[10px] tracking-widest uppercase font-bold text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-500 px-4 py-2 rounded-full transition cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Goals Grid - 6 columns structured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalsList.map((goal) => {
            const IconComponent = goal.icon;
            const isSelected = activeGoal === goal.id;
            return (
              <div
                id={`goal-card-${goal.id}`}
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-brand-green bg-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-brand-green/30'
                    : 'border-neutral-900 bg-[#0a0a0a] hover:bg-neutral-900/60'
                }`}
              >
                {/* Visual subtle accent background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-4">
                  {/* Top line with Icon & micro-badge */}
                  <div className="flex items-center justify-between">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                      isSelected ? 'bg-brand-green/10 border-brand-green text-brand-green' : 'bg-neutral-950 border-neutral-800 text-neutral-400 group-hover:text-brand-green'
                    }`}>
                      <IconComponent className="h-4.5 w-4.5" />
                    </div>
                    <span className="font-mono text-[8px] font-bold uppercase tracking-widest bg-neutral-900 text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded">
                      {goal.badge}
                    </span>
                  </div>

                  {/* Goal Metadata */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 font-display">
                      {goal.name}
                      {isSelected && <Check className="h-4 w-4 text-brand-green" />}
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
                      {goal.description}
                    </p>
                  </div>
                </div>

                {/* Footer anchor */}
                <div className="pt-5 mt-5 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase text-neutral-500">
                  <span>Filtrer par objectif</span>
                  <span className="text-neutral-300 group-hover:text-brand-green transition font-bold">Sélectionner →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dietary / Preference Sub-Section - Elegant grid of tags */}
        <div className="mt-20 pt-16 border-t border-neutral-900">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <h3 className="text-xl font-bold text-white font-display tracking-tight flex items-center justify-center gap-2">
              <Compass className="h-5 w-5 text-brand-green" />
              Régimes & Préférences Alimentaires
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Parce que la performance athlétique exige un respect absolu de votre métabolisme et de vos convictions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {dietaryFilters.map((diet) => {
              const DietIcon = diet.icon;
              const isSelected = activeTag === diet.id;
              return (
                <button
                  id={`diet-card-${diet.id}`}
                  key={diet.id}
                  onClick={() => handleTagSelect(diet.id)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-brand-green bg-neutral-950 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                      : 'border-neutral-900 bg-[#0a0a0a] text-neutral-400 hover:border-neutral-800 hover:bg-neutral-900/40'
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                    isSelected ? 'bg-brand-green/10 border-brand-green text-brand-green' : 'bg-neutral-950 border-neutral-800 text-neutral-500'
                  }`}>
                    <DietIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                      {diet.name}
                      {isSelected && <Check className="h-3 w-3 text-brand-green" />}
                    </h4>
                    <span className="block text-[9px] text-neutral-500 font-mono tracking-tight truncate mt-0.5">
                      {diet.id === 'Riches en protéines' || diet.id === 'Faibles calories' ? 'Badge nutrition' : 'Option alimentaire'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
