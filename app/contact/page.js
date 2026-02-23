'use client';

import styles from './page.module.css';

export default function ContactPage() {
    return (
        <div className="page-enter">
            <section className={styles.contactPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Contact</h1>
                    <p className={styles.subtitle}>
                        Une question, une commande sur mesure ou une collaboration ? N'hésitez pas à nous écrire.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Form */}
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Prénom</label>
                                <input type="text" className={styles.formInput} placeholder="Votre prénom" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Nom</label>
                                <input type="text" className={styles.formInput} placeholder="Votre nom" required />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Email</label>
                            <input type="email" className={styles.formInput} placeholder="votre@email.com" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Sujet</label>
                            <select className={styles.formInput} defaultValue="">
                                <option value="" disabled>Sélectionnez un sujet</option>
                                <option value="commande">Question sur une commande</option>
                                <option value="personnalisation">Personnalisation / Sur mesure</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="presse">Presse</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Message</label>
                            <textarea className={styles.formTextarea} rows="6" placeholder="Votre message..." required />
                        </div>
                        <button type="submit" className="btn btn--primary">
                            Envoyer
                        </button>
                    </form>

                    {/* Info */}
                    <div className={styles.contactInfo}>
                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>Email</h3>
                            <a href="mailto:contact@arnopolynice.com" className={styles.infoLink}>
                                contact@arnopolynice.com
                            </a>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>Réseaux sociaux</h3>
                            <a href="https://www.instagram.com/arno.polynice.__" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                Instagram — @arno.polynice.__
                            </a>
                            <a href="https://www.tiktok.com/@arnopolynice" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                TikTok — @arnopolynice
                            </a>
                            <a href="https://www.facebook.com/Arno.Polynice" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                Facebook — Arno Polynice
                            </a>
                            <a href="https://www.youtube.com/@AdelsonPaugain" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                YouTube — Adelson Paugain
                            </a>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>Délais de réponse</h3>
                            <p className={styles.infoText}>
                                Nous répondons généralement sous 24 à 48 heures.
                                Pour les commandes personnalisées, un rendez-vous atelier peut être organisé.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
