'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CartDrawer.module.css';

// Mapping code d'erreur backend → clé i18n (cart.xxx).
// Garantit que toute erreur checkout est affichée dans la langue courante.
const ERROR_CODE_TO_KEY = {
    emptyCart: 'cart.emptyCartError',
    noVariants: 'cart.variantUnavailable',
    timeout: 'cart.timeoutError',
    outOfStock: 'cart.outOfStock',
    checkoutCreateFailed: 'cart.checkoutCreateError',
    serverError: 'cart.paymentError',
};

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
    const { t } = useLanguage();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState('');

    // État de session (cookie HttpOnly → on passe par /api/me).
    // On affiche un encart "Se connecter" si l'utilisateur n'est pas connecté,
    // pour favoriser la création de compte sans bloquer le guest checkout.
    const [authState, setAuthState] = useState({ status: 'loading', firstName: null });

    // Recharge la session à l'ouverture du panier (au cas où l'utilisateur
    // se connecte depuis un autre onglet pendant qu'il ajoute au panier).
    useEffect(() => {
        if (!isOpen) return;
        let cancelled = false;
        fetch('/api/me', { credentials: 'same-origin' })
            .then(res => res.json())
            .then(data => {
                if (cancelled) return;
                setAuthState(data?.loggedIn
                    ? { status: 'authenticated', firstName: data.firstName || null }
                    : { status: 'guest', firstName: null }
                );
            })
            .catch(() => {
                if (cancelled) return;
                // En cas d'erreur réseau, on considère l'utilisateur comme invité
                // (fallback safe : affiche l'encart, ne bloque rien).
                setAuthState({ status: 'guest', firstName: null });
            });
        return () => { cancelled = true; };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, setIsOpen]);

    const handleCheckout = async () => {
        if (isCheckingOut) return;
        setIsCheckingOut(true);
        setCheckoutError('');
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            });
            const data = await res.json();
            if (data.checkoutUrl) {
                // Redirection : on laisse isCheckingOut=true pour garder le spinner actif
                // pendant la navigation (évite un flash du bouton "Procéder au paiement").
                window.location.href = data.checkoutUrl;
                return;
            }
            // Mapping code backend → message localisé.
            const errorKey = ERROR_CODE_TO_KEY[data.error] || 'cart.paymentError';
            setCheckoutError(t(errorKey));
            setIsCheckingOut(false);
        } catch (err) {
            setCheckoutError(t('cart.connectionError'));
            setIsCheckingOut(false);
        }
    };

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
                onClick={() => setIsOpen(false)}
            />
            <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        {t('cart.cart')}
                        {totalItems > 0 && <span className={styles.count}>({totalItems})</span>}
                    </h2>
                    <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label={t('cart.close')}>
                        ✕
                    </button>
                </div>

                {/* Content */}
                {items.length === 0 ? (
                    <div className={styles.empty}>
                        <p className={styles.emptyText}>{t('cart.empty')}</p>
                        <button onClick={() => setIsOpen(false)} className="btn btn--secondary btn--small">
                            {t('cart.continueShopping')}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={styles.items}>
                            {items.map((item, index) => (
                                <div key={`${item.id}-${item.color}-${item.size}`} className={styles.item}>
                                    <Link
                                        href={`/produit/${item.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className={styles.itemImage}
                                        style={{ backgroundColor: item.colorHex || '#E5E0D8' }}
                                        aria-label={item.name}
                                    >
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={`${item.name} — ${item.color}`}
                                                fill
                                                sizes="80px"
                                                className={styles.itemImageImg}
                                            />
                                        ) : (
                                            <span className={styles.itemImageLetter}>{item.name.charAt(0)}</span>
                                        )}
                                    </Link>
                                    <div className={styles.itemInfo}>
                                        <Link
                                            href={`/produit/${item.slug}`}
                                            className={styles.itemName}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        <div className={styles.itemMeta}>
                                            <span>{item.color}</span>
                                            <span>•</span>
                                            <span>{t('cart.size')} {item.size}</span>
                                        </div>
                                        <div className={styles.itemBottom}>
                                            <div className={styles.quantity}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                                                    className={styles.qtyBtn}
                                                    aria-label={`${t('cart.decrease')} — ${item.name}`}
                                                >
                                                    −
                                                </button>
                                                <span className={styles.qtyNum} aria-live="polite">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                                                    className={styles.qtyBtn}
                                                    aria-label={`${t('cart.increase')} — ${item.name}`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className={styles.itemPrice}>{item.price * item.quantity},00 €</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id, item.color, item.size)}
                                        className={styles.removeBtn}
                                        aria-label={t('cart.remove')}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className={styles.footer}>
                            <div className={styles.totalRow}>
                                <span className={styles.totalLabel}>{t('cart.total')}</span>
                                <span className={styles.totalPrice}>{totalPrice},00 €</span>
                            </div>
                            <p className={styles.shipping}>{t('cart.shippingNote')}</p>

                            {/* Encart auth — invité : incite à se connecter, pas bloquant.
                                On masque pendant le 'loading' pour éviter un flash. */}
                            {authState.status === 'guest' && (
                                <div className={styles.loginPrompt}>
                                    <p className={styles.loginPromptTitle}>{t('cart.loginPromptTitle')}</p>
                                    <p className={styles.loginPromptText}>{t('cart.loginPromptText')}</p>
                                    <div className={styles.loginPromptActions}>
                                        <Link
                                            href="/connexion"
                                            className={styles.loginPromptCta}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {t('cart.loginPromptCta')}
                                        </Link>
                                        <span className={styles.loginPromptOr}>{t('cart.loginPromptOr')}</span>
                                    </div>
                                </div>
                            )}

                            {/* Variante connecté : message de bienvenue discret */}
                            {authState.status === 'authenticated' && (
                                <div className={`${styles.loginPrompt} ${styles.loginPromptWelcome}`}>
                                    <p className={styles.loginPromptTitle}>
                                        {t('cart.welcomeBack').replace(
                                            '{name}',
                                            authState.firstName || ''
                                        ).replace(/\s+,/, ',').trim()}
                                    </p>
                                </div>
                            )}

                            {checkoutError && (
                                <div className={styles.checkoutError} role="alert" aria-live="polite">
                                    {checkoutError}
                                </div>
                            )}
                            <button
                                className={`btn btn--primary ${styles.checkoutBtn}`}
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                aria-busy={isCheckingOut}
                            >
                                <span className={styles.checkoutBtnContent}>
                                    {isCheckingOut && <span className={styles.spinner} aria-hidden="true" />}
                                    {isCheckingOut ? t('cart.redirecting') : t('cart.checkout')}
                                </span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
