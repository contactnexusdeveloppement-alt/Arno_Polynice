import { getPressPage, getPressItems } from '@/lib/shopify';
import PresseContent from './PresseContent';

// ISR : Adelson peut ajouter une parution depuis Shopify et la voir en
// ligne en quelques minutes max, sans rebuild manuel.
export const revalidate = 300;

export const metadata = {
    title: 'Presse — Arno Polynice dans les médias',
    description: 'Articles de presse, interviews et vidéos consacrés à Arno Polynice, créateur de mode artisanale française basé dans les Vosges.',
    alternates: { canonical: 'https://www.arno-polynice.com/presse' },
};

// Fallback statique : si Shopify est down au moment du SSR, on garde un
// en-tête FR par défaut. Ne doit jamais être visible en pratique.
const FALLBACK_PAGE = {
    label: 'Médias',
    title: 'Arno Polynice dans les médias',
    intro: "Articles de presse, interviews et vidéos qui parlent du travail d'Arno Polynice et de la marque.",
};

/**
 * Server component : fetch header + items Shopify en FR (SSR + ISR), puis
 * délègue à PresseContent (client) qui re-fetch en EN/ES si l'utilisateur
 * change de langue (cf. /api/press).
 *
 * Adelson reste maître du contenu via Shopify metaobjects (press_page +
 * press_item). Pour que les traductions EN/ES s'affichent : installer l'app
 * Shopify "Translate & Adapt" (gratuite) et traduire chaque champ.
 */
export default async function PressePage() {
    const [pageData, items] = await Promise.all([
        getPressPage('fr'),
        getPressItems('fr'),
    ]);

    const initialPage = pageData ?? FALLBACK_PAGE;
    const initialItems = items || [];

    return <PresseContent initialPage={initialPage} initialItems={initialItems} />;
}
