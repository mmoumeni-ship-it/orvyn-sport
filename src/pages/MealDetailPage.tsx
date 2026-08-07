import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Flame, ArrowLeft, ArrowRight, Plus, Minus, ShoppingBag, Check, Leaf, UtensilsCrossed } from 'lucide-react';
import SEO from '../components/SEO';
import { MEALS_DATABASE } from '../data/meals';
import { useCart } from '../context/CartContext';
import { trackViewItem, trackAddToCart } from '../lib/analytics';

export default function MealDetailPage() {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const lookupKey = slug || id;
  const meal = MEALS_DATABASE.find((m) => m.slug === lookupKey || m.id === lookupKey);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (meal) {
      trackViewItem({
        item_id: meal.slug,
        item_name: meal.name,
        price: meal.price,
        item_category: meal.category,
      });
    }
  }, [meal?.slug]);

  if (!meal) {
    return (
      <>
        <SEO title="Plat introuvable" description="Ce repas n'existe pas ou n'est plus disponible." canonical="/menu" />
        <section className="relative bg-bone pt-36 pb-24 lg:pt-44 lg:pb-32">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sauge/10 text-sauge">
              <UtensilsCrossed className="h-7 w-7" />
            </div>
            <span className="eyebrow text-sauge justify-center mt-8 mb-4">ORVYN</span>
            <h1 className="font-display h-editorial text-charbon tracking-tight mb-4">Plat introuvable</h1>
            <p className="text-base text-olive font-sans leading-relaxed mb-10">
              Ce repas n'existe pas ou n'est plus disponible. Découvrez le reste de la carte ORVYN.
            </p>
            <Link
              to="/menu"
              className="orvyn-clip-sm inline-flex items-center gap-2 bg-sauge px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-bone transition hover:bg-sauge-soft"
            >
              <ArrowLeft className="h-4 w-4" /> Retour au menu
            </Link>
          </div>
        </section>
      </>
    );
  }

  const isSubscription = meal.category === 'Abonnements';

  const handleAdd = () => {
    addItem({
      id: meal.slug,
      type: 'dish',
      name: meal.name,
      price: Number(meal.price),
      quantity,
      slug: meal.slug,
    });
    trackAddToCart({
      item_id: meal.slug,
      item_name: meal.name,
      price: meal.price,
      quantity,
      item_category: meal.category,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const macros = [
    { label: 'Calories', value: meal.calories, unit: 'kcal', highlight: true },
    { label: 'Protéines', value: meal.proteins, unit: 'g' },
    { label: 'Glucides', value: meal.carbs, unit: 'g' },
    { label: 'Lipides', value: meal.lipids, unit: 'g' },
  ];

  const related = MEALS_DATABASE.filter(
    (m) => m.category === meal.category && m.id !== meal.id
  ).slice(0, 3);

  return (
    <>
      <SEO
        title={meal.name}
        description={meal.description}
        canonical={`/menu/${meal.slug}`}
        ogType="product"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: meal.name,
          description: meal.description,
          image: meal.image,
          brand: { '@type': 'Brand', name: 'ORVYN' },
          offers: {
            '@type': 'Offer',
            price: meal.price,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: `https://orvyn-sport.vercel.app/menu/${meal.slug}`
          },
          nutrition: {
            '@type': 'NutritionInformation',
            calories: `${meal.calories} kcal`,
            proteinContent: `${meal.proteins} g`,
            carbohydrateContent: `${meal.carbs} g`,
            fatContent: `${meal.lipids} g`
          }
        }}
      />

      {/* Hero */}
      <section className="relative bg-beige pt-28 pb-14 lg:pt-36 lg:pb-16 overflow-hidden border-b border-line/70">
        <div className="absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-frais/20 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-olive hover:text-sauge transition mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Retour au menu
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Visuel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[24px] border border-sauge/25 pointer-events-none" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[24px] bg-sand shadow-[0_24px_60px_-30px_rgba(23,26,24,0.35)]">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="h-full w-full object-cover photo-lumineuse"
                  />
                </div>
                <div className="photo-grain" aria-hidden="true" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {meal.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] tracking-widest uppercase bg-white/90 text-sauge border border-line/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Détails */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-7"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow text-sauge">{isSubscription ? 'Formule membre' : meal.category}</span>
                  <span className="text-lg font-semibold text-charbon">{meal.price.toFixed(2)} €</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-charbon">
                  {meal.name}
                </h1>
                <p className="text-sm leading-relaxed text-olive font-sans">
                  {meal.description}
                </p>
              </div>

              {/* Macros */}
              {!isSubscription && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {macros.map((m) => (
                    <div key={m.label} className={`rounded-2xl border p-4 text-center ${m.highlight ? 'bg-sauge text-bone border-sauge' : 'bg-white border-line/70'}`}>
                      <div className="flex items-center justify-center gap-1">
                        {m.highlight && <Flame className="h-3.5 w-3.5" />}
                        <span className={`text-lg font-bold ${m.highlight ? 'text-bone' : 'text-charbon'}`}>{m.value}</span>
                        <span className={`text-[10px] ${m.highlight ? 'text-bone/70' : 'text-olive'}`}>{m.unit}</span>
                      </div>
                      <span className={`mt-0.5 block text-[10px] uppercase tracking-widest ${m.highlight ? 'text-bone/70' : 'text-olive'}`}>{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Objectifs */}
              <div className="flex flex-wrap gap-1.5">
                {meal.goals.map((goal) => (
                  <span key={goal} className="text-[10px] uppercase tracking-widest bg-sauge/10 text-sauge border border-sauge/20 px-2.5 py-1 rounded-lg">
                    {goal}
                  </span>
                ))}
              </div>

              {/* Ingrédients */}
              {meal.ingredients.length > 0 && (
                <div className="border-t border-line/60 pt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-olive mb-3">
                    {isSubscription ? 'Inclus dans la formule' : 'Ingrédients principaux'}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {meal.ingredients.map((ing) => (
                      <li key={ing} className="flex items-start gap-2 text-sm text-charbon/80 font-sans">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-sauge" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Allergènes */}
              {meal.allergens.length > 0 && (
                <p className="text-xs text-olive font-sans">
                  <span className="font-semibold text-charbon/70">Allergènes : </span>
                  {meal.allergens.join(' · ')}
                </p>
              )}

              {/* Panier */}
              <div className="border-t border-line/60 pt-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="flex items-center justify-between gap-3 border border-line/70 bg-white rounded-xl px-2 py-1.5 sm:w-auto">
                    <button
                      id="detail-qty-minus"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Diminuer la quantité"
                      className="p-2 text-olive hover:text-sauge transition cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span id="detail-qty-value" className="w-8 text-center text-sm font-semibold text-charbon">
                      {quantity}
                    </span>
                    <button
                      id="detail-qty-plus"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Augmenter la quantité"
                      className="p-2 text-olive hover:text-sauge transition cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    id="detail-add-to-cart"
                    onClick={handleAdd}
                    className={`orvyn-clip-sm flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      added ? 'bg-frais text-charbon' : 'bg-sauge text-bone hover:bg-sauge-soft'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="h-4 w-4" /> Ajouté au panier
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" /> Ajouter au panier
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-olive font-sans">
                  <Leaf className="h-3.5 w-3.5 text-sauge" />
                  {isSubscription
                    ? 'Abonnement mensuel sans engagement — ajouté à votre panier, quantité modifiable.'
                    : 'Préparé chaque matin par nos chefs, récupération au stand ORVYN en 30 secondes.'}
                </p>
                <Link to="/panier" className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-sauge hover:text-charbon transition">
                  Voir mon panier <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Repas associés */}
      {related.length > 0 && (
        <section className="bg-bone py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="eyebrow text-sauge mb-3">La carte ORVYN</span>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charbon tracking-tight">
                  Dans la même catégorie
                </h2>
              </div>
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sauge transition hover:text-charbon"
              >
                Voir tout le menu <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/menu/${r.slug}`}
                  className="group orvyn-clip-sm bg-white border border-line/70 overflow-hidden hover:border-sauge/30 hover:shadow-[0_10px_30px_rgba(23,26,24,0.08)] transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
                    <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover photo-lumineuse group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="p-5 flex items-center justify-between gap-3">
                    <h3 className="font-display text-sm font-semibold text-charbon group-hover:text-sauge transition">{r.name}</h3>
                    <span className="text-sm font-semibold text-charbon shrink-0">{r.price.toFixed(2)} €</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
