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
      <section className="relative bg-[#050505] pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 h-[400px] w-[400px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block mb-4">CONTACT</span>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-6xl tracking-[-0.03em] mb-6">Contactez-nous</h1>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto font-sans">
            Une question, un projet, une suggestion ? Notre équipe est à votre écoute.
          </p>
        </div>
      </section>

      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-8"
            >
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto">
                    <Send className="h-8 w-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message envoyé !</h3>
                  <p className="text-sm text-neutral-400">Notre équipe vous répondra dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 px-4 text-sm text-white placeholder-neutral-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/30 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 px-4 text-sm text-white placeholder-neutral-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/30 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 px-4 text-sm text-white placeholder-neutral-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/30 transition-all"
                      placeholder="+33 6 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 px-4 text-sm text-white placeholder-neutral-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/30 transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-white text-black py-3 text-xs font-mono font-bold uppercase tracking-wider hover:bg-brand-green transition-all duration-300 flex items-center justify-center gap-2"
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
              <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-8 space-y-6">
                <h3 className="text-lg font-bold text-white font-display">Nos coordonnées</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: 'Email', value: 'contact@orvyn-sport.com', link: 'mailto:contact@orvyn-sport.com' },
                    { icon: Phone, label: 'Téléphone', value: '+33 1 86 95 72 10', link: 'tel:+33186957210' },
                    { icon: MapPin, label: 'Adresse', value: 'Paris, France', link: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-brand-green" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">{item.label}</p>
                        {item.link ? (
                          <a href={item.link} className="text-sm text-white hover:text-brand-green transition">{item.value}</a>
                        ) : (
                          <p className="text-sm text-white">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-8 space-y-6">
                <h3 className="text-lg font-bold text-white font-display">Suivez-nous</h3>
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
                      className="h-12 w-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-all group"
                    >
                      <social.icon className="h-5 w-5 text-neutral-400 group-hover:text-brand-green transition" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-neutral-500">Suivez ORVYN sur les réseaux sociaux pour ne rien manquer de nos actualités.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
