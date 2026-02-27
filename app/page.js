import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import styles from './page.module.css';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

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
            <div className={styles.heroImg} style={{ backgroundColor: '#D4C5B2' }}>
              <span className={styles.heroImgText}>A</span>
            </div>
            <div className={styles.heroImg} style={{ backgroundColor: '#2C3E50' }}>
              <span className={styles.heroImgText}>P</span>
            </div>
            <div className={styles.heroImg} style={{ backgroundColor: '#C19A6B' }}>
              <span className={styles.heroImgText}>✦</span>
            </div>
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
            <Link href="/femme" className={styles.catCard}>
              <div className={styles.catImage} style={{ backgroundColor: '#E8DDD0' }}>
                <span className={styles.catImageText}>F</span>
              </div>
              <h3 className={styles.catName}>Femme</h3>
            </Link>
            <Link href="/homme" className={styles.catCard}>
              <div className={styles.catImage} style={{ backgroundColor: '#2C3E50' }}>
                <span className={styles.catImageText}>H</span>
              </div>
              <h3 className={styles.catName}>Homme</h3>
            </Link>
            <Link href="/unisexe" className={styles.catCard}>
              <div className={styles.catImage} style={{ backgroundColor: '#C67B5C' }}>
                <span className={styles.catImageText}>U</span>
              </div>
              <h3 className={styles.catName}>Unisexe</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
