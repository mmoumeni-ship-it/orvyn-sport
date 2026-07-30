import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

interface ArticleContent {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  sections: { heading: string; content: string }[];
  faq: { q: string; a: string }[];
  cta: { text: string; link: string };
}

const BLOG_ARTICLES: Record<string, ArticleContent> = {
  'que-manger-apres-seance-musculation': {
    slug: 'que-manger-apres-seance-musculation',
    title: 'Que manger après une séance de musculation ?',
    description: 'Découvrez quels aliments privilégier après votre entraînement pour optimiser la récupération musculaire et la synthèse des protéines.',
    date: '2026-07-15',
    category: 'Récupération',
    readTime: '5 min',
    sections: [
      {
        heading: 'Pourquoi la nutrition post-entraînement est cruciale',
        content: 'Après une séance de musculation, votre corps a puisé dans ses réserves de glycogène et vos fibres musculaires ont subi des micro-lésions. C\'est dans les minutes et les heures qui suivent que votre organisme enclenche les processus de réparation et de reconstruction. Une alimentation adaptée accélère cette phase et maximise les bénéfices de votre entraînement.'
      },
      {
        heading: 'Les protéines : la priorité absolue',
        content: 'La synthèse protéique musculaire est stimulée par l\'apport en acides aminés. Consommer 20 à 40 g de protéines de haute qualité après l\'effort permet d\'optimiser la réparation des fibres. Les sources animales comme le poulet, le bœuf ou le poisson sont particulièrement efficaces grâce à leur profil complet en acides aminés essentiels. Les protéines végétales (tempeh, quinoa) sont également une excellente option.'
      },
      {
        heading: 'Les glucides pour reconstituer vos réserves',
        content: 'Pendant l\'effort, vos muscles ont épuisé leur glycogène. Les glucides post-workout permettent de reconstituer ces stocks et de favoriser un environnement anabolique. Privilégiez des glucides à index glycémique modéré : riz basmati, patate douce, quinoa ou lentilles. L\'association protéines-glucides est la combinaison gagnante pour une récupération complète.'
      },
      {
        heading: 'Les lipides : à ne pas négliger',
        content: 'Contrairement à certaines idées reçues, les lipides ont leur place dans le repas post-entraînement. Les acides gras insaturés (avocat, huile d\'olive, graines) participent à la réduction de l\'inflammation musculaire et soutiennent la santé hormonale. Intégrez-les avec modération pour ne pas ralentir la digestion.'
      },
      {
        heading: 'L\'hydratation, le pilier trop souvent oublié',
        content: 'La déshydratation après l\'effort peut compromettre la récupération. Pensez à boire suffisamment d\'eau et à rééquilibrer vos électrolytes. Les shakes protéinés ORVYN, comme la Whey Vanille ou le Café Protein Boost, sont une solution pratique puisqu\'ils allient hydratation, protéines et glucides en une seule prise.'
      },
      {
        heading: 'Quand manger après la séance ?',
        content: 'La fameuse « fenêtre anabolique » d\'une heure est moins stricte qu\'on ne le pense. L\'essentiel est de consommer un repas équilibré dans les deux heures suivant l\'entraînement. Un repas complet comme le Power Chicken Bowl ou le Beef Performance Bowl d\'ORVYN couvre l\'ensemble de vos besoins post-workout : protéines de qualité, glucides complexes et lipides sains.'
      }
    ],
    faq: [
      { q: 'Faut-il manger immédiatement après la musculation ?', a: 'Idéalement dans les 2 heures suivant l\'entraînement. Pas besoin de se précipiter pour une collation dans les 30 minutes si vous prévoyez un repas complet dans l\'heure qui suit.' },
      { q: 'Peut-on se contenter d\'un shaker de protéines après l\'effort ?', a: 'Un shaker est pratique et efficace pour l\'apport protéique, mais un repas complet apporte également les glucides, lipides et micronutriments nécessaires à une récupération optimale.' },
      { q: 'Les protéines végétales sont-elles suffisantes ?', a: 'Oui, à condition de varier les sources (soja, quinoa, légumineuses) pour obtenir un profil complet en acides aminés. Le Veggie Protein Bowl d\'ORVYN est un excellent choix.' }
    ],
    cta: { text: 'Découvrez nos repas post-entraînement', link: '/repas-post-entrainement' }
  },

  'comment-composer-repas-post-entrainement-equilibre': {
    slug: 'comment-composer-repas-post-entrainement-equilibre',
    title: 'Comment composer un repas post-entraînement équilibré ?',
    description: 'Apprenez à composer le repas idéal après le sport : protéines, glucides, lipides. Les clés d\'une alimentation de récupération efficace.',
    date: '2026-07-10',
    category: 'Nutrition',
    readTime: '6 min',
    sections: [
      {
        heading: 'La règle des 3 piliers du repas post-workout',
        content: 'Un repas post-entraînement équilibré repose sur trois macronutriments : des protéines pour réparer le muscle, des glucides pour reconstituer le glycogène, et des lipides de qualité pour soutenir les fonctions hormonales. L\'équilibre idéal tourne autour de 30-40 % de protéines, 40-50 % de glucides et 15-20 % de lipides.'
      },
      {
        heading: 'Choisir sa source de protéines',
        content: 'Les protéines animales (poulet, bœuf, poisson, œufs) offrent un profil complet en acides aminés essentiels. Les options végétales (tempeh, tofu, quinoa, légumineuses) sont tout aussi valables lorsqu\'elles sont combinées. Visez 25-40 g de protéines selon votre poids de corps et l\'intensité de votre séance.'
      },
      {
        heading: 'Les glucides : lesquels privilégier ?',
        content: 'Les glucides complexes à index glycémique bas-moyen sont à privilégier : riz complet ou basmati, patate douce, quinoa, lentilles, légumineuses. Ils fournissent une énergie durable sans pic insulinique excessif. Évitez les sucres rapides qui perturbent la glycémie.'
      },
      {
        heading: 'Construire son assiette idéale',
        content: 'Une assiette post-workout type : une portion de protéines (environ la taille de votre paume), une portion de glucides complexes (une poignée généreuse), des légumes verts à volonté, et une source de bonnes graisses (avocat, huile d\'olive, graines). Les bowls ORVYN respectent parfaitement cet équilibre, avec des macros calculées au gramme près.'
      },
      {
        heading: 'Adapter son repas à son objectif',
        content: 'En prise de masse, augmentez la part de glucides et de lipides pour atteindre un surplus calorique. En sèche, privilégiez les légumes volumineux et les protéines maigres pour un maximum de satiété avec un minimum de calories. En récupération, misez sur des aliments anti-inflammatoires comme le saumon, le curcuma ou les baies.'
      }
    ],
    faq: [
      { q: 'Combien de calories doit contenir un repas post-entraînement ?', a: 'Entre 400 et 700 kcal selon votre poids, votre objectif et l\'intensité de votre séance. Les bowls ORVYN se situent dans cette fourchette avec des options pour chaque objectif.' },
      { q: 'Faut-il compter ses macros précisément ?', a: 'C\'est utile pour optimiser vos résultats, mais un repas équilibré avec des aliments non transformés couvre généralement bien vos besoins sans calculs excessifs.' }
    ],
    cta: { text: 'Découvrir nos repas équilibrés', link: '/repas-post-entrainement' }
  },

  'quel-repas-choisir-prise-de-masse': {
    slug: 'quel-repas-choisir-prise-de-masse',
    title: 'Quels repas choisir pour une prise de masse ?',
    description: 'Guide complet des repas pour la prise de masse musculaire. Calories, macros et aliments à privilégier pour développer votre muscle.',
    date: '2026-07-05',
    category: 'Prise de masse',
    readTime: '7 min',
    sections: [
      {
        heading: 'Les principes de la nutrition pour prise de masse',
        content: 'La prise de masse musculaire repose sur un principe simple : consommer plus de calories que vous n\'en dépensez, avec un apport protéique suffisant pour soutenir la synthèse musculaire. L\'objectif est d\'être en surplus calorique modéré de 200 à 500 kcal par jour, pour prendre du muscle sans accumuler trop de graisse.'
      },
      {
        heading: 'Quelle répartition des macros ?',
        content: 'Pour une prise de masse efficace, visez environ 30 % de protéines, 50 % de glucides et 20 % de lipides. Les protéines doivent représenter environ 1,6 à 2,2 g par kilo de poids de corps. Les glucides sont le carburant de vos entraînements intenses, et les lipides soutiennent votre système hormonal.'
      },
      {
        heading: 'Les aliments stars pour la prise de masse',
        content: 'Privilégiez les aliments denses nutritionnellement : poulet fermier, bœuf haché, riz basmati, patate douce, avocat, œufs, quinoa, lentilles, beurre de cacahuète. Les bowls ORVYN comme le Power Chicken Bowl (574 kcal, 52 g de protéines) ou le Beef Performance Bowl (596 kcal, 55 g de protéines) sont des options complètes et pratiques.'
      },
      {
        heading: 'La fréquence des repas',
        content: 'Pour faciliter l\'atteinte de vos calories quotidiennes, répartissez votre alimentation sur 4 à 5 repas par jour. Petit-déjeuner protéiné, déjeuner complet, collation, dîner équilibré et éventuellement un encas post-entraînement. Les shakes protéinés ORVYN sont parfaits en collation pour augmenter votre apport protéique sans effort.'
      },
      {
        heading: 'Exemple de journée type pour la prise de masse',
        content: 'Petit-déjeuner : flocons d\'avoine, whey, beurre de cacahuète, banane. Déjeuner : Power Chicken Bowl ORVYN. Collation : Shaker Whey Chocolat ORVYN + poignée d\'amandes. Dîner : Beef Performance Bowl ORVYN. Ce plan atteint environ 2800-3000 kcal avec un équilibre macro optimal.'
      }
    ],
    faq: [
      { q: 'Peut-on prendre de la masse en étant végétarien ?', a: 'Oui, en combinant des sources de protéines végétales complètes (soja, quinoa, légumineuses-céréales). Le Veggie Protein Bowl d\'ORVYN apporte 38 g de protéines végétales par portion.' },
      { q: 'Faut-il des compléments alimentaires pour la prise de masse ?', a: 'Ils ne sont pas indispensables mais facilitent l\'atteinte des objectifs protéiques. La whey est un complément pratique, surtout après l\'entraînement.' }
    ],
    cta: { text: 'Voir les repas prise de masse', link: '/repas-prise-de-masse' }
  },

  'que-manger-pendant-seche': {
    slug: 'que-manger-pendant-seche',
    title: 'Que manger pendant une sèche ?',
    description: 'Comment structurer son alimentation en période de sèche : protéines, gestion des calories, repas adaptés pour une définition optimale.',
    date: '2026-06-28',
    category: 'Sèche',
    readTime: '6 min',
    sections: [
      {
        heading: 'Les bases de l\'alimentation en sèche',
        content: 'La sèche vise à réduire le pourcentage de graisse corporelle tout en préservant la masse musculaire. Cela passe par un déficit calorique modéré (200-400 kcal sous votre maintenance) combiné à un apport protéique élevé pour éviter le catabolisme musculaire. La patience et la régularité sont les maîtres-mots.'
      },
      {
        heading: 'Des protéines en quantité suffisante',
        content: 'En sèche, l\'apport protéique doit être maintenu, voire augmenté, pour protéger vos muscles. Visez 1,8 à 2,2 g de protéines par kilo de poids de corps. Les sources maigres sont à privilégier : blanc de poulet, poisson blanc, tofu, protéines végétales. Le Salmon Recovery Bowl et le Veggie Protein Bowl d\'ORVYN sont parfaitement adaptés.'
      },
      {
        heading: 'Gérer ses glucides intelligemment',
        content: 'Contrairement à certaines idées reçues, il ne faut pas supprimer les glucides en sèche. Réduisez-les progressivement et concentrez-vous sur des sources à faible densité calorique et riches en fibres : légumes verts, quinoa, patate douce avec modération. Les glucides sont essentiels pour maintenir l\'intensité de vos entraînements.'
      },
      {
        heading: 'Les légumes : vos alliés satiété',
        content: 'Les légumes verts (brocolis, épinards, asperges, courgettes) sont peu caloriques et riches en fibres et micronutriments. Ils vous permettent de remplir votre assiette sans compromettre votre déficit calorique. Tous les bowls ORVYN sont accompagnés de légumes de qualité.'
      },
      {
        heading: 'L\'importance de l\'hydratation et des électrolytes',
        content: 'En sèche, l\'eau joue un rôle crucial dans l\'élimination des toxines et le transport des nutriments. Une bonne hydratation améliore également la qualité de la peau et la récupération. Les shakes ORVYN comme le Matcha Protein Signature sont une option rafraîchissante et faible en calories.'
      }
    ],
    faq: [
      { q: 'Peut-on manger des glucides le soir en sèche ?', a: 'Oui, il n\'y a pas de raison scientifique de les supprimer le soir. L\'important est le total calorique sur la journée, pas le timing des glucides.' },
      { q: 'Combien de temps dure une sèche ?', a: 'Généralement 8 à 16 semaines selon votre pourcentage de graisse initial et vos objectifs. Ne descendez pas trop bas en calories pour éviter l\'effet yo-yo.' }
    ],
    cta: { text: 'Découvrir nos repas sèche', link: '/repas-seche' }
  },

  'combien-proteines-apres-sport': {
    slug: 'combien-proteines-apres-sport',
    title: 'Combien de protéines consommer après le sport ?',
    description: 'Quel est le bon dosage de protéines après l\'entraînement ? Besoins selon votre poids, votre objectif et l\'intensité de votre séance.',
    date: '2026-06-20',
    category: 'Nutrition',
    readTime: '5 min',
    sections: [
      {
        heading: 'Le rôle des protéines après l\'effort',
        content: 'Après l\'entraînement, les protéines fournissent les acides aminés nécessaires à la réparation des micro-lésions musculaires et à la synthèse de nouvelles fibres. C\'est le moment où votre corps est le plus réceptif à l\'apport protéique, ce qui en fait une fenêtre d\'opportunité pour maximiser vos gains.'
      },
      {
        heading: 'Quelle quantité de protéines après le sport ?',
        content: 'Les études recommandent entre 20 et 40 g de protéines après l\'entraînement, selon votre poids de corps. Une fourchette de 0,3 à 0,5 g par kilo de poids corporel est un bon repère. Pour un sportif de 80 kg, cela représente 24 à 40 g de protéines. Les bowls ORVYN contiennent entre 38 et 55 g de protéines, couvrant parfaitement ce besoin.'
      },
      {
        heading: 'Protéines animales vs végétales : que choisir ?',
        content: 'Les protéines animales (whey, poulet, bœuf, poisson) sont les plus complètes et les mieux absorbées. Les protéines végétales (soja, pois, riz) sont également efficaces, surtout lorsqu\'elles sont combinées. L\'essentiel est de consommer une source que vous digérez bien et qui correspond à vos valeurs.'
      },
      {
        heading: 'Intégrer les protéines dans son routine post-workout',
        content: 'La façon la plus pratique est de combiner un repas solide et un shaker. Par exemple : un Beef Performance Bowl ORVYN (55 g de protéines) après votre séance, ou un Shaker Whey Vanille ORVYN (32 g de protéines) en attendant votre repas. Les deux options sont efficaces selon votre emploi du temps.'
      }
    ],
    faq: [
      { q: 'Peut-on consommer trop de protéines ?', a: 'Pour un sportif en bonne santé, une consommation élevée (jusqu\'à 2,5 g/kg) ne présente pas de risque. Au-delà, l\'excès est simplement stocké ou éliminé.' },
      { q: 'Faut-il absolument un shaker après l\'entraînement ?', a: 'Non, un repas solide riche en protéines fait tout aussi bien. Le shaker est une solution de commodité quand vous manquez de temps.' }
    ],
    cta: { text: 'Découvrir nos shakes protéinés', link: '/shakes-proteines' }
  },

  'bowl-proteine-comment-composer': {
    slug: 'bowl-proteine-comment-composer',
    title: 'Bowl protéiné : comment bien le composer ?',
    description: 'Tout savoir sur le bowl protéiné : son origine, ses avantages, comment le composer pour atteindre vos objectifs sportifs.',
    date: '2026-06-15',
    category: 'Bowls',
    readTime: '4 min',
    sections: [
      {
        heading: 'Qu\'est-ce qu\'un bowl protéiné ?',
        content: 'Le bowl protéiné est un repas complet présenté dans un bol, associant une source de protéines de qualité (viande, poisson, tempeh), des glucides complexes (riz, quinoa, patate douce), des légumes frais et des bonnes graisses. C\'est une façon équilibrée et visuellement appétissante de se nourrir, particulièrement adaptée aux sportifs.'
      },
      {
        heading: 'Les avantages du bowl pour le sportif',
        content: 'Le format bowl permet un contrôle parfait des portions et des macros. Chaque ingrédient est visible et pesé, ce qui facilite le suivi nutritionnel. Les bowls ORVYN sont conçus par des nutritionnistes du sport pour offrir le ratio idéal de protéines, glucides et lipides selon votre objectif : prise de masse, sèche, performance ou récupération.'
      },
      {
        heading: 'Comment composer votre bowl idéal',
        content: 'La base : choisissez votre source de protéines (poulet, bœuf, saumon ou tempeh). Ajoutez une portion de glucides complexes (riz basmati, quinoa, patate douce). Incorporez des légumes frais ou rôtis pour les fibres et micronutriments. Terminez par une source de bonnes graisses (avocat, graines, huile d\'olive). Le résultat est un repas complet, savoureux et aligné avec vos objectifs sportifs.'
      },
      {
        heading: 'Quand consommer un bowl protéiné ?',
        content: 'Le bowl protéiné est polyvalent : déjeuner post-entraînement, dîner équilibré, ou même repas de récupération après une séance intense. Les bowls ORVYN sont disponibles dans des casiers connectés dans votre salle de sport, prêts à être récupérés en quelques secondes après votre entraînement.'
      }
    ],
    faq: [
      { q: 'Les bowls protéinés sont-ils compatibles avec tous les régimes ?', a: 'Oui, ORVYN propose des options pour tous : le Veggie Protein Bowl est vegan, le Salmon Recovery Bowl est sans gluten, et le Power Chicken Bowl est halal.' },
      { q: 'Peut-on réchauffer un bowl protéiné ?', a: 'Absolument, les bowls ORVYN sont conçus pour être dégustés froids ou réchauffés selon votre préférence. Suivez simplement les instructions sur l\'emballage.' }
    ],
    cta: { text: 'Découvrir nos bowls protéinés', link: '/bowls-proteines' }
  },

  'erreurs-alimentaires-apres-entrainement': {
    slug: 'erreurs-alimentaires-apres-entrainement',
    title: 'Les erreurs alimentaires fréquentes après l\'entraînement',
    description: 'Évitez ces 7 erreurs nutritionnelles courantes qui limitent votre récupération et freinent vos progrès sportifs.',
    date: '2026-06-10',
    category: 'Conseils',
    readTime: '5 min',
    sections: [
      {
        heading: '1. Sauter le repas post-entraînement',
        content: 'Beaucoup de sportifs négligent de manger après l\'effort par manque de temps ou d\'appétit. C\'est une erreur : votre corps a besoin de nutriments pour réparer les fibres musculaires et reconstituer ses réserves. Même une petite collation protéinée est préférable à un jeûne prolongé après l\'entraînement.'
      },
      {
        heading: '2. Consommer trop de sucre rapide',
        content: 'Les boissons sucrées, barres chocolatées industrielles ou pâtisseries après l\'effort provoquent un pic insulinique suivi d\'une hypoglycémie réactionnelle. Privilégiez des glucides complexes qui libèrent l\'énergie progressivement et évitent les variations brutales de glycémie.'
      },
      {
        heading: '3. Négliger l\'hydratation',
        content: 'Boire uniquement pendant l\'entraînement ne suffit pas. La réhydratation post-workout est essentielle pour éliminer les toxines, transporter les nutriments et favoriser la récupération. Alternez eau et boissons riches en électrolytes comme les shakes protéinés ORVYN qui allient hydratation et nutrition.'
      },
      {
        heading: '4. Abuser des protéines sans glucides',
        content: 'Consommer uniquement des protéines après l\'effort est inefficace. Les glucides sont nécessaires pour reconstituer le glycogène et créer un environnement anabolique favorable à l\'assimilation des protéines. Un repas équilibré comme le Power Chicken Bowl associe les deux.'
      },
      {
        heading: '5. Manger trop tard après la séance',
        content: 'Plus vous attendez, moins votre corps est réceptif aux nutriments. Visez une collation ou un repas dans les deux heures suivant l\'effort pour profiter de la fenêtre métabolique optimale. Les casiers connectés ORVYN vous permettent de récupérer votre repas immédiatement après votre douche.'
      },
      {
        heading: '6. Choisir des aliments trop gras ou frits',
        content: 'Les aliments frits ou riches en graisses saturées ralentissent la digestion et peuvent provoquer des inconforts digestifs. Préférez des graisses insaturées de qualité (avocat, huile d\'olive, poisson gras) qui soutiennent la récupération sans alourdir la digestion.'
      },
      {
        heading: '7. Ne pas varier ses sources alimentaires',
        content: 'Manger toujours les mêmes aliments peut entraîner des carences en micronutriments essentiels. Variez les sources de protéines (poulet, bœuf, poisson, tempeh), les glucides (riz, quinoa, patate douce, lentilles) et les légumes pour un apport nutritionnel complet. La gamme ORVYN offre cette diversité avec ses différents bowls et recettes.'
      }
    ],
    faq: [
      { q: 'Est-ce grave de sauter un repas post-entraînement de temps en temps ?', a: 'Occasionnellement, ce n\'est pas problématique. L\'important est la régularité sur le long terme. Votre corps s\'adapte, mais une nutrition post-workout régulière optimise vos progrès.' },
      { q: 'Les compléments alimentaires peuvent-ils remplacer un repas ?', a: 'Ils sont utiles en complément, pas en remplacement. Un repas complet apporte des fibres, des micronutriments et une satiété qu\'un complément seul ne peut offrir.' }
    ],
    cta: { text: 'Découvrir nos repas équilibrés', link: '/repas-post-entrainement' }
  }
};

