import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

const SITE_URL = 'https://orvyn-sport.vercel.app';
const DEFAULT_OG_IMAGE = 'https://orvyn-sport.vercel.app/src/assets/images/orvyn-hero-founder.png';

export default function SEO({ title, description, canonical, ogImage, ogType = 'website' }: SEOProps) {
  const fullTitle = `${title} | ORVYN`;
  const url = canonical || SITE_URL;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

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
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ORVYN',
          url: SITE_URL,
          logo: `${SITE_URL}/src/assets/images/orvyn-hero-founder.png`,
          description: 'ORVYN - Nutrition sportive premium. Bowls protéinés, shakes et snacks healthy pour sportifs.',
          sameAs: ['https://instagram.com/orvyn', 'https://tiktok.com/@orvyn', 'https://linkedin.com/company/orvyn']
        })}
      </script>
    </Helmet>
  );
}
