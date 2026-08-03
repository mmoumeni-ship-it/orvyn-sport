import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full rounded-xl bg-bg-secondary border border-line/70 py-3 px-4 text-sm text-charbon placeholder-olive/60 focus:border-sauge focus:outline-none focus:ring-1 focus:ring-sauge/30 transition-all";

  return (
    <>
      <SEO
        title="Contact"
        description="Contactez ORVYN - Nutrition sportive premium. Formulaire de contact, email, réseaux sociaux."
        canonical="/contact"
      />
      <section className="relative bg-beige pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-line/70">
        <div className="absolute top-1/2 left-1/3 h-80 w-80 rounded-full bg-frais/20 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">Contact</span>
          <h1 className="font-display h-editorial text-charbon tracking-tight mb-6">Contactez-nous</h1>
          <p className="text-base text-olive max-w-2xl mx-auto font-sans leading-relaxed">
            Une question, un projet, une suggestion ? Notre équipe est à votre écoute.
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white orvyn-clip-sm border border-line/70 p-8 shadow-[0_1px_4px_rgba(23,26,24,0.06)]"
            >
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-sauge/10 border border-sauge/30 flex items-center justify-center mx-auto">
                    <Send className="h-8 w-8 text-sauge" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charbon">Message envoyé !</h3>
                  <p className="text-sm text-olive font-sans">Notre équipe vous répondra dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-olive mb-2">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-olive mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-olive mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+33 6 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-olive mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      placeholder="Votre message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full orvyn-clip-sm bg-sauge text-bone py-3.5 text-xs font-semibold uppercase tracking-wider hover:bg-sauge-soft transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div className="bg-white orvyn-clip-sm border border-line/70 p-8 space-y-6 shadow-[0_1px_4px_rgba(23,26,24,0.06)]">
                <h3 className="text-lg font-display font-semibold text-charbon">Nos coordonnées</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: 'Email', value: 'contact@orvyn-sport.com', link: 'mailto:contact@orvyn-sport.com' },
                    { icon: Phone, label: 'Téléphone', value: '+33 1 86 95 72 10', link: 'tel:+33186957210' },
                    { icon: MapPin, label: 'Adresse', value: 'Paris, France', link: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-sauge/10 flex items-center justify-center shrink-0 rounded-xl">
                        <item.icon className="h-5 w-5 text-sauge" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-olive">{item.label}</p>
                        {item.link ? (
                          <a href={item.link} className="text-sm text-charbon hover:text-sauge transition">{item.value}</a>
                        ) : (
                          <p className="text-sm text-charbon">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white orvyn-clip-sm border border-line/70 p-8 space-y-6 shadow-[0_1px_4px_rgba(23,26,24,0.06)]">
                <h3 className="text-lg font-display font-semibold text-charbon">Suivez-nous</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, href: 'https://instagram.com/orvyn', label: 'Instagram' },
                    { icon: Linkedin, href: 'https://linkedin.com/company/orvyn', label: 'LinkedIn' },
                    { icon: MessageCircle, href: 'https://tiktok.com/@orvyn', label: 'TikTok' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 border border-line/70 flex items-center justify-center rounded-xl hover:border-sauge hover:text-sauge transition-all group"
                    >
                      <social.icon className="h-5 w-5 text-olive group-hover:text-sauge transition" />
                    </a>
                  ))}
                </div>
                <p className="text-sm text-olive font-sans">Suivez ORVYN sur les réseaux sociaux pour ne rien manquer de nos actualités.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
