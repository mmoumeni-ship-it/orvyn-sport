import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Info, Flame, Search, X, ShieldAlert, ChevronRight, Droplet, Apple, HelpCircle, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
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
    <section id="menu-section" className="bg-orvyn-carbon py-24 lg:py-32 border-b border-olive/20 relative">
      {/* Soft color glow map */}
      <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-clay/5 blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="font-display text-xs font-semibold tracking-[0.25em] text-clay uppercase">La carte ORVYN</span>
          </div>
          <h2 className="font-display h-editorial text-orvyn-bone tracking-tight">
            La gastronomie sportive d'élite
          </h2>
          <p className="text-sm text-orvyn-bone/60 font-sans max-w-xl mx-auto leading-relaxed">
            Sélectionnez vos repas de précision, shakers protéinés d'élite ou en-cas d'athlète. Tous nos prix sont affichés de manière 100% transparente.
          </p>
        </div>

        {/* Sophisticated Controls Panel (Search & Categories) */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-carbon-raised border border-olive/20 p-4 rounded-sm">
            {/* Instant Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orvyn-bone/35" />
              <input
                type="text"
                placeholder="Rechercher un ingrédient, un plat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm bg-carbon border border-olive/30 py-2.5 pl-10 pr-10 text-xs text-orvyn-bone placeholder-orvyn-bone/25 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orvyn-bone/40 hover:text-orvyn-bone"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category selection Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => handleSetCategory('')}
                className={`orvyn-clip-sm px-4 py-2 text-[10px] tracking-wider uppercase font-semibold transition ${
                  activeCategory === ''
                    ? 'bg-sauge text-bone'
                    : 'border border-olive/40 text-orvyn-bone/60 hover:text-orvyn-bone'
                }`}
              >
                Tous ({MEALS_DATABASE.length})
              </button>
              <button
                onClick={() => handleSetCategory('Bowls')}
                className={`orvyn-clip-sm px-4 py-2 text-[10px] tracking-wider uppercase font-semibold transition ${
                  activeCategory === 'Bowls'
                    ? 'bg-sauge text-bone'
                    : 'border border-olive/40 text-orvyn-bone/60 hover:text-orvyn-bone'
                }`}
              >
                Signature Bowls
              </button>
              <button
                onClick={() => handleSetCategory('Shakers')}
                className={`orvyn-clip-sm px-4 py-2 text-[10px] tracking-wider uppercase font-semibold transition ${
                  activeCategory === 'Shakers'
                    ? 'bg-sauge text-bone'
                    : 'border border-olive/40 text-orvyn-bone/60 hover:text-orvyn-bone'
                }`}
              >
                Signature Protein Shakers
              </button>
              <button
                onClick={() => handleSetCategory('Snacks')}
                className={`orvyn-clip-sm px-4 py-2 text-[10px] tracking-wider uppercase font-semibold transition ${
                  activeCategory === 'Snacks'
                    ? 'bg-sauge text-bone'
                    : 'border border-olive/40 text-orvyn-bone/60 hover:text-orvyn-bone'
                }`}
              >
                Signature Healthy Snacks
              </button>
            </div>
          </div>

          {/* Active Sub-Filters feedback bar */}
          {(activeGoal || activeTag || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 bg-carbon-raised border border-olive/20 px-4 py-2.5 rounded-sm text-xs">
              <span className="text-orvyn-bone/40 text-[10px] uppercase tracking-wider">Filtres appliqués :</span>
              {activeGoal && (
                <span className="inline-flex items-center gap-1 bg-carbon border border-lime/30 px-2 py-0.5 text-[10px] text-lime uppercase">
                  Objectif: {activeGoal}
                  <button onClick={() => setActiveGoal('')} className="hover:text-orvyn-bone ml-1.5 text-orvyn-bone/50">×</button>
                </span>
              )}
              {activeTag && (
                <span className="inline-flex items-center gap-1 bg-carbon border border-olive/30 px-2 py-0.5 text-[10px] text-clay uppercase">
                  Régime: {activeTag}
                  <button onClick={() => setActiveTag('')} className="hover:text-orvyn-bone ml-1.5 text-orvyn-bone/50">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-carbon border border-olive/30 px-2 py-0.5 text-[10px] text-orvyn-bone/70">
                  Recherche: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-orvyn-bone ml-1.5 text-orvyn-bone/50">×</button>
                </span>
              )}
              <button
                onClick={handleClearAllFilters}
                className="text-orvyn-bone/50 hover:text-orvyn-bone transition text-[10px] underline ml-auto uppercase tracking-wider"
              >
                Tout effacer
              </button>
            </div>
          )}
        </div>

        {/* Meals Grid display */}
        {filteredMeals.length === 0 ? (
          <div className="text-center py-20 bg-carbon-raised orvyn-clip-sm depth p-8 max-w-md mx-auto space-y-5 animate-fade-in">
            <ShieldAlert className="h-10 w-10 text-clay mx-auto" />
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-orvyn-bone text-lg">Aucune formule trouvée</h3>
              <p className="text-xs text-orvyn-bone/50 font-sans leading-relaxed">
                Nous n'avons pas d'ingrédients ou de plats correspondant exactement à ces critères. Ajustez votre recherche ou réinitialisez les filtres.
              </p>
            </div>
            <button
              onClick={handleClearAllFilters}
              className="orvyn-clip-sm bg-sauge text-bone px-5 py-2.5 text-[10px] tracking-widest font-semibold uppercase hover:bg-lime-soft transition cursor-pointer"
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
                    className="group orvyn-clip-sm depth bg-carbon-raised overflow-hidden flex flex-col justify-between hover:bg-[#2b2923] transition-all duration-300 cursor-pointer"
                  >
                    {/* Meal Cover Image Header */}
                    <div className="relative aspect-square w-full overflow-hidden bg-carbon">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-full w-full object-cover photo-orvyn group-hover:grayscale-0 transition duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Floating Info Button on Hover */}
                      <div className="absolute inset-0 bg-carbon/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-bone/95 text-carbon text-[10px] tracking-wider uppercase font-semibold px-4 py-2 flex items-center gap-1">
                          <Info className="h-3.5 w-3.5 stroke-[2.5]" />
                          Fiche nutritionnelle
                        </span>
                      </div>
                    </div>

                    {/* Meal Information Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-display font-semibold text-orvyn-bone tracking-tight group-hover:text-clay transition duration-300">
                          {meal.name}
                        </h3>

                        {/* Simplified Premium Nutrition Badge Grid */}
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="flex items-center gap-1 text-clay font-semibold">
                            <Flame className="h-3.5 w-3.5" />
                            <span>{meal.calories} kcal</span>
                          </span>
                          <span className="text-olive/40">•</span>
                          <span className="text-orvyn-bone/50 font-medium">{meal.proteins}g Protéines</span>
                        </div>
                      </div>

                      {/* Price & CTA Basket button */}
                      <div className="pt-3 border-t border-olive/20 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col">
                          <span className="text-[8px] text-orvyn-bone/40 uppercase tracking-widest">Tarif Unique</span>
                          <span className="text-base font-semibold text-clay">{meal.price.toFixed(2)} €</span>
                        </div>

                        <button
                          id={`add-to-cart-btn-${meal.id}`}
                          onClick={() => onAddToCart(meal)}
                          className={`orvyn-clip-sm px-4 py-2 text-[10px] tracking-widest uppercase font-semibold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                            qty > 0
                              ? 'bg-sauge text-bone hover:bg-sauge-soft'
                              : 'bg-bone text-carbon hover:bg-frais'
                          }`}
                        >
                          {qty > 0 ? (
                            <>
                              <Check className="h-3 w-3 stroke-[3px]" />
                              <span>Enregistré ({qty})</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3 w-3 stroke-[3px]" />
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

        {/* Meal Detail Popup Dialog */}
        <AnimatePresence>
          {selectedDetailMeal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/90 p-4 animate-fade-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="orvyn-clip bg-carbon-raised max-w-lg w-full overflow-hidden depth"
              >

                {/* Visual meal preview */}
                <div className="relative aspect-video w-full">
                  <img
                    src={selectedDetailMeal.image}
                    alt={selectedDetailMeal.name}
                    className="h-full w-full object-cover photo-orvyn"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-raised via-transparent to-transparent z-10"></div>

                  {/* Close button */}
                  <button
                    id="close-meal-detail-btn"
                    onClick={() => setSelectedDetailMeal(null)}
                    className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center bg-carbon/90 text-orvyn-bone/60 hover:text-orvyn-bone hover:bg-carbon-raised border border-olive/30 transition cursor-pointer rounded-sm"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Details list */}
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-[8px] font-bold tracking-widest bg-lime/10 text-lime border border-lime/20 px-2 py-0.5">
                        CATÉGORIE: {selectedDetailMeal.category}
                      </span>
                      {selectedDetailMeal.subCategory && (
                        <span className="text-[8px] font-bold tracking-widest bg-carbon text-orvyn-bone/50 border border-olive/30 px-2 py-0.5">
                          TYPE: {selectedDetailMeal.subCategory}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-orvyn-bone tracking-tight">{selectedDetailMeal.name}</h3>
                    <p className="text-xs text-orvyn-bone/60 leading-relaxed mt-2 mb-4 font-sans">{selectedDetailMeal.description}</p>

                    {/* Detailed Macro-nutrients Grid */}
                    <div className="bg-carbon rounded-sm p-4 border border-olive/20 grid grid-cols-4 gap-2 text-center">
                      <div>
                        <span className="block text-orvyn-bone/40 text-[8px] uppercase font-bold tracking-wider mb-1">Calories</span>
                        <span className="text-clay font-semibold text-xs">{selectedDetailMeal.calories} kcal</span>
                      </div>
                      <div>
                        <span className="block text-orvyn-bone/40 text-[8px] uppercase font-bold tracking-wider mb-1">Protéines</span>
                        <span className="text-orvyn-bone font-semibold text-xs">{selectedDetailMeal.proteins}g</span>
                      </div>
                      <div>
                        <span className="block text-orvyn-bone/40 text-[8px] uppercase font-bold tracking-wider mb-1">Glucides</span>
                        <span className="text-olive font-semibold text-xs">{selectedDetailMeal.carbs}g</span>
                      </div>
                      <div>
                        <span className="block text-orvyn-bone/40 text-[8px] uppercase font-bold tracking-wider mb-1">Lipides</span>
                        <span className="text-clay/80 font-semibold text-xs">{selectedDetailMeal.lipids}g</span>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients Checklist and Allergens warning */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-olive/20">
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-widest flex items-center gap-1.5">
                        <Apple className="h-3.5 w-3.5 text-clay" />
                        Ingrédients sains
                      </h4>
                      <ul className="text-xs text-orvyn-bone/60 space-y-1.5 font-sans">
                        {selectedDetailMeal.ingredients.map(ing => (
                          <li key={ing} className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-clay"></span>
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-widest">Allergènes</h4>
                      {selectedDetailMeal.allergens && selectedDetailMeal.allergens.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedDetailMeal.allergens.map(all => (
                            <span key={all} className="rounded-sm bg-clay/10 text-clay border border-clay/30 text-[9px] px-2 py-1 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {all}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-olive font-medium flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Sans allergènes majeurs détectés
                        </span>
                      )}

                      {/* Dietary Badges */}
                      <div className="pt-2">
                        <h4 className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-widest mb-2">Labels de confiance</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedDetailMeal.tags.map(tag => (
                            <span key={tag} className="text-[8px] tracking-widest uppercase bg-carbon text-orvyn-bone/50 border border-olive/30 px-1.5 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Action footer in Modal */}
                  <div className="pt-5 border-t border-olive/20 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-orvyn-bone/40 uppercase tracking-widest">Valeur nutritionnelle</span>
                      <span className="text-lg font-semibold text-clay">{selectedDetailMeal.calories} KCAL</span>
                    </div>

                    <button
                      id={`popup-add-to-cart-btn-${selectedDetailMeal.id}`}
                      onClick={() => {
                        onAddToCart(selectedDetailMeal);
                        setSelectedDetailMeal(null);
                      }}
                      className="orvyn-clip-sm bg-sauge text-bone px-6 py-3 text-[10px] tracking-widest uppercase font-semibold hover:bg-lime-soft transition cursor-pointer"
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
