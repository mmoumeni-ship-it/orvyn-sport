import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page introuvable" description="La page demandée n'existe pas." />
      <section className="bg-bone py-28 lg:py-36">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="eyebrow text-sauge justify-center">404</span>
          <h1 className="font-display text-4xl font-semibold text-charbon tracking-tight">Page introuvable</h1>
          <p className="text-sm text-olive">La page demandée n'existe pas ou a été déplacée.</p>
          <Link to="/" className="orvyn-clip-sm inline-flex items-center justify-center bg-sauge px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-bone">
            Retour à l'accueil
          </Link>
        </div>
      </section>
    </>
  );
}
