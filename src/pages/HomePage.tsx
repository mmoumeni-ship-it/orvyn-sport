import React from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Dumbbell, Flame, Scale, Activity, ArrowRight, ChevronRight,
  Smartphone, CreditCard, SlidersHorizontal, Bell, QrCode, Clock,
  Leaf, HeartPulse, Timer,
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import SubscriptionsSection from '../components/SubscriptionsSection';
import SEO from '../components/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import OrvynButton from '../components/ui/OrvynButton';
import { MEALS_DATABASE } from '../data/meals';
import { findSubscription } from '../data/subscriptions';
import { useCart } from '../context/CartContext';
import { trackAddToCart } from '../lib/analytics';

const goalCards = [
  {
    icon: Dumbbell,
    title: 'Prise de masse',
    desc: 'Des repas caloriques et riches en protéines pour soutenir le développement musculaire, sans surplus anarchique.',
    example: 'Power Chicken Bowl — 574 kcal · 52 g de protéines',
    link: '/repas-prise-de-masse',
  },
  {
    icon: Flame,
    title: 'Sèche',
    desc: 'Une nutrition maîtrisée qui préserve le muscle tout en affinant la silhouette, sans sensation de privation.',
    example: 'Salmon Recovery Bowl — 546 kcal · 45 g de protéines',
    link: '/repas-seche',
  },
  {
    icon: Scale,
    title: 'Perte de poids',
    desc: 'Des repas équilibrés et rassasiants pour accompagner sereinement votre rééquilibrage alimentaire.',
    example: 'Veggie Protein Bowl — 468 kcal · 38 g de protéines',
    link: '/menu',
  },
  {
    icon: Activity,
    title: 'Récupération',
    desc: 'Les bons nutriments après l\'effort pour reconstruire le muscle et recharger vos réserves d\'énergie.',
    example: 'Beef Performance Bowl — 596 kcal · 55 g de protéines',
    link: '/repas-post-entrainement',
  },
];

const appFeatures = [
  { icon: Smartphone, label: 'Commande anticipée', desc: 'Votre repas est réservé avant votre séance.' },
  { icon: CreditCard, label: 'Paiement en ligne', desc: 'Réglez en quelques secondes, sans file d\'attente.' },
  { icon: SlidersHorizontal, label: 'Personnalisation', desc: 'Adaptez protéines et accompagnements à vos besoins.' },
  { icon: Bell, label: 'Suivi de préparation', desc: 'Soyez prévenu dès que votre commande est prête.' },
  { icon: QrCode, label: 'Code de retrait', desc: 'Un code unique à présenter au stand.' },
  { icon: Clock, label: 'Récupération rapide', desc: 'Votre repas vous attend, sans perdre de temps.' },
];

const testimonials = [
  {
    quote: 'Je commande mon bowl avant ma séance, il m\'attend à la sortie. Je n\'ai plus à y penser, c\'est devenu mon rituel.',
    name: 'Claire M.',
    role: 'Course à pied — Paris',
  },
  {
    quote: 'Des recettes bonnes et des macros claires. J\'avance enfin sur mes objectifs sans avoir à tout calculer.',
    name: 'Mehdi B.',
    role: 'Musculation — Lyon',
  },
  {
    quote: 'Simple, rapide et vraiment bon. Exactement ce que je cherchais après une longue journée.',
    name: 'Sarah L.',
    role: 'CrossFit — Bordeaux',
  },
];

const featuredBowls = MEALS_DATABASE.filter((m) => m.category === 'Bowls').slice(0, 3);
const featuredShakes = MEALS_DATABASE.filter((m) => m.category === 'Shakers').slice(0, 1);
const featuredSnacks = MEALS_DATABASE.filter((m) => m.category === 'Snacks').slice(0, 1);
const platDuJour = MEALS_DATABASE[0];

