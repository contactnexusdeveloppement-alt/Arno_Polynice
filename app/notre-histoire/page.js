import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
    title: 'Notre Histoire — Arno Polynice',
    description: 'De Haïti aux Vosges : découvrez l\'histoire d\'Arno Polynice, marque indépendante de vêtements unisexes conçus et fabriqués en France.',
    alternates: { canonical: 'https://www.arno-polynice.com/notre-histoire' },
};

function HistoryImage({ src, alt, className = '', priority = false, sizes, position = 'center', aspect }) {
    // Si aspect fourni (ex "3 / 4"), on force la cellule à ce ratio
    const wrapperStyle = aspect ? { aspectRatio: aspect } : undefined;
    const wrapperClass = aspect
        ? `${styles.imageWrapper} ${styles.aspectFixed} ${className}`
        : `${styles.imageWrapper} ${className}`;
    return (
        <div className={wrapperClass} style={wrapperStyle}>
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className={styles.coverImage}
                style={{ objectPosition: position }}
            />
        </div>
    );
}

function Placeholder({ className = '' }) {
    return (
        <div
            className={`${styles.placeholder} ${className}`}
            role="img"
            aria-label="Photo à venir"
        >
            <span className={styles.placeholderMonogram} aria-hidden="true">AP</span>
        </div>
    );
}