const categoryColors: Record<string, string> = {
  'Récupération': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Nutrition': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Prise de masse': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Sèche': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Bowls': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Conseils': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? BLOG_ARTICLES[slug] : undefined;

  if (!article) {
    return (
      <>
        <SEO title="Article introuvable" description="L'article demandé n'existe pas." />
        <section className="relative bg-[#050505] pt-28 pb-16 lg:pt-36 lg:pb-20 min-h-screen flex items-center justify-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl tracking-[-0.03em] mb-4">
              Article introuvable
            </h1>
            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-8">
              Cet article n'existe pas ou a été déplacé.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-white hover:border-brand-green hover:text-brand-green transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour au blog
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        canonical={`/blog/${article.slug}`}
      />

      <section className="relative bg-[#050505] pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-green transition mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour au blog
          </Link>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className={`inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${categoryColors[article.category] || 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}>
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              <Calendar className="h-3 w-3" />
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-[-0.03em] leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-sm text-neutral-400 max-w-2xl font-sans leading-relaxed">
            {article.description}
          </p>
        </div>
      </section>

      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {article.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl tracking-[-0.02em] mb-4">
                  {section.heading}
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {article.faq.length > 0 && (
            <div className="mt-16 pt-12 border-t border-neutral-800">
              <h2 className="font-display text-2xl font-bold text-white tracking-[-0.02em] mb-8">
                Questions fréquentes
              </h2>
              <div className="space-y-6">
                {article.faq.map((item, index) => (
                  <div key={index} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
                    <h3 className="font-display text-sm font-bold text-white mb-2">
                      {item.q}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate(article.cta.link)}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-xs font-bold text-black tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              {article.cta.text}
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-white hover:border-brand-green hover:text-brand-green transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Tous les articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
