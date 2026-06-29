import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Info, Flame, Search, X, ShieldAlert, Award, ChevronRight, Droplet, Apple, HelpCircle, FileText } from 'lucide-react';
import { Meal, CartItem } from '../types';
import { MEALS_DATABASE } from '../data/meals';

interface MealMenuProps {
  activeGoal: string;
  setActiveGoal: (goal: string) => void;
  activeTag: string;
  setActiveTag: (tag: string) => void;
  onAddToCart: (meal: Meal) => void;
  cart: CartItem[];
  selectedCategory?: 'Bowls' | 'Shakers' | 'Snacks' | '';
  setSelectedCategory?: (cat: 'Bowls' | 'Shakers' | 'Snacks' | '') => void;
}

export default function MealMenu({
  activeGoal,
  setActiveGoal,
  activeTag,
  setActiveTag,
  onAddToCart,
  cart,
  selectedCategory = '',
  setSelectedCategory
}: MealMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetailMeal, setSelectedDetailMeal] = useState<Meal | null>(null);
  const [localCategory, setLocalCategory] = useState<'Bowls' | 'Shakers' | 'Snacks' | ''>('');

  const activeCategory = setSelectedCategory ? selectedCategory : localCategory;
  const handleSetCategory = (cat: 'Bowls' | 'Shakers' | 'Snacks' | '') => {
    if (setSelectedCategory) {
      setSelectedCategory(cat);
    } else {
      setLocalCategory(cat);
    }
  };

  // Compute filtered catalog of meals
  const filteredMeals = useMemo(() => {
    return MEALS_DATABASE.filter((meal) => {
      // 1. Filter by category
      if (activeCategory) {
        if (meal.category !== activeCategory) return false;
      }
      // 2. Filter by active objective
      if (activeGoal) {
        if (!meal.goals.includes(activeGoal)) return false;
      }
      // 3. Filter by dietary filter tags
      if (activeTag) {
        // Handle special macro badges or normal tags
        if (activeTag === 'Riches en protéines' && meal.proteins < 30) return false;
        if (activeTag === 'Faibles calories' && meal.calories > 450) return false;
        if (activeTag !== 'Riches en protéines' && activeTag !== 'Faibles calories' && !meal.tags.includes(activeTag)) return false;
      }
      // 4. Search queries
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = meal.name.toLowerCase().includes(query);
        const matchesDesc = meal.description.toLowerCase().includes(query);
        const matchesIng = meal.ingredients.some(ing => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }
      return true;
    });
  }, [activeCategory, activeGoal, activeTag, searchQuery]);

  const getQuantityInCart = (mealId: string) => {
    const item = cart.find(i => i.meal.id === mealId);
    return item ? item.quantity : 0;
  };

  const handleClearAllFilters = () => {
    setActiveGoal('');
    setActiveTag('');
    setSearchQuery('');
    handleSetCategory('');
  };

  return (
    <section id="menu-section" className="bg-[#050505] py-24 lg:py-32 border-b border-neutral-900 relative">
      {/* Soft color glow map */}
      <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
            LA CARTE ORVYN NUTRITION
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
            La gastronomie sportive d'élite
          </h2>
          <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
            Sélectionnez vos repas de précision, shakers protéinés d'élite ou en-cas d'athlète. Tous nos prix sont affichés de manière 100% transparente.
          </p>
        </div>

        {/* Sophisticated Controls Panel (Search & Categories) */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0a0a0a] border border-neutral-900 p-4 rounded-2xl">
            {/* Instant Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Rechercher un ingrédient, un plat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-neutral-950 border border-neutral-800 py-2.5 pl-10 pr-10 text-xs text-white placeholder-neutral-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category selection Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => handleSetCategory('')}
                className={`rounded-lg px-4 py-2 text-[10px] font-mono tracking-wider uppercase font-semibold transition border ${
                  activeCategory === ''
                    ? 'bg-white text-black border-white'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                Tous ({MEALS_DATABASE.length})
              </button>
              <button
                onClick={() => handleSetCategory('Bowls')}
                className={`rounded-lg px-4 py-2 text-[10px] font-mono tracking-wider uppercase font-semibold transition border ${
                  activeCategory === 'Bowls'
                    ? 'bg-white text-black border-white'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                Signature Bowls
              </button>
              <button
                onClick={() => handleSetCategory('Shakers')}
                className={`rounded-lg px-4 py-2 text-[10px] font-mono tracking-wider uppercase font-semibold transition border ${
                  activeCategory === 'Shakers'
                    ? 'bg-white text-black border-white'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                Signature Protein Shakers
              </button>
              <button
                onClick={() => handleSetCategory('Snacks')}
                className={`rounded-lg px-4 py-2 text-[10px] font-mono tracking-wider uppercase font-semibold transition border ${
                  activeCategory === 'Snacks'
                    ? 'bg-white text-black border-white'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                Signature Healthy Snacks
              </button>
            </div>
          </div>

          {/* Active Sub-Filters feedback bar */}
          {(activeGoal || activeTag || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 bg-[#0d0d0d] border border-neutral-950 px-4 py-2.5 rounded-xl text-xs">
              <span className="text-neutral-500 font-mono text-[10px] uppercase">Filtres appliqués :</span>
              {activeGoal && (
                <span className="inline-flex items-center gap-1 rounded bg-neutral-900 border border-brand-green/20 px-2 py-0.5 text-[10px] text-brand-green font-mono uppercase">
                  Objectif: {activeGoal}
                  <button onClick={() => setActiveGoal('')} className="hover:text-red-400 ml-1.5 text-neutral-500">×</button>
                </span>
              )}
              {activeTag && (
                <span className="inline-flex items-center gap-1 rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[10px] text-neutral-300 font-mono uppercase">
                  Régime: {activeTag}
                  <button onClick={() => setActiveTag('')} className="hover:text-red-400 ml-1.5 text-neutral-500">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[10px] text-neutral-300 font-mono">
                  Recherche: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-400 ml-1.5 text-neutral-500">×</button>
                </span>
              )}
              <button
                onClick={handleClearAllFilters}
                className="text-neutral-400 hover:text-white transition font-mono text-[10px] underline ml-auto uppercase tracking-wider"
              >
                Tout effacer
              </button>
            </div>
          )}
        </div>

        {/* Meals Grid display */}
        {filteredMeals.length === 0 ? (
          <div className="text-center py-20 bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-8 max-w-md mx-auto space-y-5 shadow-2xl animate-fade-in">
            <ShieldAlert className="h-10 w-10 text-brand-green mx-auto" />
            <div className="space-y-2">
              <h3 className="font-bold text-white text-base">Aucune formule trouvée</h3>
              <p className="text-xs text-neutral-400 font-light">
                Nous n'avons pas d'ingrédients ou de plats correspondant exactement à ces critères. Ajustez votre recherche ou réinitialisez les filtres.
              </p>
            </div>
            <button
              onClick={handleClearAllFilters}
              className="rounded-full bg-white text-black px-5 py-2.5 text-[10px] font-mono tracking-widest font-bold uppercase hover:bg-brand-green transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredMeals.map((meal) => {
                const qty = getQuantityInCart(meal.id);

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    id={`meal-card-${meal.id}`}
                    key={meal.id}
                    onClick={() => setSelectedDetailMeal(meal)}
                    className="group rounded-2xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden flex flex-col justify-between hover:border-neutral-800 transition-all duration-300 cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    {/* Meal Cover Image Header */}
                    <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-full w-full object-cover filter grayscale-[10%] group-hover:grayscale-0 transition duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Floating Info Button on Hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/90 text-black text-[10px] font-mono tracking-wider uppercase font-extrabold px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-1">
                          <Info className="h-3.5 w-3.5 stroke-[2.5]" />
                          Fiche nutritionnelle
                        </span>
                      </div>
                    </div>

                    {/* Meal Information Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-brand-green transition duration-300">
                          {meal.name}
                        </h3>
                        
                        {/* Simplified Premium Nutrition Badge Grid */}
                        <div className="flex items-center gap-3 font-mono text-[10px]">
                          <span className="flex items-center gap-1 text-brand-green font-bold">
                            <Flame className="h-3.5 w-3.5" />
                            <span>{meal.calories} kcal</span>
                          </span>
                          <span className="text-neutral-800">•</span>
                          <span className="text-neutral-300 font-semibold">{meal.proteins}g Protéines</span>
                        </div>
                      </div>

                      {/* Price & CTA Basket button */}
                      <div className="pt-3 border-t border-neutral-900 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col">
                          <span className="text-[8px] text-neutral-500 font-mono uppercase tracking-widest">Tarif Unique</span>
                          <span className="text-base font-extrabold text-white font-mono">{meal.price.toFixed(2)} €</span>
                        </div>

                        <button
                          id={`add-to-cart-btn-${meal.id}`}
                          onClick={() => onAddToCart(meal)}
                          className={`rounded-full px-4.5 py-2 text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                            qty > 0
                              ? 'bg-brand-green text-black hover:bg-white'
                              : 'bg-white text-black hover:bg-brand-green hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                          }`}
                        >
                          {qty > 0 ? (
                            <>
                              <Check className="h-3 w-3 text-black stroke-[3px]" />
                              <span>Enregistré ({qty})</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3 w-3 text-black stroke-[3px]" />
                              <span>Prendre</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Meal Detail Popup Dialog (With Premium Glassmorphism) */}
        <AnimatePresence>
          {selectedDetailMeal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
              >
                
                {/* Visual meal preview */}
                <div className="relative aspect-video w-full">
                  <img
                    src={selectedDetailMeal.image}
                    alt={selectedDetailMeal.name}
                    className="h-full w-full object-cover filter grayscale-[10%]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10"></div>
                  
                  {/* Close button */}
                  <button
                    id="close-meal-detail-btn"
                    onClick={() => setSelectedDetailMeal(null)}
                    className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Details list */}
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="font-mono text-[8px] font-bold tracking-widest bg-brand-green/10 text-brand-green border border-brand-green/20 px-2 py-0.5 rounded">
                        CATÉGORIE: {selectedDetailMeal.category}
                      </span>
                      {selectedDetailMeal.subCategory && (
                        <span className="font-mono text-[8px] font-bold tracking-widest bg-neutral-900 text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded">
                          TYPE: {selectedDetailMeal.subCategory}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white tracking-tight">{selectedDetailMeal.name}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2 mb-4 font-light">{selectedDetailMeal.description}</p>
                    
                    {/* Detailed Macro-nutrients Grid */}
                    <div className="bg-neutral-900/50 rounded-2xl p-4 border border-neutral-900 grid grid-cols-4 gap-2 text-center font-mono">
                      <div>
                        <span className="block text-neutral-500 text-[8px] uppercase font-bold tracking-wider mb-1">Calories</span>
                        <span className="text-brand-green font-extrabold text-xs">{selectedDetailMeal.calories} kcal</span>
                      </div>
                      <div>
                        <span className="block text-neutral-500 text-[8px] uppercase font-bold tracking-wider mb-1">Protéines</span>
                        <span className="text-white font-extrabold text-xs">{selectedDetailMeal.proteins}g</span>
                      </div>
                      <div>
                        <span className="block text-neutral-500 text-[8px] uppercase font-bold tracking-wider mb-1">Glucides</span>
                        <span className="text-blue-400 font-extrabold text-xs">{selectedDetailMeal.carbs}g</span>
                      </div>
                      <div>
                        <span className="block text-neutral-500 text-[8px] uppercase font-bold tracking-wider mb-1">Lipides</span>
                        <span className="text-orange-400 font-extrabold text-xs">{selectedDetailMeal.lipids}g</span>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients Checklist and Allergens warning */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-neutral-900">
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                        <Apple className="h-3.5 w-3.5 text-brand-green" />
                        Ingrédients sains
                      </h4>
                      <ul className="text-xs text-neutral-400 space-y-1.5 font-light">
                        {selectedDetailMeal.ingredients.map(ing => (
                          <li key={ing} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-brand-green"></span>
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">Allergènes</h4>
                      {selectedDetailMeal.allergens && selectedDetailMeal.allergens.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedDetailMeal.allergens.map(all => (
                            <span key={all} className="rounded-lg bg-red-950/20 text-red-400 border border-red-900/40 text-[9px] font-mono px-2 py-1 flex items-center gap-1">
                              ⚠️ {all}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-brand-green font-medium flex items-center gap-1">
                          ✓ Sans allergènes majeurs détectés
                        </span>
                      )}

                      {/* Dietary Badges */}
                      <div className="pt-2">
                        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-2">Labels de confiance</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedDetailMeal.tags.map(tag => (
                            <span key={tag} className="text-[8px] font-mono tracking-widest uppercase bg-neutral-900 text-neutral-400 border border-neutral-800 rounded px-1.5 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Action footer in Modal */}
                  <div className="pt-5 border-t border-neutral-900 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-neutral-500 font-mono uppercase tracking-widest">Valeur nutritionnelle</span>
                      <span className="text-lg font-extrabold text-white font-mono">{selectedDetailMeal.calories} KCAL</span>
                    </div>
                    
                    <button
                      id={`popup-add-to-cart-btn-${selectedDetailMeal.id}`}
                      onClick={() => {
                        onAddToCart(selectedDetailMeal);
                        setSelectedDetailMeal(null);
                      }}
                      className="rounded-full bg-white text-black px-6 py-3 text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-brand-green transition"
                    >
                      Ajouter au panier • {selectedDetailMeal.price.toFixed(2)} €
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
