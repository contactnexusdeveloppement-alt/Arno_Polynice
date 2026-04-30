import './globals.css';
import { Barlow_Condensed, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import PageLoader from '@/components/PageLoader';
import { ORG_ID, WEBSITE_ID, PERSON_ID, SITE_URL } from '@/lib/schemas';

const barlowCondensed = Barlow_Condensed({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-barlow-condensed',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Arno Polynice — Mode Artisanale Vosges & Épinal',
        template: '%s | Arno Polynice',
    },
    description: 'Créateur de mode artisanale française basé à Épinal, dans les Vosges. Vêtements sur mesure et prêt-à-porter unisexe confectionnés à la main. Femme, homme, accessoires.',
    keywords: [
        'Arno Polynice',
        'créateur mode Vosges', 'créateur mode Épinal',
        'mode Vosges', 'mode Épinal',
        'vêtement sur mesure Vosges', 'vêtement sur mesure Épinal',
        'boutique mode Épinal',
        'mode artisanale française', 'made in Vosges', 'made in France',
        'créateur français', 'jeune créateur français',
        'mode femme Épinal', 'mode homme Épinal', 'mode unisexe',
        'streetwear artisanal', 'luxe abordable', 'fait main France',
        'mode éthique', 'mode responsable', 'artisan spinalien',
        'broderie Lunéville', 'confection française',
    ],
    authors: [{ name: 'Adelson Paugain', url: SITE_URL }],
    creator: 'Adelson Paugain',
    publisher: 'Arno Polynice',
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: SITE_URL,
        siteName: 'Arno Polynice',
        title: 'Arno Polynice — Mode Artisanale Vosges & Épinal',
        description: 'Créateur de mode artisanale française à Épinal. Vêtements sur mesure et prêt-à-porter Made in France.',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Arno Polynice — Créateur de Mode' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Arno Polynice — Créateur de Mode Vosges',
        description: 'Vêtements artisanaux confectionnés à Épinal. Sur mesure et prêt-à-porter Made in France.',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: '6LAxHGBzD8D8sv7Ysi3oL96bjojLHagXPp0UG-P0H7Q',
    },
    alternates: {
        canonical: SITE_URL,
    },
    icons: {
        icon: '/icon.svg',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    // viewport-fit=cover : indispensable pour que `env(safe-area-inset-*)`
    // retourne autre chose que 0 sur iOS Safari (notch + home indicator).
    viewportFit: 'cover',
};

/**
 * Schema.org : Organization + Store (combiné via array de @type).
 * Inclut maintenant : geo coordinates, areaServed, knowsAbout, knowsLanguage,
 * founder enrichi avec @id Person, hasMap. Ces champs renforcent les signaux
 * pour le SEO local (Knowledge Graph + Local Pack Vosges/Épinal).
 */
const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Store'],
    '@id': ORG_ID,
    name: 'Arno Polynice',
    legalName: 'PAUGAIN ADELSON',
    url: SITE_URL,
    logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
        width: 512,
        height: 512,
    },
    image: `${SITE_URL}/og-image.png`,
    email: 'arnopolynice@gmail.com',
    taxID: '10306403600017',
    description: 'Créateur de mode indépendant basé à Épinal dans les Vosges. Confection artisanale française, vêtements sur mesure et prêt-à-porter unisexe. Made in France.',
    foundingDate: '2024',
    founder: {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Adelson Paugain',
        jobTitle: 'Créateur de mode',
    },
    address: {
        '@type': 'PostalAddress',
        streetAddress: '68 rue André Vitu',
        postalCode: '88000',
        addressLocality: 'Épinal',
        addressRegion: 'Vosges',
        addressCountry: 'FR',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 48.1745,
        longitude: 6.4496,
    },
    areaServed: [
        { '@type': 'AdministrativeArea', name: 'Vosges' },
        { '@type': 'AdministrativeArea', name: 'Grand Est' },
        { '@type': 'Country', name: 'France' },
        { '@type': 'Country', name: 'Belgium' },
        { '@type': 'Country', name: 'Switzerland' },
    ],
    knowsLanguage: ['fr', 'en', 'es'],
    knowsAbout: [
        'mode artisanale',
        'vêtements sur mesure',
        'confection française',
        'streetwear',
        'mode éthique',
        'broderie point de Lunéville',
    ],
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Credit Card, PayPal',
    hasMap: 'https://maps.google.com/?q=68+rue+Andr%C3%A9+Vitu,+88000+%C3%89pinal,+France',
    sameAs: [
        'https://www.instagram.com/arnopolynice/',
        'https://www.tiktok.com/@arnopolynice',
        'https://www.youtube.com/@Arno.Polynice',
    ],
};

/**
 * Schema.org : WebSite. publisher pointe sur l'@id Organization (cohérence graphe).
 */
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Arno Polynice',
    url: SITE_URL,
    description: 'Créateur de mode artisanale française à Épinal, Vosges. Collections femme, homme, unisexe et accessoires sur mesure.',
    inLanguage: ['fr-FR', 'en-US', 'es-ES'],
    publisher: { '@id': ORG_ID },
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr" className={`${barlowCondensed.variable} ${inter.variable}`}>
            <body>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
                <LanguageProvider>
                    <CartProvider>
                        <PageLoader />
                        <Header />
                        <main style={{ paddingTop: 'var(--nav-height)' }}>
                            {children}
                        </main>
                        <Footer />
                        <CartDrawer />
                    </CartProvider>
                </LanguageProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