const experienceBenefits = [
  { icon: Clock, title: 'Gain de temps', desc: 'Plus de préparation, plus de courses : votre repas est prêt quand vous l\'êtes.' },
  { icon: Dumbbell, title: 'Repas selon votre objectif', desc: 'Chaque recette est associée à un objectif sportif pour vous guider.' },
  { icon: Leaf, title: 'Ingrédients adaptés aux sportifs', desc: 'Des produits frais, choisis pour la qualité et la richesse nutritionnelle.' },
  { icon: HeartPulse, title: 'Récupération facilitée', desc: 'Les bons nutriments au bon moment, pour mieux récupérer après l\'effort.' },
  { icon: Timer, title: 'Simple après la salle', desc: 'Une expérience fluide, du téléphone au stand ORVYN.' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleSelectPlan = (planName: string) => {
    const sub = findSubscription(planName);
    if (!sub) return;
    addItem({
      id: `subscription-${sub.slug}`,
      type: 'subscription',
      name: sub.name,
      price: Number(sub.price),
      quantity: 1,
      plan: sub.slug,
      billingPeriod: 'monthly',
    });
    trackAddToCart({
      item_id: sub.slug,
      item_name: sub.name,
      price: Number(sub.price),
      quantity: 1,
      item_category: 'Abonnements',
    });
  };

  const handleNavigate = (tab: string) => {
    switch (tab) {
      case 'how-it-works':
        navigate('/menu');
        break;
      case 'menu':
        navigate('/menu');
        break;
      case 'goals':
        navigate('/menu');
        break;
      case 'subscriptions':
        navigate('/abonnements');
        break;
      default:
        navigate('/a-propos');
    }
  };

  return (
    <div className="bg-bone min-h-screen text-charbon">
      <SEO
        title="Repas sportifs et bowls protéinés"
        description="Découvrez ORVYN : bowls protéinés, repas post-entraînement, shakes et snacks adaptés à vos objectifs sportifs."
        canonical="/"
      />

      {/* 1. Hero */}
      <HeroSection setCurrentTab={handleNavigate} onOpenAuth={() => {}} />

      {/* 2. Comment ça marche */}
      <HowItWorks setCurrentTab={handleNavigate} />

      {/* 3. Une nutrition adaptée à chaque objectif */}
      <section className="relative bg-bone py-24 lg:py-32 border-t border-charbon/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            light
            eyebrow="Votre objectif, votre repas"
            title="Une nutrition adaptée à chaque objectif"
            description="Chaque recette est pensée pour accompagner votre pratique, à votre rythme et sans contrainte."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {goalCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <button
                  key={i}
                  onClick={() => navigate(card.link)}
                  className="group orvyn-clip-sm depth-light relative bg-sand p-8 text-left cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sauge text-bone">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold text-charbon tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charbon/65">
                    {card.desc}
                  </p>
                  <p className="mt-5 border-t border-charbon/10 pt-4 text-[11px] text-sauge font-medium">
                    {card.example}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-charbon/60 group-hover:text-sauge group-hover:gap-2.5 transition-all">
                    Découvrir <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Les produits ORVYN */}
      <section className="relative bg-bone py-24 lg:py-32 border-t border-charbon/8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <SectionHeader
              light
              eyebrow="La carte ORVYN"
              title="Des produits préparés pour la performance"
              description="Bowls, shakes et snacks : de grandes photos de nourriture, des informations utiles, zéro tableau complexe."
            />
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 rounded-full border border-charbon/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-charbon transition hover:border-sauge hover:text-sauge shrink-0"
            >
              Voir le menu <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Plat du jour — grand visuel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16"
          >
            <div className="relative">
              <div
                className="absolute -bottom-5 -right-5 h-full w-full rounded-[24px] border border-sauge/25"
                aria-hidden="true"
              />
              <Link to="/menu" className="relative block overflow-hidden rounded-[24px] bg-sand group">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={platDuJour.image}
                    alt={platDuJour.name}
                    loading="lazy"
                    className="h-full w-full object-cover photo-orvyn group-hover:scale-[1.03] transition duration-700"
                  />
                </div>
                <div className="photo-grain" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-citron px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-charbon">
                  Plat signature
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-charbon/50">Recommandé après la séance</span>
              </div>
              <h3 className="font-display text-3xl font-bold tracking-tight text-charbon sm:text-4xl">
                {platDuJour.name}
              </h3>
              <p className="text-sm leading-relaxed text-charbon/65 max-w-xl">
                {platDuJour.description}
              </p>

              <div className="flex flex-wrap gap-3 text-xs">
                <span className="rounded-full bg-sauge text-bone px-4 py-1.5 font-semibold">{platDuJour.proteins} g de protéines</span>
                <span className="rounded-full bg-sand text-charbon px-4 py-1.5 font-semibold border border-charbon/10">{platDuJour.calories} kcal</span>
                <span className="rounded-full bg-sand text-charbon px-4 py-1.5 font-semibold border border-charbon/10">{platDuJour.carbs} g de glucides</span>
                <span className="rounded-full bg-sand text-charbon px-4 py-1.5 font-semibold border border-charbon/10">{platDuJour.lipids} g de lipides</span>
              </div>

              <div className="space-y-2 border-t border-charbon/10 pt-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-charbon/50 font-semibold">Ingrédients principaux</p>
                <p className="text-xs leading-relaxed text-charbon/70">
                  {platDuJour.ingredients.slice(0, 4).join(' · ')}
                </p>
              </div>

              <div className="pt-2">
                <OrvynButton to="/menu" variant="primary">
                  Commander ce repas
                </OrvynButton>
              </div>
            </div>
          </motion.div>

          {/* Bowls, shakes, snacks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {featuredBowls.map((meal) => (
              <Link
                key={meal.id}
                to="/bowls-proteines"
                className="group text-left orvyn-clip-sm overflow-hidden bg-sand transition-all duration-300 block hover:-translate-y-1 lg:col-span-1"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    loading="lazy"
                    className="h-full w-full object-cover photo-orvyn group-hover:scale-[1.04] transition duration-700"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-display text-sm font-bold text-charbon tracking-tight">{meal.name}</h4>
                  <p className="mt-1 text-[11px] text-charbon/55">{meal.calories} kcal · {meal.proteins} g de protéines</p>
                </div>
              </Link>
            ))}

            {featuredShakes.map((meal) => (
              <Link
                key={meal.id}
                to="/shakes-proteines"
                className="group text-left orvyn-clip-sm overflow-hidden bg-sand transition-all duration-300 block hover:-translate-y-1 lg:col-span-1"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    loading="lazy"
                    className="h-full w-full object-cover photo-orvyn group-hover:scale-[1.04] transition duration-700"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-display text-sm font-bold text-charbon tracking-tight">{meal.name}</h4>
                  <p className="mt-1 text-[11px] text-charbon/55">{meal.calories} kcal · {meal.proteins} g de protéines</p>
                </div>
              </Link>
            ))}

            {featuredSnacks.map((meal) => (
              <Link
                key={meal.id}
                to="/snacks-healthy"
                className="group text-left orvyn-clip-sm overflow-hidden bg-sand transition-all duration-300 block hover:-translate-y-1 lg:col-span-1"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    loading="lazy"
                    className="h-full w-full object-cover photo-orvyn group-hover:scale-[1.04] transition duration-700"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-display text-sm font-bold text-charbon tracking-tight">{meal.name}</h4>
                  <p className="mt-1 text-[11px] text-charbon/55">{meal.calories} kcal · {meal.proteins} g de protéines</p>
                </div>
              </Link>
            ))}

            {/* Personnalisation */}
            <div className="orvyn-clip-sm depth-light bg-sauge p-6 flex flex-col justify-between lg:col-span-2">
              <div>
                <span className="rounded-full bg-bone/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-bone">
                  Personnalisation
                </span>
                <h4 className="mt-5 font-display text-xl font-bold text-bone tracking-tight">
                  Votre repas, à votre façon
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-bone/80">
                  Choisissez votre source de protéines et vos accompagnements pour un repas vraiment adapté à vos besoins.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Poulet', 'Bœuf', 'Saumon', 'Tempeh'].map((p) => (
                    <span key={p} className="rounded-full border border-bone/30 px-3 py-1 text-[10px] text-bone">{p}</span>
                  ))}
                </div>
              </div>
              <Link
                to="/menu"
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-bone transition hover:gap-3"
              >
                Personnaliser mon repas <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Application et retrait rapide */}
      <section className="relative bg-bone py-24 lg:py-32 border-t border-charbon/8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mockup téléphone */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1 flex justify-center"
            >
              <div className="relative">
                <div
                  className="orvyn-o pointer-events-none absolute -top-8 -left-10 h-32 w-32 text-sauge/15"
                  aria-hidden="true"
                />
                <div className="w-[300px] sm:w-[320px] rounded-[40px] bg-charbon p-3 shadow-[0_40px_80px_-40px_rgba(23,26,24,0.5)]">
                  <div className="rounded-[32px] bg-bone overflow-hidden">
                    {/* Barre de statut */}
                    <div className="flex items-center justify-between px-6 pt-5 text-[9px] text-charbon/60">
                      <span>9:41</span>
                      <span className="h-4 w-16 rounded-full bg-charbon/10" />
                    </div>
                    {/* Header app */}
                    <div className="px-6 pt-4 pb-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="orvyn-o h-4 w-4 border-sauge">
                          <span className="h-1 w-1 rounded-full bg-sauge" />
                        </span>
                        <span className="font-display text-sm font-bold tracking-widest text-charbon">ORVYN</span>
                      </div>
                      <Bell className="h-4 w-4 text-charbon/60" />
                    </div>
                    <div className="px-6">
                      <h5 className="font-display text-xl font-bold text-charbon tracking-tight">Bonjour, Alex</h5>
                      <p className="text-[11px] text-charbon/50">Votre bowl se prépare au stand Courcelles.</p>
                    </div>
                    {/* Carte repas */}
                    <div className="mx-6 mt-5 rounded-2xl bg-sand p-4 flex gap-3">
                      <img
                        src={platDuJour.image}
                        alt={platDuJour.name}
                        loading="lazy"
                        className="h-16 w-16 rounded-xl object-cover photo-orvyn"
                      />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-charbon">{platDuJour.name}</p>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-charbon/10 overflow-hidden">
                          <div className="h-full w-2/3 rounded-full bg-sauge" />
                        </div>
                        <p className="mt-1 text-[9px] text-charbon/50">Prêt dans 4 min</p>
                      </div>
                    </div>
                    {/* Code retrait */}
                    <div className="mx-6 mt-4 rounded-2xl border border-charbon/10 px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-charbon/50">Code de retrait</p>
                        <p className="font-display text-lg font-bold text-charbon tracking-[0.2em]">ORVYN-27</p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sauge text-bone">
                        <QrCode className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="px-6 py-5">
                      <div className="w-full rounded-full bg-sauge py-3 text-center text-[10px] font-bold uppercase tracking-widest text-bone">
                        Voir ma commande
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Texte + features */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 lg:order-2"
            >
              <SectionHeader
                light
                eyebrow="L'application ORVYN"
                title="Commander, suivre, récupérer"
                description="Toute la simplicité du concept ORVYN dans votre poche, de la commande anticipée au retrait au stand."
              />
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {appFeatures.map((f) => {
                  const Icon = f.icon;
                  return (
                    <li key={f.label} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sauge/10 text-sauge">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charbon">{f.label}</p>
                        <p className="text-xs text-charbon/60 leading-relaxed">{f.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Expérience ORVYN — sombre premium */}
      <section className="relative bg-charbon py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-matiere pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 performance-line" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <SectionHeader
                eyebrow="L'expérience ORVYN"
                title="Une nutrition pensée autour de votre journée"
                description="Repas adaptés, ingrédients de qualité, retrait express : tout est fait pour simplifier votre alimentation sportive."
              />
              <div className="orvyn-clip-sm depth bg-carbon-raised p-8">
                <p className="pull-quote text-bone">
                  Le bon repas,{' '}
                  <span className="text-sauge-soft">au bon moment.</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {experienceBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="orvyn-clip-sm depth flex items-start gap-6 bg-carbon-raised p-7"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sauge text-bone">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="pt-1">
                      <h3 className="font-display text-lg font-bold text-bone tracking-tight">{b.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-bone/60">{b.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Abonnements */}
      <SubscriptionsSection onSelectPlan={handleSelectPlan} onOpenAuth={() => {}} />

      {/* 8. Témoignages */}
      <section className="relative bg-bone py-24 lg:py-32 border-t border-charbon/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            light
            eyebrow="Ils en parlent mieux que nous"
            title="Vos habitudes changent, votre rythme reste"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <figure key={i} className="orvyn-clip-sm depth-light bg-sand p-8 flex flex-col justify-between">
                <div>
                  <span className="numero text-4xl text-sauge/30">“</span>
                  <blockquote className="mt-2 text-sm leading-relaxed text-charbon/75">
                    {t.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-6 border-t border-charbon/10 pt-4">
                  <p className="text-sm font-bold text-charbon">{t.name}</p>
                  <p className="text-[11px] text-charbon/50">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. CTA final */}
      <section className="relative bg-charbon py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-matiere pointer-events-none" />
        <div className="orvyn-o pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-sauge/10" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 performance-line" aria-hidden="true" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-[-0.02em] text-bone sm:text-5xl lg:text-[3.5rem]">
                Votre prochain repas peut déjà <br />
                <span className="text-sauge-soft">vous attendre.</span>
              </h2>
              <p className="text-sm text-bone/65 max-w-2xl mx-auto">
                Commandez avant votre séance, récupérez après. Simple, bon, adapté à votre objectif.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <OrvynButton to="/menu" variant="primary">
                Commander avec ORVYN
              </OrvynButton>
              <OrvynButton to="/abonnements" variant="secondary">
                Voir les abonnements
              </OrvynButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
