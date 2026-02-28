'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

const leftLinks = [
    { href: '/femme', label: 'Femme' },
    { href: '/homme', label: 'Homme' },
    { href: '/unisexe', label: 'Unisexe' },
];

const rightLinks = [
    { href: '/notre-histoire', label: 'Notre histoire' },
    { href: '/notre-ethique', label: 'Notre éthique' },
    { href: '/contact', label: 'Contact' },
];

const allLinks = [...leftLinks, ...rightLinks];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { totalItems, setIsOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    return (
        <>
            <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.inner}>
                    {/* Mobile menu toggle */}
                    <button
                        className={styles.menuToggle}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
                            <span></span>
                            <span></span>
                        </span>
                    </button>

                    {/* Logo */}
                    <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
                        <span className={styles.logoText}>ARNO</span>
                        <span className={styles.logoText}>POLYNICE</span>
                    </Link>

                    {/* Left Nav */}
                    <nav className={styles.desktopNav}>
                        {leftLinks.map(link => (
                            <Link key={link.href} href={link.href} className={styles.navLink}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Logo */}
                    <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
                        <span className={styles.logoText}>ARNO</span>
                        <span className={styles.logoText}>POLYNICE</span>
                    </Link>

                    {/* Right Nav & Actions */}
                    <div className={styles.rightSection}>
                        <nav className={styles.desktopNav}>
                            {rightLinks.map(link => (
                                <Link key={link.href} href={link.href} className={styles.navLink}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <Link href="/compte" className={styles.actionBtn} aria-label="Mon compte">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </Link>

                            <button className={styles.actionBtn} onClick={() => setIsOpen(true)} aria-label="Panier">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 01-8 0" />
                                </svg>
                                {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.overlayOpen : ''}`} onClick={() => setIsMenuOpen(false)} />
            <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
                <div className={styles.mobileNavInner}>
                    {allLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.mobileNavLink}
                            onClick={() => setIsMenuOpen(false)}
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className={styles.mobileSocials}>
                    <a href="https://www.instagram.com/arno.polynice.__" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.tiktok.com/@arnopolynice" target="_blank" rel="noopener noreferrer">TikTok</a>
                    <a href="https://www.facebook.com/Arno.Polynice" target="_blank" rel="noopener noreferrer">Facebook</a>
                </div>
            </nav>
        </>
    );
}
