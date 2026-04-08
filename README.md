# Arno Polynice — E-commerce

Site e-commerce du créateur de mode **Arno Polynice** (Épinal, Vosges).
Stack : **Next.js 16** (App Router) + **React 19**, back-office **Shopify** via Storefront API, déployé sur **Vercel** → https://www.arno-polynice.com

## Démarrage local

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000.

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=arno-polynice.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> Le token **Storefront** est public par nature (préfixe `NEXT_PUBLIC_`). Ne JAMAIS exposer de token Admin Shopify ici.

Sur Vercel, ces deux variables doivent être définies dans *Project → Settings → Environment Variables* pour Production, Preview et Development.

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de dev (hot reload) |
| `npm run build` | Build de production |
| `npm start` | Démarre le build en local |
| `npm run lint` | ESLint |

## Architecture

```
app/              Pages (App Router)
  api/            Routes API (checkout, products)
  actions/        Server Actions (auth)
  [pages]/        Routes publiques (boutique, femme, homme, unisexe, produit/[slug], compte, …)
components/       Composants React (Header, Footer, ProductCard, CartDrawer, …)
context/          Contextes React (Cart, Language)
lib/              Intégrations Shopify (Storefront + Auth)
locales/          Fichiers i18n (fr, en, es)
data/             Couche de mapping produits
public/           Assets statiques
```

## Intégration Shopify

Le site consomme **uniquement** l'API Storefront Shopify (version `2025-01`) :

- **Produits & collections** : `lib/shopify.js`
- **Authentification client** : `lib/shopifyAuth.js`
- **Checkout** : `app/api/checkout/route.js` (crée un `cart` via `cartCreate` et redirige vers `checkoutUrl`)

Contenu dynamique géré depuis Shopify Admin via **Metaobjects** :
- `hero_slide` — slides du hero de la homepage
- `vision_image` — image de la section Vision
- `histoire_image` — images de la page Notre Histoire

## Authentification client

Session stockée dans un cookie **httpOnly / secure / sameSite=lax** (`shopify_customer_token`), posé par les Server Actions de `app/actions/auth.js`. Le token n'est jamais exposé au JS côté client.

### ⚠️ Domaine primaire Shopify

Pour que les emails de **réinitialisation de mot de passe** redirigent vers le bon domaine, il faut dans Shopify Admin → *Settings → Domains* définir **`arno-polynice.com`** comme domaine primaire (et non `arno-polynice.myshopify.com`).

## Déploiement Vercel

Le projet est connecté au repo GitHub. Chaque push sur `main` déclenche un déploiement prod automatique. Les branches déclenchent des previews.

Domaine : `www.arno-polynice.com` (configuré dans Vercel → Domains).

## SEO

- `app/sitemap.js` — sitemap dynamique
- `app/robots.js` — exclut `/api/`, `/compte/`, `/connexion/`, `/inscription/`, `/mot-de-passe-oublie/`
- JSON-LD `Organization` injecté dans `app/layout.js`
- Vérification Google Search Console via balise meta

## Pages légales

CGV, Mentions légales et Politique de confidentialité sont renseignées avec les coordonnées de l'entreprise (non-assujettie à la TVA, art. 293B CGI).
