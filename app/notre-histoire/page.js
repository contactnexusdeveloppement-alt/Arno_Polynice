import Image from 'next/image';
import { getHistoireImages } from '@/lib/shopify';
import styles from './page.module.css';

export const metadata = {
    title: 'Notre Histoire — Arno Polynice',
    description: 'Découvrez l\'histoire d\'Arno Polynice, créateur de mode indépendant français.',
};

export default async function NotreHistoirePage() {
    const histoireImages = await getHistoireImages().catch(() => []);
    const heroImage = histoireImages.find(img => img.position === 1);
    const contentImage = histoireImages.find(img => img.position === 2);

    return (
        <div className="page-enter">
            <section className={styles.storyPage}>
                {/* Hero */}
                <div className={styles.storyHero}>
                    <div className={styles.storyHeroImage} style={!heroImage?.url ? { backgroundColor: '#2C3E50' } : undefined}>
                        {heroImage?.url ? (
                            <Image
                                src={heroImage.url}
                                alt={heroImage.altText}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <span className={styles.heroLetter}>AP</span>
                        )}
                    </div>
                    <div className={styles.storyHeroContent}>
                        <span className={styles.label}>Notre histoire</span>
                        <h1 className={styles.title}>Né d'une Passion, Porté par une Vision</h1>
                    </div>
                </div>

                {/* Content Blocks */}
                <div className={styles.content}>
                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>Les Origines</h2>
                        <p className={styles.blockText}>
                            Arno Polynice est né d'une conviction profonde : la mode peut être à la fois belle,
                            éthique et accessible. Fondée par un créateur passionné par l'artisanat textile et
                            les savoir-faire traditionnels français, la marque s'est construite autour d'une
                            vision claire — créer des pièces qui transcendent les saisons et les tendances.
                        </p>
                        <p className={styles.blockText}>
                            Chaque collection est le fruit d'un travail minutieux, depuis le choix des matières
                            premières jusqu'à la dernière broderie. Nous collaborons avec des artisans locaux
                            qui partagent notre obsession du détail et notre respect du travail bien fait.
                        </p>
                    </div>

                    <div className={styles.imageBlock} style={!contentImage?.url ? { backgroundColor: '#D4C5B2' } : undefined}>
                        {contentImage?.url ? (
                            <Image
                                src={contentImage.url}
                                alt={contentImage.altText}
                                fill
                                sizes="(max-width: 768px) 100vw, 800px"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <span className={styles.imageLetter}>✦</span>
                        )}
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>Le Savoir-Faire</h2>
                        <p className={styles.blockText}>
                            Notre atelier est le cœur battant de la marque. C'est ici que naissent les idées,
                            que les prototypes prennent forme, que les finitions sont peaufinées. Chaque pièce
                            est confectionnée avec une attention particulière portée aux détails — coutures
                            invisibles, broderies à la main, rivets posés un à un.
                        </p>
                        <p className={styles.blockText}>
                            Nous croyons que le vêtement est bien plus qu'un objet utilitaire. C'est un
                            prolongement de l'identité, un moyen d'expression, une œuvre que l'on porte.
                            C'est pourquoi nous proposons également un service de personnalisation totale,
                            pour ceux qui souhaitent une pièce véritablement unique.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>La Vision</h2>
                        <p className={styles.blockText}>
                            Arno Polynice se situe à la croisée de l'élégance classique et du streetwear
                            contemporain. Notre vocabulaire stylistique emprunte aux codes de la haute couture
                            — structure, précision, noblesse des matières — tout en y insufflant une énergie
                            urbaine et décontractée.
                        </p>
                        <p className={styles.blockText}>
                            Notre ambition est simple : habiller ceux qui refusent de choisir entre style et
                            substance, entre qualité et originalité. Chaque pièce Arno Polynice est une
                            invitation à porter sa différence avec fierté.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
