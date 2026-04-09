import styles from '../legal.module.css';

export const metadata = {
    title: 'Conditions Générales de Vente — Arno Polynice',
    description: 'Conditions générales de vente du site Arno Polynice.',
};

export default function CGVPage() {
    return (
        <div className="page-enter">
            <section className={styles.legalPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Conditions Générales de Vente</h1>
                    <p className={styles.lastUpdate}>Dernière mise à jour : avril 2026</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Objet</h2>
                        <p className={styles.text}>
                            Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits
                            effectuées sur le site <strong>www.arno-polynice.com</strong>, édité par{' '}
                            <strong>PAUGAIN ADELSON</strong> (nom commercial : Arno Polynice), entrepreneur individuel
                            en micro-entreprise, domicilié au 68 rue André Vitu, 88000 Épinal, France.
                        </p>
                        <p className={styles.text}>
                            SIRET : 103 064 036 00017 — Code APE : 14.13Z (Fabrication de vêtements de dessus).
                            TVA non applicable, art. 293B du CGI.
                        </p>
                        <p className={styles.text}>
                            Toute commande passée sur le site implique l'acceptation pleine et entière des présentes CGV.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Produits</h2>
                        <p className={styles.text}>
                            Les produits proposés à la vente sont ceux décrits sur le site au moment de la consultation.
                            Les photographies illustrant les produits n'entrent pas dans le champ contractuel. Si des
                            erreurs s'y sont introduites, la responsabilité du vendeur ne saurait être engagée.
                        </p>
                        <p className={styles.text}>
                            Certains produits sont confectionnés sur commande. Dans ce cas, les délais de livraison
                            seront indiqués sur la fiche produit.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Prix</h2>
                        <p className={styles.text}>
                            Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). Arno Polynice n'est pas
                            assujetti à la TVA conformément à l'article 293B du Code Général des Impôts.
                        </p>
                        <p className={styles.text}>
                            Les frais de livraison sont indiqués avant la validation de la commande et s'ajoutent au
                            prix des produits. Arno Polynice se réserve le droit de modifier ses prix à tout moment,
                            les produits étant facturés sur la base des tarifs en vigueur au moment de la commande.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Commande</h2>
                        <p className={styles.text}>
                            Le client sélectionne les produits qu'il souhaite commander et valide sa commande en
                            cliquant sur le bouton de confirmation. Un email de confirmation de commande est envoyé
                            automatiquement à l'adresse email fournie par le client.
                        </p>
                        <p className={styles.text}>
                            Arno Polynice se réserve le droit d'annuler ou de refuser toute commande d'un client
                            avec lequel il existerait un litige.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Paiement</h2>
                        <p className={styles.text}>
                            Le paiement s'effectue par carte bancaire (Visa, Mastercard, American Express) via
                            la plateforme sécurisée Shopify Payments. Le paiement est débité au moment de la
                            validation de la commande.
                        </p>
                        <p className={styles.text}>
                            Les transactions sont sécurisées par un système de cryptage SSL (Secure Socket Layer).
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Livraison</h2>
                        <p className={styles.text}>
                            Les livraisons sont effectuées en France métropolitaine. Les délais de livraison dépendent
                            de la disponibilité du produit :
                        </p>
                        <ul className={styles.list}>
                            <li><strong>Produits en stock</strong> : expédition sous 2 à 5 jours ouvrés</li>
                            <li><strong>Produits sur commande</strong> : le délai est précisé sur la fiche produit</li>
                        </ul>
                        <p className={styles.text}>
                            Les frais de livraison sont calculés en fonction du poids et de la destination de la
                            commande, et sont indiqués au client avant la validation du paiement.
                        </p>
                        <p className={styles.text}>
                            Arno Polynice ne saurait être tenu responsable des retards de livraison imputables au
                            transporteur ou en cas de force majeure.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Droit de Rétractation</h2>
                        <p className={styles.text}>
                            Conformément aux articles L221-18 et suivants du Code de la consommation, le client dispose
                            d'un délai de <strong>14 jours</strong> à compter de la réception du produit pour exercer
                            son droit de rétractation, sans avoir à justifier de motif ni à payer de pénalité.
                        </p>
                        <p className={styles.text}>
                            Pour exercer ce droit, le client doit notifier sa décision par email à{' '}
                            <a href="mailto:arnopolynice@gmail.com">arnopolynice@gmail.com</a>.
                        </p>
                        <p className={styles.text}>
                            Le produit doit être retourné dans son état d'origine, non porté, non lavé, avec toutes
                            ses étiquettes. Les frais de retour sont à la charge du client.
                        </p>
                        <p className={styles.text}>
                            Le remboursement sera effectué dans un délai de 14 jours suivant la réception du produit
                            retourné, par le même moyen de paiement utilisé lors de la commande.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>8. Garantie et Réclamation</h2>
                        <p className={styles.text}>
                            Tous les produits bénéficient de la garantie légale de conformité (articles L217-4 et
                            suivants du Code de la consommation) et de la garantie des vices cachés (articles 1641 et
                            suivants du Code civil).
                        </p>
                        <p className={styles.text}>
                            En cas de produit défectueux ou non conforme, le client peut contacter Arno Polynice à
                            l'adresse <a href="mailto:arnopolynice@gmail.com">arnopolynice@gmail.com</a> pour obtenir
                            un échange ou un remboursement.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>9. Protection des Données Personnelles</h2>
                        <p className={styles.text}>
                            Les informations recueillies lors de la commande sont nécessaires au traitement de
                            celle-ci. Pour plus d'informations sur le traitement de vos données, consultez notre{' '}
                            <a href="/politique-de-confidentialite">Politique de Confidentialité</a>.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>10. Droit Applicable et Litiges</h2>
                        <p className={styles.text}>
                            Les présentes CGV sont soumises au droit français. En cas de litige, une solution
                            amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux
                            compétents du ressort du siège social du vendeur seront seuls compétents.
                        </p>
                        <p className={styles.text}>
                            Conformément aux dispositions du Code de la consommation concernant le règlement amiable
                            des litiges, le client peut recourir au service de médiation de la consommation. Le
                            médiateur peut être saisi via la plateforme européenne de règlement en ligne des litiges :{' '}
                            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                                ec.europa.eu/consumers/odr
                            </a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
