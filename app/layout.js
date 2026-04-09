import './globals.css';
import { Barlow_Condensed, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CartProvider } from '@/context/CartContext';

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
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import PageLoader from '@/components/PageLoader';

export const metadata = {
  metadataBase: new URL('https://www.arno-polynice.com'),
  title: {
    default: 'Arno Polynice — Créateur de Mode Indépendant | Vosges, France',
    template: '%s | Arno Polynice',
  },
  description: 'Arno Polynice, jeune créateur de mode originaire d\'Épinal dans les Vosges. Découvrez des vêtements artisanaux confectionnés en France, mêlant luxe abordable et streetwear. Collections femme, homme et unisexe.',
  keywords: [
    'Arno Polynice', 'créateur de mode', 'mode artisanale française',
    'vêtements artisanaux', 'créateur Vosges', 'créateur Épinal',
    'artisan spinalien', 'mode indépendante', 'luxe abordable',
    'streetwear artisanal', 'fait main France', 'confection française',
    'mode homme', 'mode femme', 'mode unisexe', 'jeune créateur français',
    'vêtements made in France', 'mode éthique', 'mode responsable',
  ],
  authors: [{ name: 'Arno Polynice' }],
  creator: 'Arno Polynice',
  publisher: 'Arno Polynice',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.arno-polynice.com',
    siteName: 'Arno Polynice',
    title: 'Arno Polynice — Créateur de Mode Indépendant | Vosges',
    description: 'Vêtements artisanaux confectionnés en France. Luxe abordable et streetwear par un jeune créateur des Vosges.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Arno Polynice — Créateur de Mode' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arno Polynice — Créateur de Mode',
    description: 'Vêtements artisanaux confectionnés en France. Luxe abordable et streetwear par un jeune créateur des Vosges.',
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
    canonical: 'https://www.arno-polynice.com',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Arno Polynice',
              url: 'https://www.arno-polynice.com',
              logo: 'https://www.arno-polynice.com/og-image.png',
              description: 'Créateur de mode indépendant, confection artisanale française. Luxe abordable et streetwear.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Épinal',
                addressRegion: 'Vosges',
                addressCountry: 'FR',
              },
              sameAs: [
                'https://www.instagram.com/arnopolynice/',
                'https://www.tiktok.com/@arnopolynice',
                'https://www.youtube.com/@Arno.Polynice',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Arno Polynice',
              url: 'https://www.arno-polynice.com',
              inLanguage: 'fr-FR',
            }),
          }}
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
