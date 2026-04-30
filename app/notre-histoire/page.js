import NotreHistoireContent from './NotreHistoireContent';
import {
    SITE_URL,
    PERSON_ID,
    getPersonSchema,
    getAboutPageSchema,
    getBreadcrumbSchema,
    jsonLdScriptProps,
} from '@/lib/schemas';

export const metadata = {
    title: 'Notre Histoire — De Haïti aux Vosges',
    description: 'L\'histoire d\'Adelson Paugain, fondateur d\'Arno Polynice. De Haïti aux Vosges : une marque indépendante de vêtements artisanaux confectionnés à Épinal en France.',
    alternates: { canonical: `${SITE_URL}/notre-histoire` },
};

// Person schema (Adelson) — utilisé pour alimenter le Knowledge Graph
// (signal d'autorité auteur + entité dirigeant de la marque).
const personSchema = getPersonSchema();

// AboutPage schema — la page parle d'Adelson (about → PERSON_ID).
const aboutPageSchema = getAboutPageSchema({
    slug: 'notre-histoire',
    name: 'Notre Histoire — Arno Polynice',
    description: "De Haïti aux Vosges : l'histoire d'Adelson Paugain, fondateur de la marque artisanale Arno Polynice à Épinal.",
    aboutEntity: PERSON_ID,
});

const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Notre Histoire', url: `${SITE_URL}/notre-histoire` },
]);

export default function NotreHistoirePage() {
    return (
        <>
            <script {...jsonLdScriptProps(personSchema)} />
            <script {...jsonLdScriptProps(aboutPageSchema)} />
            <script {...jsonLdScriptProps(breadcrumbSchema)} />
            <NotreHistoireContent />
        </>
    );
}
