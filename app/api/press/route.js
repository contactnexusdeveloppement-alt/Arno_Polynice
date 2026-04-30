import { getPressPage, getPressItems } from '@/lib/shopify';
import { NextResponse } from 'next/server';
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

const localesByLang = { fr, en, es };

/**
 * Construit un fallback header à partir des locales (utilisé uniquement si
 * Shopify renvoie null pour la langue demandée).
 */
function buildPageFallback(language) {
    const locale = localesByLang[language] || localesByLang.fr;
    return {
        label: locale.press.label,
        title: locale.press.title,
        intro: locale.press.intro,
    };
}

/**
 * GET /api/press?lang=en (ou es, fr)
 *
 * Retourne le contenu Shopify metaobjects (press_page + press_item) dans
 * la langue demandée via @inContext. Appelé par PresseContent (client)
 * quand l'utilisateur switche en EN ou ES.
 *
 * Les items eux-mêmes (mediaName, title, excerpt) ne sont PAS dans les
 * locales de fallback — ils viennent uniquement de Shopify (Adelson les
 * gère via metaobjects, et les traduit via Translate & Adapt). Si Shopify
 * est down, items = [] (la page affichera l'état "aucune parution").
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang') || 'fr';

    try {
        const [page, items] = await Promise.all([
            getPressPage(language),
            getPressItems(language),
        ]);

        return NextResponse.json({
            page: page ?? buildPageFallback(language),
            items: items || [],
        });
    } catch (error) {
        console.error('[API /press] Error:', error);
        return NextResponse.json({
            page: buildPageFallback(language),
            items: [],
        });
    }
}
