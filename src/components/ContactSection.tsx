import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

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
    <section id="contact-section" className="bg-[#050505] py-24 lg:py-32 relative overflow-hidden">
      {/* Soft circular aura background indicator */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
            REJOINDRE NOTRE ÉCOSYSTÈME
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em] leading-tight">
            Prêt à réinventer votre nutrition ?
          </h2>
          <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto font-light">
            Que vous soyez athlète en quête de gains ou gérant de salle désireux d'offrir le meilleur service d'élite, notre équipe d'experts vous répond en moins de 12 heures.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start max-w-5xl mx-auto">
          
          {/* Column Left: Contact Info details */}
          <div className="lg:col-span-5 space-y-8 bg-[#0a0a0a] border border-neutral-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 h-32 w-32 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="space-y-3">
              <h3 className="font-display text-xl font-bold tracking-tight">ORVYN HQ</h3>
              <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                Siège social national et pôle de recherche & développement culinaire.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-neutral-900">
              
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#121212] border border-neutral-800 text-brand-green shrink-0">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase text-neutral-500 font-mono tracking-wider">E-mail support</span>
                  <span className="text-xs font-bold hover:text-brand-green transition font-mono">contact@orvyn.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#121212] border border-neutral-800 text-brand-green shrink-0">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase text-neutral-500 font-mono tracking-wider">Téléphone d'élite</span>
                  <span className="text-xs font-bold font-mono">+33 (0)1 42 78 90 41</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#121212] border border-neutral-800 text-brand-green shrink-0">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase text-neutral-500 font-mono tracking-wider">Adresse bureaux</span>
                  <span className="text-xs font-semibold text-neutral-300">82 Rue de Courcelles, Paris 75008</span>
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-neutral-900 text-[9px] font-mono text-neutral-500 uppercase tracking-widest leading-relaxed">
              ⚡ NOTRE CONCIERGERIE NUTRITIONNELLE EST DISPONIBLE 7J/7 DE 07H À 22H
            </div>
          </div>

          {/* Column Right: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-8 shadow-2xl">
            {success ? (
              <div className="text-center py-12 space-y-5 animate-fade-in flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 border border-brand-green text-brand-green">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">Message transmis avec succès !</h3>
                  <p className="text-xs text-neutral-400 font-sans font-light max-w-sm leading-relaxed">
                    Merci pour votre intérêt envers ORVYN. Notre équipe médicale ou logistique analyse vos informations et vous recontactera sous 12 heures.
                  </p>
                </div>
                <button
                  id="contact-reset-btn"
                  onClick={() => setSuccess(false)}
                  className="rounded-full bg-white text-black px-6 py-2.5 text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-brand-green transition"
                >
                  Envoyer un nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Votre Nom Complet</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Alexandre Dubois"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-brand-green transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Votre Adresse E-mail</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="alex.dubois@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-brand-green transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Je suis...</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="contact-subject-athlete"
                      type="button"
                      onClick={() => setSubject('athlete')}
                      className={`rounded-xl py-3 text-center text-xs font-bold border transition cursor-pointer font-sans ${
                        subject === 'athlete'
                          ? 'bg-white text-black border-white'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      💪 Un Athlète / Client
                    </button>
                    <button
                      id="contact-subject-gym"
                      type="button"
                      onClick={() => setSubject('gym')}
                      className={`rounded-xl py-3 text-center text-xs font-bold border transition cursor-pointer font-sans ${
                        subject === 'gym'
                          ? 'bg-white text-black border-white'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      🛡️ Gérant de Salle / Club
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Votre Message</label>
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
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-brand-green resize-none transition-all"
                    required
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-white text-black py-3.5 text-center text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-brand-green transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Envoi en cours...</span>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5 text-black stroke-[3px]" />
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
