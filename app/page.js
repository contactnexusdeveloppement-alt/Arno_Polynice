import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { getHomepageHeroImages, getCategoryImages } from '@/lib/shopify';
import styles from './page.module.css';

// Hero fallback colors when no Shopify image is available
const heroFallbacks = [
  { bg: '#D4C5B2', text: 'A' },
  { bg: '#2C3E50', text: 'P' },
  { bg: '#C19A6B', text: '✦' },
];

const categoryFallbacks = {
  femme: { bg: '#E8DDD0', text: 'F' },
  homme: { bg: '#2C3E50', text: 'H' },
  unisexe: { bg: '#C67B5C', text: 'U' },
};

export default async function Home() {
  const [featuredProducts, heroImages, categoryImages] = await Promise.all([
    getFeaturedProducts(),
    getHomepageHeroImages('en-vedette', 3).catch(() => []),
    getCategoryImages().catch(() => ({})),
  ]);

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span>La Mode</span>
            <span>Artisanale</span>
            <span>Française</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Chaque pièce est unique, confectionnée avec passion et savoir-faire.
          </p>
          <div className={styles.heroCta}>
            <Link href="/femme" className="btn btn--primary">Découvrir</Link>
            <Link href="/notre-histoire" className="btn btn--secondary">Notre histoire</Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImageGrid}>
            {[0, 1, 2].map((i) => {
              const heroItem = heroImages[i];
              const fallback = heroFallbacks[i];

              return heroItem?.imageUrl ? (
                <Link key={i} href={`/produit/${heroItem.handle}`} className={styles.heroImg}>
                  <Image
                    src={heroItem.imageUrl}
                    alt={heroItem.altText}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              ) : (
                <div key={i} className={styles.heroImg} style={{ backgroundColor: fallback.bg }}>
                  <span className={styles.heroImgText}>{fallback.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className={styles.marqueeItem}>
              Confection artisanale  ✦  Fait en France  ✦  Sur mesure  ✦
            </span>
          ))}
        </div>
      </div>

      {/* Featured Products — NO PRICES */}
      <section className={`section ${styles.featured}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Nos Créations</h2>
            <p className={styles.sectionSubtitle}>
              Des pièces pensées pour transcender les tendances
            </p>
          </div>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} showPrice={false} />
            ))}
          </div>
          <div className={styles.sectionCta}>
            <Link href="/femme" className="btn btn--secondary">Voir toute la collection</Link>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className={styles.vision}>
        <div className={styles.visionInner}>
          <div className={styles.visionImage} style={{ backgroundColor: '#3D4F5F' }}>
            <span className={styles.visionImageText}>AP</span>
          </div>
          <div className={styles.visionContent}>
            <span className={styles.visionLabel}>Notre vision</span>
            <h2 className={styles.visionTitle}>L'Élégance dans sa Forme la Plus Pure</h2>
            <p className={styles.visionText}>
              Chez Arno Polynice, chaque vêtement raconte une histoire. Nous croyons en une mode
              responsable, artisanale, qui célèbre le travail de la main et le choix des matières nobles.
              Loin de la fast fashion, nos créations sont pensées pour durer et accompagner ceux qui
              les portent dans leur expression personnelle.
            </p>
            <Link href="/notre-ethique" className="btn btn--secondary btn--small">
              Découvrir notre éthique
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`section ${styles.categories}`}>
        <div className="container">
          <div className={styles.catGrid}>
            {['femme', 'homme', 'unisexe'].map((cat) => {
              const imgUrl = categoryImages[cat];
              const fallback = categoryFallbacks[cat];

              return (
                <Link key={cat} href={`/${cat}`} className={styles.catCard}>
                  <div className={styles.catImage} style={!imgUrl ? { backgroundColor: fallback.bg } : undefined}>
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={`Collection ${cat}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <span className={styles.catImageText}>{fallback.text}</span>
                    )}
                  </div>
                  <h3 className={styles.catName}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
