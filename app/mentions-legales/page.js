import styles from '../legal.module.css';

export const metadata = {
    title: 'Mentions Légales — Arno Polynice',
    description: 'Mentions légales du site Arno Polynice.',
};

export default function MentionsLegalesPage() {
    return (
        <div className="page-enter">
            <section className={styles.legalPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Mentions Légales</h1>
                    <p className={styles.lastUpdate}>Dernière mise à jour : avril 2026</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Éditeur du Site</h2>
                        <p className={styles.text}>
                            Le site <strong>www.arno-polynice.com</strong> est édité par :
                        </p>
                        <ul className={styles.list}>
                            <li>Raison sociale : <strong>PAUGAIN ADELSON</strong> (nom commercial : Arno Polynice)</li>
                            <li>Forme juridique : Entrepreneur individuel — Micro-entreprise</li>
                            <li>Responsable de la publication : <strong>Adelson Paugain</strong></li>
                            <li>Adresse du siège : 68 rue André Vitu, 88000 Épinal, France</li>
                            <li>SIREN : <strong>103 064 036</strong></li>
                            <li>SIRET : <strong>103 064 036 00017</strong></li>
                            <li>Code APE / NAF : 14.13Z (Fabrication de vêtements de dessus)</li>
                            <li>Activité : Fabrication et vente de vêtements et accessoires</li>
                            <li>Inscription au Registre National des Entreprises (RNE)</li>
                            <li>Email : <a href="mailto:arnopolynice@gmail.com">arnopolynice@gmail.com</a></li>
                            <li>TVA : Non assujetti à la TVA (Article 293B du CGI — franchise en base)</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Hébergement</h2>
                        <p className={styles.text}>
                            Le site est hébergé par :
                        </p>
                        <ul className={styles.list}>
                            <li>Vercel Inc.</li>
                            <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
                            <li>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
                        </ul>
                        <p className={styles.text}>
                            La plateforme e-commerce est assurée par Shopify Inc., 151 O'Connor Street, Ottawa, Ontario, Canada.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Propriété Intellectuelle</h2>
                        <p className={styles.text}>
                            L'ensemble du contenu de ce site (textes, images, visuels, logo, marques, photographies,
                            vidéos, etc.) est la propriété exclusive d'Arno Polynice ou de ses partenaires et est protégé
                            par les lois françaises et internationales relatives à la propriété intellectuelle.
                        </p>
                        <p className={styles.text}>
                            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie
                            des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans
                            l'autorisation écrite préalable d'Arno Polynice.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Responsabilité</h2>
                        <p className={styles.text}>
                            Arno Polynice s'efforce d'assurer l'exactitude et la mise à jour des informations
                            diffusées sur ce site. Toutefois, Arno Polynice ne peut garantir l'exactitude, la précision
                            ou l'exhaustivité des informations mises à disposition sur ce site.
                        </p>
                        <p className={styles.text}>
                            En conséquence, Arno Polynice décline toute responsabilité pour toute imprécision,
                            inexactitude ou omission portant sur des informations disponibles sur ce site.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Cookies et Mesure d'Audience</h2>
                        <p className={styles.text}>
                            Le site utilise uniquement des cookies strictement nécessaires à son bon fonctionnement
                            (panier, session). La mesure d'audience est assurée par Vercel Analytics, une solution
                            respectueuse de la vie privée qui ne dépose aucun cookie et ne collecte aucune donnée
                            personnelle identifiable. Pour plus d'informations, consultez notre{' '}
                            <a href="/politique-de-confidentialite">Politique de Confidentialité</a>.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Droit Applicable</h2>
                        <p className={styles.text}>
                            Les présentes mentions légales sont régies par le droit français. En cas de litige,
                            les tribunaux français seront seuls compétents.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
