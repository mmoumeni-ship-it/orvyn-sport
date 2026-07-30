import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Flame, Search, X, ChefHat, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { MEALS_DATABASE } from '../data/meals';

const categories = [
  { key: '', label: 'Tous', count: MEALS_DATABASE.length },
  { key: 'Bowls', label: 'Bowls', count: MEALS_DATABASE.filter(m => m.category === 'Bowls').length },
  { key: 'Shakers', label: 'Shakers', count: MEALS_DATABASE.filter(m => m.category === 'Shakers').length },
  { key: 'Snacks', label: 'Snacks', count: MEALS_DATABASE.filter(m => m.category === 'Snacks').length },
];

export default function RepasPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeals = MEALS_DATABASE.filter((meal) => {
    if (activeCategory && meal.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!meal.name.toLowerCase().includes(q) && !meal.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <SEO
        title="Nos repas sportifs"
        description="Découvrez tous les repas ORVYN : bowls protéinés, shakes et snacks healthy adaptés à vos objectifs sportifs."
        canonical="/repas"
      />
      {/* Hero */}
      <section className="relative bg-[#050505] pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block mb-4">
            LA CARTE ORVYN
          </span>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-6xl tracking-[-0.03em] mb-6">
            Nos repas sportifs
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto font-sans">
            Découvrez tous les repas ORVYN : bowls protéinés, shakes et snacks healthy adaptés à vos objectifs sportifs.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0a0a0a] border border-neutral-900 p-4 rounded-2xl mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Rechercher un repas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-neutral-950 border border-neutral-800 py-2.5 pl-10 pr-10 text-xs text-white placeholder-neutral-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/30 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-lg px-4 py-2 text-[10px] font-mono tracking-wider uppercase font-semibold transition border ${
                    activeCategory === cat.key
                      ? 'bg-white text-black border-white'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredMeals.length === 0 ? (
            <div className="text-center py-20 bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-8 max-w-md mx-auto">
              <ChefHat className="h-10 w-10 text-brand-green mx-auto mb-4" />
              <h3 className="font-bold text-white text-base mb-2">Aucun repas trouvé</h3>
              <p className="text-xs text-neutral-400">Essayez de modifier vos filtres.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredMeals.map((meal) => (
                  <motion.div
                    layout
                    key={meal.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => navigate(`/repas/${meal.id}`)}
                    className="group rounded-2xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden flex flex-col hover:border-neutral-800 transition-all duration-300 cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-full w-full object-cover filter grayscale-[10%] group-hover:grayscale-0 transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {meal.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[8px] font-mono tracking-widest uppercase bg-black/70 text-neutral-300 border border-neutral-700 rounded px-1.5 py-0.5 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-brand-green transition duration-300">
                          {meal.name}
                        </h3>
                        <div className="flex items-center gap-3 font-mono text-[10px]">
                          <span className="flex items-center gap-1 text-brand-green font-bold">
                            <Flame className="h-3.5 w-3.5" />
                            {meal.calories} kcal
                          </span>
                          <span className="text-neutral-800">•</span>
                          <span className="text-neutral-300 font-semibold">{meal.proteins}g Protéines</span>
                          <span className="text-neutral-800">•</span>
                          <span className="text-neutral-500">{meal.carbs}g G / {meal.lipids}g L</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {meal.goals.map(goal => (
                            <span key={goal} className="text-[8px] font-mono uppercase bg-brand-green/10 text-brand-green border border-brand-green/20 rounded px-1.5 py-0.5">
                              {goal}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                        <span className="text-lg font-extrabold text-white font-mono">{meal.price.toFixed(2)} €</span>
                        <span className="text-[10px] font-mono tracking-wider text-brand-green flex items-center gap-1 group-hover:gap-2 transition-all">
                          Voir la fiche <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
