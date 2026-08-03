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
      <section className="relative bg-orvyn-carbon pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-clay/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">
            LA CARTE ORVYN
          </span>
          <h1 className="font-display h-editorial text-orvyn-bone tracking-tight mb-6">
            Nos repas sportifs
          </h1>
          <p className="text-sm text-orvyn-bone/60 max-w-2xl mx-auto font-sans leading-relaxed">
            Découvrez tous les repas ORVYN : bowls protéinés, shakes et snacks healthy adaptés à vos objectifs sportifs.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-carbon-raised border border-olive/20 p-4 rounded-sm mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orvyn-bone/35" />
              <input
                type="text"
                placeholder="Rechercher un repas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm bg-carbon border border-olive/30 py-2.5 pl-10 pr-10 text-xs text-orvyn-bone placeholder-orvyn-bone/25 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-orvyn-bone/40 hover:text-orvyn-bone">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`orvyn-clip-sm px-4 py-2 text-[10px] tracking-wider uppercase font-semibold transition ${
                    activeCategory === cat.key
                      ? 'bg-sauge text-bone'
                      : 'border border-olive/40 text-orvyn-bone/60 hover:text-orvyn-bone'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredMeals.length === 0 ? (
            <div className="text-center py-20 bg-carbon-raised orvyn-clip-sm depth p-8 max-w-md mx-auto space-y-4">
              <ChefHat className="h-10 w-10 text-clay mx-auto mb-2" />
              <h3 className="font-display font-semibold text-orvyn-bone text-lg mb-1">Aucun repas trouvé</h3>
              <p className="text-xs text-orvyn-bone/50 font-sans">Essayez de modifier vos filtres.</p>
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
                    className="group orvyn-clip-sm depth bg-carbon-raised overflow-hidden flex flex-col hover:bg-[#2b2923] transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-carbon">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-full w-full object-cover photo-orvyn group-hover:grayscale-0 transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {meal.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[8px] tracking-widest uppercase bg-carbon/80 text-orvyn-bone/70 border border-olive/30 px-1.5 py-0.5 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-display font-semibold text-orvyn-bone tracking-tight group-hover:text-clay transition duration-300">
                          {meal.name}
                        </h3>
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="flex items-center gap-1 text-clay font-semibold">
                            <Flame className="h-3.5 w-3.5" />
                            {meal.calories} kcal
                          </span>
                          <span className="text-olive/40">•</span>
                          <span className="text-orvyn-bone/50 font-medium">{meal.proteins}g Protéines</span>
                          <span className="text-olive/40">•</span>
                          <span className="text-orvyn-bone/40">{meal.carbs}g G / {meal.lipids}g L</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {meal.goals.map(goal => (
                            <span key={goal} className="text-[8px] uppercase bg-lime/10 text-lime border border-lime/20 px-1.5 py-0.5">
                              {goal}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-olive/20 flex items-center justify-between">
                        <span className="text-lg font-semibold text-clay">{meal.price.toFixed(2)} €</span>
                        <span className="text-[10px] tracking-wider text-clay flex items-center gap-1 group-hover:gap-2 transition-all">
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
