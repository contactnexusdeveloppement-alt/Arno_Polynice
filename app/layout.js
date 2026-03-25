import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import PageLoader from '@/components/PageLoader';

export const metadata = {
  title: 'Arno Polynice — Créateur de Mode Indépendant',
  description: 'Découvrez les créations uniques d\'Arno Polynice. Mode artisanale française, confection sur mesure. Vêtements pour femme, homme et unisexe.',
  keywords: 'mode, créateur, indépendant, artisanal, fait main, France, Arno Polynice',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <div className="dev-banner">🚧 Site en développement 🚧</div>
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
