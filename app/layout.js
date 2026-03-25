import './globals.css';
import { CartProvider } from '@/context/CartContext';
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arno Polynice — Créateur de Mode',
    description: 'Vêtements artisanaux confectionnés en France. Luxe abordable et streetwear par un jeune créateur des Vosges.',
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
  alternates: {
    canonical: 'https://www.arno-polynice.com',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Arno Polynice',
              url: 'https://www.arno-polynice.com',
              description: 'Créateur de mode indépendant, confection artisanale française. Luxe abordable et streetwear.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Épinal',
                addressRegion: 'Vosges',
                addressCountry: 'FR',
              },
              sameAs: [
                'https://www.instagram.com/arno.polynice.__',
                'https://www.tiktok.com/@arnopolynice',
                'https://www.facebook.com/Arno.Polynice',
                'https://www.youtube.com/@AdelsonPaugain',
              ],
            }),
          }}
        />
        <div className="dev-banner">
          {'SITE EN DÉVELOPPEMENT   •   '.repeat(50)}
        </div>
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
      </body>
    </html>
  );
}
