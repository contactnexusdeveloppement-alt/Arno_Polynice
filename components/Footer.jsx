'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/arno.polynice.__', icon: 'IG' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@arnopolynice', icon: 'TK' },
    { name: 'Facebook', href: 'https://www.facebook.com/Arno.Polynice', icon: 'FB' },
    { name: 'YouTube', href: 'https://www.youtube.com/@AdelsonPaugain', icon: 'YT' },
];

const shopLinks = [
    { label: 'Femme', href: '/femme' },
    { label: 'Homme', href: '/homme' },
    { label: 'Unisexe', href: '/unisexe' },
];

const infoLinks = [
    { label: 'Notre histoire', href: '/notre-histoire' },
    { label: 'Notre éthique', href: '/notre-ethique' },
    { label: 'Contact', href: '/contact' },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Newsletter */}
                <div className={styles.newsletter}>
                    <h3 className={styles.newsletterTitle}>Restez informé</h3>
                    <p className={styles.newsletterText}>
                        Inscrivez-vous pour recevoir nos dernières créations et actualités.
                    </p>
                    <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Votre adresse email"
                            className={styles.newsletterInput}
                        />
                        <button type="submit" className={styles.newsletterBtn}>
                            →
                        </button>
                    </form>
                </div>

                {/* Links Grid */}
                <div className={styles.linksGrid}>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Boutique</h4>
                        {shopLinks.map(link => (
                            <Link key={link.href} href={link.href} className={styles.link}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Informations</h4>
                        {infoLinks.map(link => (
                            <Link key={link.href} href={link.href} className={styles.link}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Suivez-nous</h4>
                        {socialLinks.map(social => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className={styles.bottom}>
                    <div className={styles.bottomLogo}>
                        <span>ARNO</span>
                        <span>POLYNICE</span>
                    </div>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Arno Polynice. Tous droits réservés.
                    </p>
                    <div className={styles.bottomLinks}>
                        <a href="#">Mentions légales</a>
                        <a href="#">CGV</a>
                        <a href="#">Politique de confidentialité</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
