import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
    title: 'Notre Histoire — Arno Polynice',
    description: 'De Haïti aux Vosges : découvrez l\'histoire d\'Arno Polynice, marque indépendante de vêtements unisexes conçus et fabriqués en France.',
    alternates: { canonical: 'https://www.arno-polynice.com/notre-histoire' },
};

export default function NotreHistoirePage() {
    return (
        <div className="page-enter">
            <section className={styles.storyPage}>
                {/* Hero — Mon histoire */}
                <div className={styles.storyHero}>
                    <div className={styles.storyHeroImage}>
                        <Image
                            src="/images/histoire/mon-histoire.jpg"
                            alt="Adelson Paugain, fondateur d'Arno Polynice"
                            width={3446}
                            height={4307}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                            className={styles.heroImg}
                        />
                    </div>
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

                {/* Content Blocks */}
                <div className={styles.content}>
                    {/* Section 2 — Nos produits */}
                    <div className={styles.section}>
                        <div className={styles.sectionImage}>
                            <Image
                                src="/images/histoire/nos-produits.jpg"
                                alt="Collection Arno Polynice — shooting en plein air"
                                width={4000}
                                height={6000}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={styles.sectionImg}
                            />
                        </div>
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
                    </div>

                    {/* Section 3 — Notre ADN */}
                    <div className={styles.section}>
                        <div className={styles.sectionImage}>
                            <Image
                                src="/images/histoire/notre-adn.jpg"
                                alt="Détail d'une veste Arno Polynice avec rivets dorés — atelier"
                                width={6000}
                                height={4000}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={styles.sectionImg}
                            />
                        </div>
                        <div className={styles.sectionContent}>
                            <span className={styles.sectionLabel}>Notre univers</span>
                            <h2 className={styles.sectionTitle}>Notre ADN</h2>
                            <p className={styles.sectionQuote}>
                                Quand chaque vêtement est une identité.
                            </p>
                            <p className={styles.sectionText}>
                                Chez Arno Polynice, chaque pièce est bien plus qu'un vêtement ! Chacune
                                raconte une histoire, traduit une vision, exprime une façon de penser.
                            </p>
                            <p className={styles.sectionText}>
                                Loin des tendances éphémères, nos créations explorent des univers où
                                l'individu est libre, la matière vivante, et la coupe un langage.
                            </p>
                            <p className={styles.sectionText}>
                                Urbain, brut et poétique, notre univers est multiple mais notre message
                                est clair : porter Arno Polynice, c'est incarner une identité forte.
                            </p>
                        </div>
                    </div>

                    {/* Section 4 — Nos collaborations */}
                    <div className={styles.section}>
                        <div className={styles.sectionImage}>
                            <Image
                                src="/images/histoire/collaboration.jpg"
                                alt="Meloofchrist en concert portant une veste Arno Polynice"
                                width={2672}
                                height={2672}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={styles.sectionImg}
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

                    {/* Section 5 — L'élégance à la provençale */}
                    <div className={styles.section}>
                        <div className={styles.sectionImage}>
                            <Image
                                src="/images/histoire/elegance-provencale.jpg"
                                alt="Shooting bord de mer — ensembles Arno Polynice"
                                width={3424}
                                height={4280}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={styles.sectionImg}
                            />
                        </div>
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
                    </div>

                    {/* Section 6 — Ensembles à plis */}
                    <div className={styles.section}>
                        <div className={styles.sectionImage}>
                            <Image
                                src="/images/histoire/ensembles-plis.jpg"
                                alt="Veste Arno Polynice avec croix — détail dos"
                                width={4000}
                                height={3999}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={styles.sectionImg}
                            />
                        </div>
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
                </div>
            </section>
        </div>
    );
}
