import styles from '../legal.module.css';

export const metadata = {
    title: 'Politique de Confidentialité — Arno Polynice',
    description: 'Politique de confidentialité et protection des données personnelles du site Arno Polynice.',
};

export default function PolitiqueConfidentialitePage() {
    return (
        <div className="page-enter">
            <section className={styles.legalPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Politique de Confidentialité</h1>
                    <p className={styles.lastUpdate}>Dernière mise à jour : avril 2026</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Responsable du Traitement</h2>
                        <p className={styles.text}>
                            Le responsable du traitement des données personnelles est :
                        </p>
                        <ul className={styles.list}>
                            <li><strong>PAUGAIN ADELSON</strong> (nom commercial : Arno Polynice) — Entrepreneur individuel, micro-entreprise</li>
                            <li>Responsable : Adelson Paugain</li>
                            <li>Adresse : 68 rue André Vitu, 88000 Épinal, France</li>
                            <li>SIRET : 103 064 036 00017</li>
                            <li>Email : <a href="mailto:arnopolynice@gmail.com">arnopolynice@gmail.com</a></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Données Collectées</h2>
                        <p className={styles.text}>
                            Dans le cadre de l'utilisation du site et de la passation de commandes, nous pouvons
                            être amenés à collecter les données suivantes :
                        </p>
                        <ul className={styles.list}>
                            <li>Nom et prénom</li>
                            <li>Adresse email</li>
                            <li>Adresse postale (pour la livraison)</li>
                            <li>Numéro de téléphone (optionnel)</li>
                            <li>Informations de paiement (traitées de manière sécurisée par Shopify Payments)</li>
                            <li>Données de navigation (cookies, adresse IP)</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Finalité du Traitement</h2>
                        <p className={styles.text}>
                            Les données personnelles collectées sont utilisées pour :
                        </p>
                        <ul className={styles.list}>
                            <li>Le traitement et le suivi des commandes</li>
                            <li>La gestion de la relation client</li>
                            <li>L'envoi de la newsletter (avec consentement)</li>
                            <li>L'amélioration de nos services et de l'expérience utilisateur</li>
                            <li>La mesure d'audience anonyme via Vercel Analytics (sans cookies, sans données personnelles)</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Base Légale</h2>
                        <p className={styles.text}>
                            Le traitement de vos données personnelles repose sur :
                        </p>
                        <ul className={styles.list}>
                            <li><strong>L'exécution du contrat</strong> : pour le traitement des commandes</li>
                            <li><strong>Le consentement</strong> : pour l'inscription à la newsletter et les cookies analytiques</li>
                            <li><strong>L'intérêt légitime</strong> : pour l'amélioration de nos services</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Durée de Conservation</h2>
                        <p className={styles.text}>
                            Vos données personnelles sont conservées pendant une durée proportionnée à la finalité
                            pour laquelle elles ont été collectées :
                        </p>
                        <ul className={styles.list}>
                            <li>Données de commande : 5 ans (obligation légale comptable)</li>
                            <li>Données de newsletter : jusqu'à votre désinscription</li>
                            <li>Cookies : 13 mois maximum</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Cookies</h2>
                        <p className={styles.text}>
                            Le site utilise uniquement des <strong>cookies strictement nécessaires</strong> à son
                            fonctionnement (gestion du panier, session de connexion). Aucun cookie publicitaire
                            ni traceur tiers n'est déposé.
                        </p>
                        <p className={styles.text}>
                            La mesure d'audience est assurée par <strong>Vercel Analytics</strong>, une solution
                            respectueuse de la vie privée qui fonctionne <strong>sans cookies</strong> et ne collecte
                            aucune donnée personnelle identifiable (pas d'adresse IP stockée, pas de fingerprinting).
                            Aucun consentement préalable n'est donc requis pour cette mesure d'audience.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Partage des Données</h2>
                        <p className={styles.text}>
                            Vos données personnelles ne sont jamais vendues à des tiers. Elles peuvent être partagées
                            avec les prestataires suivants, strictement nécessaires à l'exécution de nos services :
                        </p>
                        <ul className={styles.list}>
                            <li><strong>Shopify</strong> : plateforme e-commerce et paiement sécurisé</li>
                            <li><strong>Transporteurs</strong> : pour la livraison de vos commandes</li>
                            <li><strong>Vercel</strong> : hébergement du site et mesure d'audience anonyme</li>
                            <li><strong>Resend</strong> : acheminement des emails de contact</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>8. Vos Droits</h2>
                        <p className={styles.text}>
                            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                            Informatique et Libertés, vous disposez des droits suivants :
                        </p>
                        <ul className={styles.list}>
                            <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
                            <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
                            <li><strong>Droit de suppression</strong> : demander l'effacement de vos données</li>
                            <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                            <li><strong>Droit de retrait du consentement</strong> : retirer votre consentement à tout moment</li>
                        </ul>
                        <p className={styles.text}>
                            Pour exercer ces droits, contactez-nous à l'adresse :{' '}
                            <a href="mailto:arnopolynice@gmail.com">arnopolynice@gmail.com</a>.
                        </p>
                        <p className={styles.text}>
                            Si vous estimez que le traitement de vos données n'est pas conforme, vous pouvez adresser
                            une réclamation à la CNIL (Commission Nationale de l'Informatique et des Libertés) :{' '}
                            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>9. Sécurité</h2>
                        <p className={styles.text}>
                            Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires
                            pour garantir la sécurité de vos données personnelles. Les paiements sont sécurisés
                            par cryptage SSL via Shopify Payments. Nous ne stockons aucune donnée bancaire.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>10. Modification de la Politique</h2>
                        <p className={styles.text}>
                            Arno Polynice se réserve le droit de modifier la présente politique de confidentialité
                            à tout moment. Les modifications prennent effet dès leur publication sur le site.
                            Nous vous invitons à consulter régulièrement cette page.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
