# Plan de Tracking — ORVYN Nutrition Sportive

## Prérequis

1. Créer un compte Google Analytics 4
2. Créer un conteneur Google Tag Manager
3. Configurer Google Search Console

Ne pas inventer d'identifiants — ces éléments sont à ajouter ultérieurement.

## Structure GA4 (à configurer)

```html
<!-- Google tag (gtag.js) à insérer dans public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Structure GTM (à configurer)

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

## Événements à suivre

### E-commerce / Commande

| Événement | Déclencheur | Données à envoyer |
|-----------|-------------|-------------------|
| `view_item` | Affichage d'un produit | id, name, category, price |
| `add_to_cart` | Clic "Ajouter au panier" | id, name, category, price, quantity |
| `remove_from_cart` | Clic "Supprimer du panier" | id, name, quantity |
| `begin_checkout` | Ouverture du panier | items[], value |
| `purchase` | Commande confirmée | transaction_id, value, items[] |
| `view_cart` | Ouverture du drawer panier | - |

### Engagement

| Événement | Déclencheur | Données à envoyer |
|-----------|-------------|-------------------|
| `view_promotion` | Affichage d'une offre | promotion_name, promotion_id |
| `select_promotion` | Clic sur une offre | promotion_name, promotion_id |
| `sign_up` | Inscription newsletter | method (email) |
| `login` | Connexion compte | method |
| `subscribe` | Souscription abonnement | plan_name, plan_price |

### Navigation

| Événement | Déclencheur | Données à envoyer |
|-----------|-------------|-------------------|
| `page_view` | Changement de page | page_title, page_location, page_path |
| `select_content` | Clic sur un objectif | content_type (goal), content_id |
| `filter_meals` | Filtrage des repas | category, goal |

### Formulaires

| Événement | Déclencheur | Données à envoyer |
|-----------|-------------|-------------------|
| `form_start` | Premier champ rempli | form_name |
| `form_submit` | Envoi du formulaire | form_name, form_type (contact, newsletter) |

## Implémentation recommandée

1. Installer GTM via le conteneur dans `<head>`
2. Configurer les déclencheurs dans GTM (clic, soumission de formulaire, page view)
3. Déployer GA4 via GTM
4. Utiliser le Data Layer pour les événements e-commerce

## Pages à exclure du tracking

- /api/*
- Pages d'administration
