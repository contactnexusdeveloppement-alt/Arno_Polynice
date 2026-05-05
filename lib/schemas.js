/**
 * Helpers Schema.org réutilisables (JSON-LD).
 *
 * Centralisation pour :
 *   1) garantir la cohérence des @id à travers tout le site (graphe entité unique)
 *   2) éviter les duplications (5 pages catégorie auraient sinon le même boilerplate)
 *   3) faciliter la maintenance future (un seul endroit à mettre à jour)
 *
 * Convention @id (graphe Schema.org) :
 *   - Organization      : <SITE_URL>/#organization
 *   - WebSite           : <SITE_URL>/#website
 *   - Person (Adelson)  : <SITE_URL>/#adelson-paugain
 *   - Page schemas      : <SITE_URL>/<slug>#<type>  (ex: /femme#collection)
 */

export const SITE_URL = 'https://www.arno-polynice.com';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/#adelson-paugain`;

/**
 * CollectionPage — pages catégorie (femme, homme, unisexe, accessoires, boutique).
 */
export function getCollectionPageSchema({ slug, name, description }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/${slug}#collection`,
        name,
        description,
        url: `${SITE_URL}/${slug}`,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        inLanguage: 'fr-FR',
    };
}

/**
 * BreadcrumbList — fil d'Ariane.
 * @param items - liste { name, url } dans l'ordre (Accueil en premier)
 */
export function getBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * AboutPage — pages "À propos" (notre-histoire, notre-ethique).
 * aboutEntity = ID de l'entité que la page décrit (par défaut Organization,
 * mais peut être PERSON_ID pour notre-histoire qui parle d'Adelson).
 */
export function getAboutPageSchema({ slug, name, description, aboutEntity = ORG_ID }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/${slug}#page`,
        name,
        description,
        url: `${SITE_URL}/${slug}`,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': aboutEntity },
        inLanguage: 'fr-FR',
    };
}

/**
 * Person — Adelson Paugain (créateur de la marque).
 * À utiliser sur /notre-histoire pour signaler explicitement l'entité auteur
 * et alimenter le Knowledge Graph (Person → worksFor → Organization).
 */
export function getPersonSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Adelson Paugain',
        alternateName: 'Arno Polynice',
        jobTitle: 'Créateur de mode',
        description: "Étudiant-entrepreneur de 21 ans né en Haïti, élevé dans les Vosges, fondateur de la marque de mode artisanale Arno Polynice à Épinal.",
        nationality: { '@type': 'Country', name: 'France' },
        birthPlace: { '@type': 'Country', name: 'Haiti' },
        worksFor: { '@id': ORG_ID },
        url: `${SITE_URL}/notre-histoire`,
        sameAs: [
            'https://www.instagram.com/arnopolynice/',
            'https://www.tiktok.com/@arnopolynice',
            'https://www.youtube.com/@Arno.Polynice',
        ],
    };
}

/**
 * ContactPage — page de contact avec mainEntity → Organization.
 */
export function getContactPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact#page`,
        name: 'Contact — Arno Polynice',
        description: "Contact pour commandes, créations sur mesure, collaborations et demandes presse. Atelier basé à Épinal dans les Vosges.",
        url: `${SITE_URL}/contact`,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': ORG_ID },
        inLanguage: ['fr-FR', 'en-US', 'es-ES'],
    };
}

/**
 * Service — page de service (ex. /sur-mesure pour le sur mesure à Épinal).
 * Renforce le SEO local pour les requêtes service-based ("vêtement sur mesure
 * Vosges"). provider pointe sur l'@id Organization (graphe cohérent), areaServed
 * sur la zone géographique cible.
 */
export function getServiceSchema({ slug, name, description, serviceType }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE_URL}/${slug}#service`,
        name,
        description,
        serviceType,
        provider: { '@id': ORG_ID },
        areaServed: [
            { '@type': 'AdministrativeArea', name: 'Vosges' },
            { '@type': 'AdministrativeArea', name: 'Grand Est' },
            { '@type': 'Country', name: 'France' },
        ],
        url: `${SITE_URL}/${slug}`,
        availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: `${SITE_URL}/contact`,
            servicePostalAddress: {
                '@type': 'PostalAddress',
                streetAddress: '68 rue André Vitu',
                postalCode: '88000',
                addressLocality: 'Épinal',
                addressCountry: 'FR',
            },
        },
    };
}

/**
 * ItemList of NewsArticle — page Presse.
 * Indexe les parutions presse comme entités structurées (rich results).
 * Retourne null si la liste est vide (évite d'injecter un schema vide).
 */
export function getPressItemListSchema(items) {
    if (!items || items.length === 0) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Arno Polynice dans les médias',
        url: `${SITE_URL}/presse`,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'NewsArticle',
                headline: item.title,
                description: item.excerpt || item.title,
                url: item.url || `${SITE_URL}/presse`,
                ...(item.publishDate ? { datePublished: item.publishDate } : {}),
                publisher: {
                    '@type': 'Organization',
                    name: item.mediaName || 'Media',
                },
                about: { '@id': ORG_ID },
                ...(item.mainImage?.url ? { image: item.mainImage.url } : {}),
            },
        })),
    };
}

/**
 * Helper raccourci pour injecter un schema dans une page server :
 *   <JsonLd schema={getXxxSchema(...)} />
 *
 * Évite la répétition du <script type="application/ld+json" .../>
 * Note : à utiliser uniquement dans des Server Components.
 */
export function jsonLdScriptProps(schema) {
    return {
        type: 'application/ld+json',
        dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
    };
}
