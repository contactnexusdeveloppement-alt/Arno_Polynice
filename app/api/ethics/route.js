import { getEthicsPage, getEthicsValues } from '@/lib/shopify';
import { NextResponse } from 'next/server';
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

const localesByLang = { fr, en, es };

/**
 * Construit un fallback à partir des locales (utilisé uniquement si Shopify
 * renvoie null/empty pour la langue demandée — cas où Adelson n'a pas encore
 * traduit le contenu via Translate & Adapt).
 */
function buildLocaleFallback(language) {
    const locale = localesByLang[language] || localesByLang.fr;
    const e = locale.ethics;
    return {
        page: {
            label: e.label,
            title: e.title,
            intro: e.intro,
            quoteText: e.quoteText,
            quoteAuthor: e.quoteAuthor,
        },
        values: [
            { position: 1, number: '01', title: e.value1Title, text: e.value1Text },
            { position: 2, number: '02', title: e.value2Title, text: e.value2Text },
            { position: 3, number: '03', title: e.value3Title, text: e.value3Text },
            { position: 4, number: '04', title: e.value4Title, text: e.value4Text },
        ],
    };
}

/**
 * GET /api/ethics?lang=en (ou es, fr)
 *
 * Retourne le contenu Shopify metaobjects (ethics_page + ethics_value) dans
 * la langue demandée via @inContext. Appelé par EthicsContent (client) quand
 * l'utilisateur switche en EN ou ES.
 *
 * Cascade de sources :
 *   1. Shopify metaobjects @inContext(language: X) — Adelson via Translate & Adapt
 *   2. Locales JSON (ethics.*) — fallback si Shopify renvoie vide
 *   3. Locales FR — fallback ultime si la langue demandée n'existe pas
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang') || 'fr';

    try {
        const [page, values] = await Promise.all([
            getEthicsPage(language),
            getEthicsValues(language),
        ]);

        const fallback = buildLocaleFallback(language);
        return NextResponse.json({
            page: page ?? fallback.page,
            values: values?.length > 0 ? values : fallback.values,
        });
    } catch (error) {
        console.error('[API /ethics] Error:', error);
        // Erreur Shopify : on retourne quand même un contenu via les locales
        return NextResponse.json(buildLocaleFallback(language));
    }
}
