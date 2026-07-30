# SEO Implementation — ORVYN Nutrition Sportive

## Arborescence du site

```
/                                   → Accueil (page complète avec sections)
/repas                              → Tous les repas (Bowls, Shakers, Snacks)
/bowls-proteines                    → Bowls protéinés
/repas-prise-de-masse               → Repas pour prise de masse
/repas-seche                        → Repas pour sèche
/repas-post-entrainement            → Repas post-entraînement
/shakes-proteines                   → Shakes protéinés
/snacks-healthy                     → Snacks healthy
/abonnements                        → Abonnements Start, Pro, Elite
/blog                               → Blog nutrition & performance
/blog/:slug                         → Articles de blog individuels
/a-propos                           → À propos d'ORVYN
/contact                            → Contact
/faq                                → FAQ
```

## Mots-clés ciblés par page

| Page | Mot-clé principal | Intention |
|------|------------------|-----------|
| / | repas sportifs bowls protéinés | Informationnelle / commerciale |
| /bowls-proteines | bowls protéinés | Commerciale |
| /repas-prise-de-masse | repas prise de masse | Commerciale |
| /repas-seche | repas pour sèche musculation | Commerciale |
| /repas-post-entrainement | repas post-entraînement | Commerciale |
| /shakes-proteines | shakes protéinés | Commerciale |
| /snacks-healthy | snacks healthy pour sportifs | Commerciale |
| /blog | nutrition sportive | Informationnelle |

## Maillage interne

- Les pages commerciales (`/bowls-proteines`, `/repas-prise-de-masse`, etc.) contiennent des liens vers les autres pages d'objectifs
- Les articles de blog lient vers les pages commerciales correspondantes
- Le footer contient des liens vers toutes les pages principales
- La navigation principale est présente sur toutes les pages
- Les ancres sont naturelles et descriptives (ex: « découvrez nos bowls protéinés pour la prise de masse »)

## Métadonnées

Chaque page possède :
- Title unique (`{titre} | ORVYN`)
- Meta description unique
- URL canonique
- Balises Open Graph (og:title, og:description, og:image, og:url, og:type)
- Balises Twitter Card (summary_large_image)

## Sitemap

Fichier : `/sitemap.xml`
- Généré statiquement avec toutes les pages publiques
- Fréquences de mise à jour définies (weekly pour les pages principales, monthly pour les pages statiques)
- Priorités hiérarchisées (1.0 pour l'accueil, 0.9 pour /repas, 0.8 pour les pages commerciales, etc.)

## Robots.txt

Fichier : `/robots.txt`
- Autorise tout (`Allow: /`)
- Bloque `/api/`
- Pointe vers le sitemap

## Données structurées (JSON-LD)

Implémentées via le composant `<SEO />` :
- **Organization** : nom, URL, logo, description, réseaux sociaux
- **FAQPage** : sur les pages contenant une FAQ (bowls-proteines, prise-de-masse, seche, etc.)
- **BreadcrumbList** : à implémenter sur les pages intérieures
- **Article** : pour les articles de blog (à venir)

Données structurées supplémentaires recommandées :
- Product pour chaque repas (avec nutrition, prix)
- WebSite avec searchAction

## Tracking (préparation)

Un fichier `TRACKING.md` documente les événements à suivre.
Les emplacements pour GTM et GA4 sont préparés dans le code via le composant SEO.

## Améliorations futures

- Génération automatique du sitemap via plugin Vite
- Images en WebP/AVIF
- Lazy loading des images sous la ligne de flottaison
- Compression et redimensionnement automatique des images
- Implémentation BreadcrumbList JSON-LD sur toutes les pages
