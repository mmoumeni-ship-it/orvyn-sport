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

  return (
    <>
      <SEO
        title="Contact"
        description="Contactez ORVYN - Nutrition sportive premium. Formulaire de contact, email, réseaux sociaux."
        canonical="/contact"
      />
      <section className="relative bg-orvyn-carbon pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 h-[400px] w-[400px] rounded-full bg-clay/5 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">CONTACT</span>
          <h1 className="font-display h-editorial text-orvyn-bone tracking-tight mb-6">Contactez-nous</h1>
          <p className="text-sm text-orvyn-bone/60 max-w-2xl mx-auto font-sans leading-relaxed">
            Une question, un projet, une suggestion ? Notre équipe est à votre écoute.
          </p>
        </div>
      </section>

      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-carbon-raised orvyn-clip-sm depth p-8"
            >
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-lime/10 border border-lime/30 flex items-center justify-center mx-auto">
                    <Send className="h-8 w-8 text-lime" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-orvyn-bone">Message envoyé !</h3>
                  <p className="text-sm text-orvyn-bone/60 font-sans">Notre équipe vous répondra dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-orvyn-bone/50 mb-2">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-sm bg-carbon border border-olive/30 py-3 px-4 text-sm text-orvyn-bone placeholder-orvyn-bone/25 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-orvyn-bone/50 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-sm bg-carbon border border-olive/30 py-3 px-4 text-sm text-orvyn-bone placeholder-orvyn-bone/25 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-orvyn-bone/50 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-sm bg-carbon border border-olive/30 py-3 px-4 text-sm text-orvyn-bone placeholder-orvyn-bone/25 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all"
                      placeholder="+33 6 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-orvyn-bone/50 mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-sm bg-carbon border border-olive/30 py-3 px-4 text-sm text-orvyn-bone placeholder-orvyn-bone/25 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full orvyn-clip-sm bg-sauge text-bone py-3 text-xs font-semibold uppercase tracking-wider hover:bg-lime-soft transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
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
              <div className="bg-carbon-raised orvyn-clip-sm depth p-8 space-y-6">
                <h3 className="text-lg font-display font-semibold text-orvyn-bone">Nos coordonnées</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: 'Email', value: 'contact@orvyn-sport.com', link: 'mailto:contact@orvyn-sport.com' },
                    { icon: Phone, label: 'Téléphone', value: '+33 1 86 95 72 10', link: 'tel:+33186957210' },
                    { icon: MapPin, label: 'Adresse', value: 'Paris, France', link: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-clay/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-clay" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-orvyn-bone/40">{item.label}</p>
                        {item.link ? (
                          <a href={item.link} className="text-sm text-orvyn-bone hover:text-clay transition">{item.value}</a>
                        ) : (
                          <p className="text-sm text-orvyn-bone">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-carbon-raised orvyn-clip-sm depth p-8 space-y-6">
                <h3 className="text-lg font-display font-semibold text-orvyn-bone">Suivez-nous</h3>
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
                      className="h-12 w-12 border border-olive/40 flex items-center justify-center hover:border-clay hover:text-clay transition-all group"
                    >
                      <social.icon className="h-5 w-5 text-orvyn-bone/40 group-hover:text-clay transition" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-orvyn-bone/50 font-sans">Suivez ORVYN sur les réseaux sociaux pour ne rien manquer de nos actualités.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
