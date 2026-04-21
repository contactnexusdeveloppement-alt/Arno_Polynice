import NotreHistoireContent from './NotreHistoireContent';

export const metadata = {
    title: 'Notre Histoire — Arno Polynice',
    description: 'De Haïti aux Vosges : découvrez l\'histoire d\'Arno Polynice, marque indépendante de vêtements unisexes conçus et fabriqués en France.',
    alternates: { canonical: 'https://www.arno-polynice.com/notre-histoire' },
};

export default function NotreHistoirePage() {
    // Server wrapper : conserve l'export metadata + rendu statique pour le SEO.
    // Le contenu est rendu par NotreHistoireContent (client) pour supporter i18n via useLanguage().
    return <NotreHistoireContent />;
}
