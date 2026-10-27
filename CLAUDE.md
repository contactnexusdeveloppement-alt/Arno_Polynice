# Arno Polynice — fiche projet

## Client
- Marque : **Arno Polynice**, créateur de mode artisanale à Épinal (Vosges).
- Créateur / interlocuteur : **Adelson Paugain** (entreprise individuelle « PAUGAIN ADELSON », SIRET 103 064 036 00017, APE 14.13Z, TVA non applicable art. 293B CGI).
- Adresse : 68 rue André Vitu, 88000 Épinal. Email : arnopolynice@gmail.com.
- Contrat Ned : prestation DEV-2026-002 du 21 mars 2026 + acte de cession des droits (`scripts/generate-cession-droits.js`).
- Adelson gère lui-même le contenu dans Shopify Admin (produits, métaobjets, traductions via Translate & Adapt). Il valide le rendu, pas le code.

## Stack
- Next.js 16 (App Router) + React 19, **JavaScript** (pas de TypeScript), CSS Modules (pas de Tailwind).
- Back-office : **Shopify headless**, Storefront API `2025-01` uniquement (pas de token Admin).
- Emails (contact + newsletter) : **Resend**, expéditeur `onboarding@resend.dev`.
- Hébergement : **Vercel** (plan Hobby). Push sur `main` = déploiement prod automatique, les autres branches = previews.
- Analytics : Vercel Analytics + Speed Insights (sans cookies, toujours actifs) ; GA4 `G-0RZ39DLT3H` et Microsoft Clarity chargés **uniquement après consentement** (`components/AnalyticsScripts.jsx`, `context/CookieConsentContext.js`).
- Gestionnaire de paquets : **npm** (`package-lock.json`).

## URLs
- Prod : https://www.arno-polynice.com
- Boutique Shopify : `arno-polynice.myshopify.com` (le checkout est servi sur ce domaine, cf. `app/api/checkout/route.js`).
- Repo : `contactnexusdeveloppement-alt/Arno_Polynice`.

## Variables d'environnement (Vercel + `.env.local`)
| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Domaine myshopify |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Token Storefront (public par nature) |
| `RESEND_API_KEY` | Envoi des formulaires contact / newsletter (sans elle : erreur `serviceDown`) |
| `CONTACT_EMAIL` | Destinataire des formulaires (défaut : arnopolynice@gmail.com) |

## Architecture
- `lib/shopify.js` : toutes les requêtes Storefront (produits, collections, métaobjets). Par défaut `no-store` ; passer `revalidate` pour l'ISR sur le contenu quasi statique.
- `lib/shopifyAuth.js` + `app/actions/auth.js` : comptes clients classiques (email + mot de passe), token en cookie httpOnly `shopify_customer_token`.
- `data/products.js` : mapping produit Shopify → objet front (catégorie depuis les tags `femme`/`homme`/`unisexe`, sous-catégorie = `productType`, accessoires = type ou tag `accessoires`).
- `lib/shopifyImageLoader.js` : loader `next/image` qui délègue le redimensionnement au CDN Shopify (le quota d'optimisation Vercel Hobby avait cassé les images en oct. 2026). Images locales : passer `unoptimized`.
- `context/` : panier (localStorage `arno-cart`), langue (localStorage `arno-lang`), consentement cookies.
- `locales/{fr,en,es}.json` : i18n **côté client uniquement** via `useLanguage().t()`. Toute nouvelle chaîne visible doit exister dans les 3 fichiers. Les API renvoient des **codes d'erreur** traduits côté client, jamais de texte en dur.
- `app/api/ethics` et `app/api/press` : contenu métaobjets dans la langue demandée (`@inContext`), avec repli sur les locales.

### Métaobjets Shopify utilisés
`hero_slide`, `vision_image`, `histoire_image`, `ethics_page`, `ethics_value`, `press_page`, `press_item`, `press_section_2`, `press_section_2_item`, `press_section_3`, `press_section_3_item`.
Métachamp produit : `custom.details` (composition, onglet « Détails »).

## Conventions
- Commentaires et messages de commit en français, format `type(scope): description` (`feat`, `fix`, `style`, `content`, `chore`…).
- Mobile et tablette (769-1024px) testés systématiquement : plusieurs commits ont corrigé le « trou tablette ».
- Pas de Content-Security-Policy (volontaire, voir `next.config.mjs`).
- Les scripts `scripts/generate-*.js` produisent des .docx pour le client ; ils dépendent du paquet `docx` (non listé dans `package.json`) et écrivent hors du repo.

## Vérifications avant livraison
- `npm run build` doit passer (il passe même sans variables d'env, les appels Shopify échouent proprement).
- `npm run lint` : 8 erreurs connues `react-hooks/set-state-in-effect` (lecture de localStorage dans des `useEffect`), non bloquantes pour le build. Ne pas en ajouter de nouvelles.
- Changement visible : preview Vercel + captures avant fusion sur `main`.

## Points de vigilance connus (oct. 2026)
- Prix affichés via `parseInt` + `,00 €` en dur : un prix avec centimes s'affiche faux (le checkout Shopify, lui, est juste).
- `getAllProducts` est plafonné à 50 produits et chaque page produit recharge tout le catalogue sans cache.
- Texte de remplacement technique visible si `custom.details` est vide sur un produit.
- Sitemap sans `/accessoires`, `/presse`, `/sur-mesure`.
- Mentions légales (section cookies) : affirment encore « uniquement des cookies strictement nécessaires » alors que GA4 et Clarity sont présents (avec consentement).
- Newsletter : simple email envoyé à Adelson, aucune liste stockée.
- Resend en `onboarding@resend.dev` : ne livre qu'à l'adresse du compte Resend, domaine non vérifié.