export default function NotreHistoirePage() {
    return (
        <div className="page-enter">
            <section className={styles.storyPage}>
                {/* Section 1 — Mon histoire (photo gauche / texte droite) */}
                <div className={styles.storyHero}>
                    {/* Titre + label affiché uniquement en mobile (avant la photo) */}
                    <div className={styles.storyHeroMobileTitle} aria-hidden="true">
                        <span className={styles.label}>A propos de la marque</span>
                        <h1 className={styles.title}>Mon Histoire</h1>
                    </div>
                    <HistoryImage
                        src="/images/histoire/01-hero.webp"
                        alt="Adelson Paugain, fondateur d'Arno Polynice"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        aspect="3 / 4"
                    />
                    <div className={styles.storyHeroContent}>
                        <span className={styles.label}>A propos de la marque</span>
                        <h1 className={styles.title}>Mon Histoire</h1>
                        <p className={styles.heroText}>
                            Le nom Arno Polynice n'a pas été choisi au hasard. Né à Haïti et adopté,
                            avec mon frère Wilguens, par une famille vosgienne à l'âge d'un an, j'ai
                            grandi entre deux cultures. Mon prénom français, Arno, et mon nom haïtien,
                            Polynice, symbolisent cette double identité qui m'accompagne et m'inspire
                            au quotidien.
                        </p>
                        <p className={styles.heroText}>
                            En créant ma marque, j'ai voulu lui donner un nom qui raconte cette
                            histoire personnelle, faite de contrastes, de racines et de fiertés.
                        </p>
                    </div>
                </div>

                <div className={styles.content}>
                    {/* Section 2 — Nos Produits (texte gauche / grille 3 photos droite) */}
                    <div className={`${styles.section} ${styles.sectionReverse}`}>
                        <div className={styles.sectionContent}>
                            <h2 className={styles.sectionTitle}>Nos Produits</h2>
                            <p className={styles.sectionText}>
                                Fondée en 2024, Arno Polynice est une marque indépendante de vêtements
                                unisexes, conçus et fabriqués en France. Chaque pièce est pensée comme une
                                alliance entre simplicité, modernité et authenticité. Le style se veut à la
                                fois chic, décontracté et streetwear, idéal pour celles et ceux qui veulent
                                affirmer leur style sans renoncer au confort.
                            </p>
                            <p className={styles.sectionText}>
                                Chaque création est unique, façonnée avec soin et passion, pour offrir des
                                vêtements du quotidien qui ont une vraie personnalité.
                            </p>
                        </div>
                        <div className={`${styles.imageGridStacked} ${styles.imageGridStackedTall}`}>
                            <HistoryImage
                                src="/images/histoire/02-haut.webp"
                                alt="Trois mannequins en tenue Arno Polynice avec shorts"
                                className={styles.gridTop}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <HistoryImage
                                src="/images/histoire/02-bg.webp"
                                alt="Mannequin Mady en ensemble bleu Arno Polynice"
                                className={styles.gridBottomLeft}
                                sizes="(max-width: 768px) 50vw, 25vw"
                                aspect="1 / 1"
                            />
                            <HistoryImage
                                src="/images/histoire/02-bd.webp"
                                alt="Mannequin Arno Polynice — détail tenue"
                                className={styles.gridBottomRight}
                                sizes="(max-width: 768px) 50vw, 25vw"
                                aspect="1 / 1"
                            />
                        </div>
                    </div>

                    {/* Section 3 — Notre ADN (photo gauche / texte droite) */}
                    <div className={`${styles.section} ${styles.sectionPhotoFull}`}>
                        <HistoryImage
                            src="/images/histoire/03-adn.webp"
                            alt="Détail d'un ensemble Arno Polynice bleu et gris"
                            className={styles.sectionImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            aspect="3 / 4"
                        />
                        <div className={styles.sectionContent}>
                            <span className={styles.sectionLabel}>Ensembles à plis</span>
                            <h2 className={styles.sectionTitle}>Nouvelle Collection, Nouvelle Énergie</h2>
                            <p className={styles.sectionQuote}>
                                Une allure solaire, entre caractère et élégance.
                            </p>
                            <p className={styles.sectionText}>
                                Shooté sous le soleil du Sud, cet ensemble incarne une vision moderne
                                du vestiaire contemporain. Le blouson court au design structuré, avec zip
                                central, col chemise et plis verticaux en raccord avec le pantalon. Les
                                finitions sont sobres et chics par le biais de rivets métalliques discrets.
                            </p>
                            <p className={styles.sectionText}>
                                La silhouette à la fois ample, moderne et épurée est un style à mi-chemin
                                entre workwear et minimalisme chic. Le pantalon à pinces possède des rivets
                                au niveau des pinces devant. Les poches sont insérées dans les coutures
                                côtés. La coupe ajustée à la taille et à la fois oversize permet d'obtenir
                                un maximum de volume, d'aisance et de confort.
                            </p>
                            <p className={styles.sectionText}>
                                Ces ensembles sont réalisés dans un sergé de laine bleu marine et dans
                                un sergé de coton gris foncé.
                            </p>
                        </div>
                    </div>

                    {/* Section 4 — Légèreté Estivale (texte gauche / grille 3 photos droite) */}
                    <div className={`${styles.section} ${styles.sectionReverse}`}>
                        <div className={styles.sectionContent}>
                            <span className={styles.sectionLabel}>Pièce unique</span>
                            <h2 className={styles.sectionTitle}>L'Éclat du Soir</h2>
                            <p className={styles.sectionQuote}>
                                Quand l'ombre devient lumière.
                            </p>
                            <p className={styles.sectionText}>
                                Il existe des vêtements que l'on porte, et d'autres que l'on habite.
                                Cet ensemble est de ceux-là.
                            </p>
                            <p className={styles.sectionText}>
                                Dans un anthracite profond aux reflets discrets, la veste épouse le
                                corps avec une autorité douce, tandis que le pantalon large tombe en
                                colonnes parfaites — une silhouette à la fois rigoureuse et libre.
                            </p>
                            <p className={styles.sectionText}>
                                Mais ce qui arrête le regard, c'est la broderie. Des rivières de
                                cristaux courent et ruissellent sur le tissu en lignes fluides,
                                glissant de la veste jusqu'aux jambes du pantalon comme une
                                constellation mise en mouvement. Chaque point a été posé à la main
                                selon la technique ancestrale du point de Lunéville, ce savoir-faire
                                né en Lorraine au XVIII<sup>e</sup> siècle — une aiguille crochetée,
                                un geste millimétré, une patience infinie, que Marie Torres a su
                                manier à la perfection.
                            </p>
                            <p className={styles.sectionText}>
                                Porter cet ensemble, c'est choisir l'artisanat contre l'éphémère.
                                La main humaine contre la machine.
                            </p>
                            <p className={styles.sectionText}>
                                Elle n'entre pas dans une salle. Elle en devient le centre de gravité.
                            </p>
                            <p className={styles.sectionCaption}>
                                Broderie point de Lunéville, réalisée entièrement à la main par
                                Marie Torres — pièce unique portée par Anais Drion.
                            </p>
                        </div>
                        <div className={styles.imageGridStacked}>
                            <HistoryImage
                                src="/images/histoire/05-bd-v2.webp"
                                alt="Anais Drion portant l'ensemble brodé point de Lunéville"
                                className={styles.gridTop}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <HistoryImage
                                src="/images/histoire/05-bg-v2.webp"
                                alt="Détail de la broderie point de Lunéville sur la tenue d'Anais Drion"
                                className={styles.gridBottomLeft}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <HistoryImage
                                src="/images/histoire/05-haut-v2.webp"
                                alt="Détail de l'ensemble brodé Arno Polynice"
                                className={styles.gridBottomRight}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                    </div>

                    {/* Section 5 — Collaboration Exclusive (grille 3 photos gauche / texte droite) */}
                    <div className={`${styles.section} ${styles.sectionGridFirst}`}>
                        <div className={styles.imageGridSideStack}>
                            <HistoryImage
                                src="/images/histoire/04-main.webp"
                                alt="Meloofchrist en concert portant une veste Arno Polynice"
                                className={styles.gridMain}
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                            <HistoryImage
                                src="/images/histoire/04-hd.webp"
                                alt="Veste Arno Polynice — vue de dos"
                                className={styles.gridSideTop}
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                            <HistoryImage
                                src="/images/histoire/04-bd.webp"
                                alt="Veste Arno Polynice — pose détaillée"
                                className={styles.gridSideBottom}
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                        </div>
                        <div className={styles.sectionContent}>
                            <span className={styles.sectionLabel}>Nos collaborations</span>
                            <h2 className={styles.sectionTitle}>Collaboration Exclusive</h2>
                            <p className={styles.sectionQuote}>
                                Quand l'art et la mode se rencontrent.
                            </p>
                            <p className={styles.sectionText}>
                                Arno Polynice est une marque qui aime le changement ainsi que les
                                collaborations avec des artistes d'autres univers. Ici nous voyons le
                                chanteur Meloofchrist arborer une de nos créations.
                            </p>
                            <p className={styles.sectionText}>
                                Cette veste est 100% pensée pour lui et avec lui. Chaque élément a été
                                choisi pour refléter un maximum la direction artistique ainsi que
                                l'univers de l'artiste tout en la façonnant également à notre image.
                            </p>
                        </div>
                    </div>

                    {/* Section 6 — Nouvelle Collection (texte gauche / photo droite) */}
                    <div className={`${styles.section} ${styles.sectionReverse}`}>
                        <div className={styles.sectionContent}>
                            <span className={styles.sectionLabel}>L'élégance à la provençale</span>
                            <h2 className={styles.sectionTitle}>Légèreté Estivale</h2>
                            <p className={styles.sectionQuote}>
                                Une chemise qui ose la simplicité et le détail.
                            </p>
                            <p className={styles.sectionText}>
                                Cette chemise bicolore réalisée dans un seersucker léger est la chemise
                                idéale pour l'été. Les multiples poches plaquées discrètes incarnent à
                                merveille la simplicité que le créateur a voulu exprimer.
                            </p>
                            <p className={styles.sectionText}>
                                Ses fentes capucins démesurées traduisent une petite touche de folie,
                                contrastant avec l'aspect classique de la tenue.
                            </p>
                        </div>
                        <HistoryImage
                            src="/images/histoire/06-nouvelle.webp"
                            alt="Mannequin portant la nouvelle collection Arno Polynice avec chemise"
                            className={styles.sectionImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            aspect="1 / 1"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
