import { getPressItems } from '@/lib/shopify';
import PresseContent from './PresseContent';

// ISR : permet au client d'ajouter une parution depuis Shopify et de la voir
// en ligne en quelques minutes max, sans rebuild manuel.
export const revalidate = 300;

export const metadata = {
    title: 'Presse — Arno Polynice dans les médias',
    description: 'Articles de presse, interviews et vidéos consacrés à Arno Polynice, créateur de mode artisanale française basé dans les Vosges.',
    alternates: { canonical: 'https://www.arno-polynice.com/presse' },
};

/**
 * Server wrapper : fetch les items Shopify (avec ISR 5 min) et délègue le
 * rendu à PresseContent (client) qui gère l'en-tête traduit via les locales.
 *
 * Note : on n'utilise plus le metaobject `press_page` pour l'en-tête —
 * remplacé par les clés press.* des locales pour avoir un en-tête traduit
 * en EN et ES (Shopify ne supporte pas la traduction native sans installer
 * l'app Translate & Adapt + re-saisie manuelle par Adelson).
 */
export default async function PressePage() {
    const items = await getPressItems();
    return <PresseContent items={items} />;
}
