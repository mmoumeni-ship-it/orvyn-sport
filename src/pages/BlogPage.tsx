import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import SEO from '../components/SEO';

interface BlogArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const articles: BlogArticleMeta[] = [
  {
    slug: 'que-manger-apres-seance-musculation',
    title: 'Que manger après une séance de musculation ?',
    excerpt: 'Découvrez quels aliments privilégier après votre entraînement pour optimiser la récupération musculaire et la synthèse des protéines.',
    date: '2026-07-15',
    category: 'Récupération',
    readTime: '5 min'
  },
  {
    slug: 'comment-composer-repas-post-entrainement-equilibre',
    title: 'Comment composer un repas post-entraînement équilibré ?',
    excerpt: 'Apprenez à composer le repas idéal après le sport : protéines, glucides, lipides. Les clés d\'une alimentation de récupération efficace.',
    date: '2026-07-10',
    category: 'Nutrition',
    readTime: '6 min'
  },
  {
    slug: 'quel-repas-choisir-prise-de-masse',
    title: 'Quels repas choisir pour une prise de masse ?',
    excerpt: 'Guide complet des repas pour la prise de masse musculaire. Calories, macros et aliments à privilégier pour développer votre muscle.',
    date: '2026-07-05',
    category: 'Prise de masse',
    readTime: '7 min'
  },
  {
    slug: 'que-manger-pendant-seche',
    title: 'Que manger pendant une sèche ?',
    excerpt: 'Comment structurer son alimentation en période de sèche : protéines, gestion des calories, repas adaptés pour une définition optimale.',
    date: '2026-06-28',
    category: 'Sèche',
    readTime: '6 min'
  },
  {
    slug: 'combien-proteines-apres-sport',
    title: 'Combien de protéines consommer après le sport ?',
    excerpt: 'Quel est le bon dosage de protéines après l\'entraînement ? Besoins selon votre poids, votre objectif et l\'intensité de votre séance.',
    date: '2026-06-20',
    category: 'Nutrition',
    readTime: '5 min'
  },
  {
    slug: 'bowl-proteine-comment-composer',
    title: 'Bowl protéiné : comment bien le composer ?',
    excerpt: 'Tout savoir sur le bowl protéiné : son origine, ses avantages, comment le composer pour atteindre vos objectifs sportifs.',
    date: '2026-06-15',
    category: 'Bowls',
    readTime: '4 min'
  },
  {
    slug: 'erreurs-alimentaires-apres-entrainement',
    title: 'Les erreurs alimentaires fréquentes après l\'entraînement',
    excerpt: 'Évitez ces 7 erreurs nutritionnelles courantes qui limitent votre récupération et freinent vos progrès sportifs.',
    date: '2026-06-10',
    category: 'Conseils',
    readTime: '5 min'
  }
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Blog Nutrition Sportive"
        description="Conseils nutrition pour sportifs : repas post-entraînement, prise de masse, sèche, bowls protéinés. Guides et astuces ORVYN pour optimiser votre alimentation."
        canonical="/blog"
      />

      <section className="relative bg-orvyn-carbon pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-clay/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">
            BLOG
          </span>
          <h1 className="font-display h-editorial text-orvyn-bone tracking-tight mb-6">
            Blog Nutrition Sportive
          </h1>
          <p className="text-sm text-orvyn-bone/60 max-w-2xl mx-auto font-sans leading-relaxed">
            Conseils, guides et astuces pour optimiser votre alimentation sportive. Récupération, prise de masse, sèche et bien plus.
          </p>
        </div>
      </section>

      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/blog/${article.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-carbon-raised orvyn-clip-sm depth overflow-hidden hover:bg-[#2b2923] transition-all duration-300">
                    <div className="aspect-[16/9] bg-carbon relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="orvyn-o text-6xl font-semibold text-clay/30"></span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon-raised via-transparent to-transparent" />
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 border bg-clay/10 text-clay border-clay/20">
                          {article.category}
                        </span>
                      </div>

                      <h2 className="font-display text-base font-semibold text-orvyn-bone leading-snug group-hover:text-clay transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      <p className="text-xs text-orvyn-bone/50 leading-relaxed font-sans line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-[10px] text-orvyn-bone/40 uppercase tracking-wider pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/repas')}
              className="inline-flex items-center gap-2 orvyn-clip-sm border border-olive/40 bg-carbon-raised px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-orvyn-bone hover:border-bone/50 transition cursor-pointer"
            >
              Découvrir nos repas <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
