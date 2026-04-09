'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Header.module.css';

const leftLinks = [
    { href: '/femme', key: 'nav.femme' },
    { href: '/homme', key: 'nav.homme' },
    { href: '/unisexe', key: 'nav.unisexe' },
];

const rightLinks = [
    { href: '/notre-histoire', key: 'nav.notreHistoire' },
    { href: '/notre-ethique', key: 'nav.notreEthique' },
    { href: '/contact', key: 'nav.contact' },
];

const allLinks = [...leftLinks, ...rightLinks];

const languages = [
    { code: 'fr', flag: '🇫🇷' },
    { code: 'en', flag: '🇬🇧' },
    { code: 'es', flag: '🇪🇸' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const { totalItems, setIsOpen } = useCart();
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    // Close language dropdown when clicking outside
    useEffect(() => {
        const handleClick = () => setIsLangOpen(false);
        if (isLangOpen) {
            setTimeout(() => document.addEventListener('click', handleClick), 0);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [isLangOpen]);

    const currentFlag = languages.find(l => l.code === language)?.flag || '🇫🇷';

    return (
        <>
            <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.inner}>
                    {/* Mobile menu toggle */}
                    <button
                        className={styles.menuToggle}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-nav"
                    >
                        <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
                            <span></span>
                            <span></span>
                        </span>
                    </button>

                    {/* Left Nav */}
                    <nav className={styles.desktopNav}>
                        {leftLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={styles.navLink}
                                aria-current={pathname === link.href ? 'page' : undefined}
                            >
                                {t(link.key)}
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
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={styles.navLink}
                                    aria-current={pathname === link.href ? 'page' : undefined}
                                >
                                    {t(link.key)}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className={styles.actions}>
                            {/* Language Selector */}
                            <div className={styles.langSelector}>
                                <button
                                    className={styles.langBtn}
                                    onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); }}
                                    aria-label="Language"
                                >
                                    <span className={styles.langFlag}>{currentFlag}</span>
                                </button>
                                {isLangOpen && (
                                    <div className={styles.langDropdown}>
                                        {languages.map(lang => (
                                            <button
                                                key={lang.code}
                                                className={`${styles.langOption} ${language === lang.code ? styles.langActive : ''}`}
                                                onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                                            >
                                                <span>{lang.flag}</span>
                                                <span>{t(`lang.${lang.code}`)}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link href="/compte" className={styles.actionBtn} aria-label={t('auth.myAccount')}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </Link>

                            <button className={styles.actionBtn} onClick={() => setIsOpen(true)} aria-label={t('cart.cart')}>
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
            <nav id="mobile-nav" className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`} aria-hidden={!isMenuOpen}>
                <div className={styles.mobileNavInner}>
                    {allLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.mobileNavLink}
                            onClick={() => setIsMenuOpen(false)}
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            {t(link.key)}
                        </Link>
                    ))}
                </div>
                {/* Mobile Language Selector */}
                <div className={styles.mobileLangSelector}>
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`${styles.mobileLangBtn} ${language === lang.code ? styles.mobileLangActive : ''}`}
                            onClick={() => setLanguage(lang.code)}
                        >
                            {lang.flag}
                        </button>
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
