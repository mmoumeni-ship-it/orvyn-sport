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
        canonical="/menu"
      />
      {/* Hero */}
      <section className="relative bg-beige pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-line/70">
        <div className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-frais/20 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">La carte ORVYN</span>
          <h1 className="font-display h-editorial text-charbon tracking-tight mb-6">
            Nos repas sportifs
          </h1>
          <p className="text-base text-olive max-w-2xl mx-auto font-sans leading-relaxed">
            Découvrez tous les repas ORVYN : bowls protéinés, shakes et snacks healthy adaptés à vos objectifs sportifs.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="bg-bone py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white border border-line/80 p-4 rounded-2xl shadow-[0_1px_3px_rgba(23,26,24,0.05)] mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-olive/60" />
              <input
                type="text"
                placeholder="Rechercher un repas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-bg-secondary py-2.5 pl-10 pr-10 text-sm text-charbon placeholder-olive/60 focus:border-sauge focus:outline-none focus:ring-1 focus:ring-sauge/30 transition-all border border-transparent"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-olive/70 hover:text-charbon">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`orvyn-clip-sm px-4 py-2.5 text-xs font-semibold transition ${
                    activeCategory === cat.key
                      ? 'bg-sauge text-bone'
                      : 'bg-bg-secondary text-charbon/70 hover:bg-white border border-line/70'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredMeals.length === 0 ? (
            <div className="text-center py-20 bg-white orvyn-clip-sm border border-line/70 p-8 max-w-md mx-auto space-y-4">
              <ChefHat className="h-10 w-10 text-sauge mx-auto mb-2" />
              <h3 className="font-display font-semibold text-charbon text-lg mb-1">Aucun repas trouvé</h3>
              <p className="text-sm text-olive font-sans">Essayez de modifier vos filtres.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredMeals.map((meal) => (
                  <motion.div
                    layout
                    key={meal.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => navigate(`/menu/${meal.slug}`)}
                    className="group orvyn-clip-sm bg-white border border-line/70 shadow-[0_1px_4px_rgba(23,26,24,0.06)] overflow-hidden flex flex-col hover:shadow-[0_10px_30px_rgba(23,26,24,0.08)] hover:border-sauge/30 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-bg-secondary">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        loading="lazy"
                        className="h-full w-full object-cover photo-lumineuse transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {meal.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] tracking-widest uppercase bg-white/90 text-sauge border border-line/60 px-2 py-1 rounded-lg backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-display font-semibold text-charbon tracking-tight group-hover:text-sauge transition duration-300">
                          {meal.name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-sauge font-semibold">
                            <Flame className="h-3.5 w-3.5" />
                            {meal.calories} kcal
                          </span>
                          <span className="text-line">•</span>
                          <span className="text-olive font-medium">{meal.proteins}g Protéines</span>
                          <span className="text-line">•</span>
                          <span className="text-olive/80">{meal.carbs}g G / {meal.lipids}g L</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {meal.goals.map(goal => (
                            <span key={goal} className="text-[10px] uppercase bg-sauge/10 text-sauge border border-sauge/20 px-2 py-0.5 rounded-lg">
                              {goal}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-line/60 flex items-center justify-between">
                        <span className="text-lg font-semibold text-charbon">{meal.price.toFixed(2)} €</span>
                        <span className="text-xs font-medium text-sauge flex items-center gap-1 group-hover:gap-2 transition-all">
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
