import React from 'react';
import { Target, Shield, Users, Trophy, Code2, Cpu, Sparkles, Database, CreditCard } from 'lucide-react';

export default function AboutUs() {
  const pillars = [
    {
      icon: Trophy,
      title: 'Qualité Athlète Supérieure',
      description: 'Poulet bio, bœuf Charolais extra-maigre, riz basmati parfumé. Des matières premières brutes, nobles, et jamais industrielles.',
      color: 'text-brand-green'
    },
    {
      icon: Cpu,
      title: 'Zéro Logistique & Attente',
      description: 'Vos plats sont livrés frais chaque matin dans les espaces partenaires et Concept Lounges. Récupération instantanée.',
      color: 'text-brand-green'
    },
    {
      icon: Users,
      title: 'Partenariat d\'Excellence',
      description: 'Un service exclusif à forte valeur ajoutée qui augmente l\'attractivité et la fidélité des clubs de sport d\'élite.',
      color: 'text-brand-green'
    },
    {
      icon: Shield,
      title: 'Précision Scientifique',
      description: 'Pesée de précision au gramme près pour que vos statistiques nutritionnelles soient fiables à 100%.',
      color: 'text-brand-green'
    }
  ];

  return (
    <section className="bg-[#050505] py-24 lg:py-36 relative overflow-hidden">
      {/* Soft circular aura background indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
            NOTRE HISTOIRE & VISION
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em] leading-tight">
            Né pour la performance sportive
          </h2>
          <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
            Nous sommes des passionnés de sport, de gastronomie et de technologie convaincus que manger sainement après l'effort doit être une expérience d'exception.
          </p>
        </div>

        {/* 2-Column: Vision presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-neutral-900 items-start">
          
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-[9px] text-neutral-500 font-bold uppercase tracking-wider">01 • LE PROBLÈME</span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">Le compromis n'est plus acceptable</h3>
            </div>
            <div className="space-y-4 text-xs text-neutral-400 font-sans font-light leading-relaxed">
              <p>
                Tous les athlètes de haut niveau font face au même dilemme quotidien : pour optimiser la synthèse des protéines et la récupération, il faut s'alimenter avec précision dans l'heure qui suit la fin de l'effort.
              </p>
              <p>
                Pourtant, la réalité se résume trop souvent à des barres protéinées ultra-transformées, des shakers de poudre tièdes oubliés au fond du sac, ou de l'attente interminable pour cuisiner chez soi après une longue séance de sport.
              </p>
              <p className="text-brand-green font-medium">
                ORVYN résout cela en inventant la gastronomie sportive connectée : de vrais repas d'élite cuisinés frais, stockés à température contrôlée directement à la sortie de vos vestiaires.
              </p>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div key={idx} className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-6 space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e0e0e] border border-neutral-800 text-brand-green">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white tracking-tight font-display">{pil.title}</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-sans font-light">{pil.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Integrations / Technology roadmap box (Highly appreciated by VC Investors) */}
        <div className="mt-24 bg-[#080808] text-white rounded-3xl p-8 lg:p-10 space-y-8 relative overflow-hidden border border-neutral-900">
          <div className="absolute top-0 right-0 h-36 w-36 bg-brand-green/10 rounded-full blur-3xl"></div>
          
          <div className="space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-green font-bold flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5" />
              INFRASTRUCTURE TECH & SAAS DU PROTOTYPE
            </span>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">Une architecture pensée pour le passage à l'échelle</h3>
            <p className="text-xs text-neutral-400 font-sans max-w-2xl leading-relaxed font-light">
              Pour assurer un service client irréprochable et un déploiement éclair, ORVYN est bâti sur des intégrations logicielles haut de gamme avec les leaders de l'industrie Cloud.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-neutral-900 text-xs">
            {/* Supabase */}
            <div className="space-y-3">
              <span className="font-semibold text-brand-green font-mono block flex items-center gap-1.5">
                <Database className="h-4 w-4 shrink-0" />
                Base Supabase Realtime
              </span>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-sans font-light">Gestion hautement sécurisée des profils d'athlètes et synchronisation instantanée du verrouillage physique des casiers connectés.</p>
            </div>

            {/* Stripe */}
            <div className="space-y-3">
              <span className="font-semibold text-white font-mono block flex items-center gap-1.5">
                <CreditCard className="h-4 w-4 shrink-0" />
                Facturation Stripe
              </span>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-sans font-light">Gestion transparente des abonnements récurrents, paiements sécurisés et facturation automatique des athlètes.</p>
            </div>

            {/* Telegram Webhooks */}
            <div className="space-y-3">
              <span className="font-semibold text-neutral-300 font-mono block flex items-center gap-1.5">
                <Cpu className="h-4 w-4 shrink-0" />
                Webhooks Logistiques
              </span>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-sans font-light">Notifications de réapprovisionnement automatique envoyées à l'équipe logistique dès qu'un stand passe sous 15% de stocks.</p>
            </div>

            {/* Firebase */}
            <div className="space-y-3">
              <span className="font-semibold text-brand-green font-mono block flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 shrink-0" />
                Notifications Firebase
              </span>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-sans font-light">Envoi ciblé d'alertes instantanées de disponibilité de commande ou de rapports de progression calorique quotidienne.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
