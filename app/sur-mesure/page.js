import SurMesureContent from './SurMesureContent';
import {
    SITE_URL,
    getServiceSchema,
    getBreadcrumbSchema,
    jsonLdScriptProps,
} from '@/lib/schemas';

/**
 * Page service : "Vêtements sur mesure à Épinal".
 *
 * Cible SEO local :
 *   - Mots-clés : vêtement sur mesure Épinal, sur mesure Vosges, créateur sur
 *     mesure, couture sur mesure
 *   - Schema.org Service avec areaServed Vosges/Grand Est/France
 *
 * Architecture : server wrapper pour metadata + JSON-LD, délégation au client
 * SurMesureContent pour le rendu i18n via useLanguage().
 */
export const metadata = {
    title: 'Vêtements Sur Mesure à Épinal — Arno Polynice',
    description: 'Création de vêtements sur mesure à Épinal dans les Vosges. Conception personnalisée, prise de mesures, choix des matières et confection artisanale par Arno Polynice. Sur rendez-vous.',
    keywords: [
        'vêtement sur mesure Épinal', 'sur mesure Vosges',
        'couture sur mesure Vosges', 'tailleur Épinal',
        'création sur mesure', 'confection personnalisée',
        'vêtement personnalisé Épinal', 'sur mesure Lorraine',
    ],
    alternates: { canonical: `${SITE_URL}/sur-mesure` },
};

const serviceSchema = getServiceSchema({
    slug: 'sur-mesure',
    name: 'Vêtements sur mesure à Épinal',
    description: 'Création de vêtements sur mesure par Arno Polynice à Épinal dans les Vosges. Conception personnalisée, prise de mesures précise, choix des matières nobles et confection artisanale.',
    serviceType: 'Confection sur mesure',
});

const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Sur Mesure', url: `${SITE_URL}/sur-mesure` },
]);

export default function SurMesurePage() {
    return (
        <>
            <script {...jsonLdScriptProps(serviceSchema)} />
            <script {...jsonLdScriptProps(breadcrumbSchema)} />
            <SurMesureContent />
        </>
    );
}
