import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Dumbbell, Building2 } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<'athlete' | 'gym'>('athlete');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="contact-section" className="bg-orvyn-carbon py-24 lg:py-32 relative overflow-hidden">
      {/* Aura discrète */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-clay/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* En-tête éditorial */}
        <div className="mb-20 flex justify-center">
          <SectionHeader
            align="center"
            eyebrow="Rejoindre notre écosystème"
            title="Prêt à réinventer votre nutrition ?"
            description="Que vous soyez athlète en quête de gains ou gérant de salle désireux d'offrir le meilleur service d'élite, notre équipe d'experts vous répond en moins de 12 heures."
          />
        </div>

        {/* 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:items-start max-w-5xl mx-auto">

          {/* Colonne gauche — coordonnées */}
          <div className="lg:col-span-5 space-y-8 orvyn-clip-sm depth bg-carbon-raised p-8 relative overflow-hidden">
            <div className="space-y-3">
              <h3 className="font-display text-xl font-semibold tracking-tight text-orvyn-bone">ORVYN HQ</h3>
              <p className="text-xs text-orvyn-bone/60 leading-relaxed">
                Siège social national et pôle de recherche & développement culinaire.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-olive/25">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-clay/10 text-clay shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-widest text-orvyn-bone/40">E-mail support</span>
                  <span className="text-xs font-semibold text-orvyn-bone hover:text-clay transition">contact@orvyn.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-clay/10 text-clay shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-widest text-orvyn-bone/40">Téléphone d'élite</span>
                  <span className="text-xs font-semibold text-orvyn-bone">+33 (0)1 42 78 90 41</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-clay/10 text-clay shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-widest text-orvyn-bone/40">Adresse bureaux</span>
                  <span className="text-xs font-medium text-orvyn-bone/80">82 Rue de Courcelles, Paris 75008</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-olive/25 text-[9px] text-orvyn-bone/40 uppercase tracking-widest leading-relaxed">
              Notre conciergerie nutritionnelle est disponible 7j/7 de 07h à 22h.
            </div>
          </div>

          {/* Colonne droite — formulaire */}
          <div className="lg:col-span-7 orvyn-clip-sm depth bg-carbon-raised p-8">
            {success ? (
              <div className="text-center py-12 space-y-5 animate-fade-in flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime/10 border border-lime/40 text-lime">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-semibold text-orvyn-bone tracking-tight">Message transmis avec succès !</h3>
                  <p className="text-xs text-orvyn-bone/60 leading-relaxed max-w-sm">
                    Merci pour votre intérêt envers ORVYN. Notre équipe médicale ou logistique analyse vos informations et vous recontactera sous 12 heures.
                  </p>
                </div>
                <button
                  id="contact-reset-btn"
                  onClick={() => setSuccess(false)}
                  className="orvyn-clip-sm border border-olive/40 text-orvyn-bone px-6 py-2.5 text-[10px] tracking-widest uppercase font-semibold hover:border-bone/50 transition cursor-pointer"
                >
                  Envoyer un nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider">Votre Nom Complet</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Alexandre Dubois"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-sm bg-carbon border border-olive/30 p-3 text-xs text-orvyn-bone placeholder-orvyn-bone/25 focus:outline-none focus:border-lime transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider">Votre Adresse E-mail</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="alex.dubois@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-sm bg-carbon border border-olive/30 p-3 text-xs text-orvyn-bone placeholder-orvyn-bone/25 focus:outline-none focus:border-lime transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider">Je suis...</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="contact-subject-athlete"
                      type="button"
                      onClick={() => setSubject('athlete')}
                      className={`orvyn-clip-sm py-3 text-center text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
                        subject === 'athlete'
                          ? 'bg-lime text-carbon'
                          : 'border border-olive/40 text-orvyn-bone/60 hover:text-orvyn-bone'
                      }`}
                    >
                      <Dumbbell className="h-3.5 w-3.5" />
                      Un Athlète / Client
                    </button>
                    <button
                      id="contact-subject-gym"
                      type="button"
                      onClick={() => setSubject('gym')}
                      className={`orvyn-clip-sm py-3 text-center text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
                        subject === 'gym'
                          ? 'bg-lime text-carbon'
                          : 'border border-olive/40 text-orvyn-bone/60 hover:text-orvyn-bone'
                      }`}
                    >
                      <Building2 className="h-3.5 w-3.5" />
                      Gérant de Salle / Club
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider">Votre Message</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder={
                      subject === 'athlete'
                        ? "Bonjour, je m'entraîne au club Courcelles et j'aimerais commander un programme complet..."
                        : "Bonjour, je dirige deux clubs de sport premium à Bordeaux et je serais intéressé pour installer un stand ORVYN..."
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-sm bg-carbon border border-olive/30 p-3 text-xs text-orvyn-bone placeholder-orvyn-bone/25 focus:outline-none focus:border-lime resize-none transition-all"
                    required
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="orvyn-clip-sm w-full bg-lime text-carbon py-3.5 text-center text-[10px] tracking-widest uppercase font-semibold hover:bg-lime-soft transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Envoi en cours...</span>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5 stroke-[3px]" />
                      <span>Transmettre ma demande</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
