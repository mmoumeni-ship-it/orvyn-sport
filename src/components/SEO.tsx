import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: Record<string, unknown>;
  robots?: string;
}

const SITE_URL = 'https://orvyn-sport.vercel.app';
const DEFAULT_OG_IMAGE = 'https://orvyn-sport.vercel.app/og-image.jpg';

function buildTitle(title: string): string {
  if (title.includes('ORVYN')) return title;
  return `${title} | ORVYN`;
}

function resolveCanonical(canonical?: string): string {
  if (!canonical) return SITE_URL;
  if (canonical.startsWith('http')) return canonical;
  return `${SITE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`;
}

export { SITE_URL };

export default function SEO({ title, description, canonical, ogImage, ogType = 'website', structuredData, robots }: SEOProps) {
  const fullTitle = buildTitle(title);
  const url = resolveCanonical(canonical);
  const image = ogImage || DEFAULT_OG_IMAGE;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ORVYN',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    description: 'ORVYN - La référence de la nutrition de performance. Bowls protéinés, shakes et snacks healthy pour sportifs.',
    sameAs: ['https://instagram.com/orvyn', 'https://tiktok.com/@orvyn', 'https://linkedin.com/company/orvyn']
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ORVYN',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/menu?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {robots && <meta name="robots" content={robots} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="ORVYN" />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
