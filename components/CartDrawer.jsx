'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
    const { t } = useLanguage();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState('');

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
                window.location.href = data.checkoutUrl;
            } else {
                setCheckoutError(data.error || t('cart.paymentError'));
                setIsCheckingOut(false);
            }
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
                                    <div className={styles.itemImage} style={{ backgroundColor: item.colorHex || '#E5E0D8' }}>
                                        <span className={styles.itemImageLetter}>{item.name.charAt(0)}</span>
                                    </div>
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
                                                    aria-label={`${t('cart.decrease') || 'Diminuer'} — ${item.name}`}
                                                >
                                                    −
                                                </button>
                                                <span className={styles.qtyNum} aria-live="polite">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                                                    className={styles.qtyBtn}
                                                    aria-label={`${t('cart.increase') || 'Augmenter'} — ${item.name}`}
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
                            {checkoutError && (
                                <div className={styles.checkoutError} role="alert" aria-live="polite">
                                    {checkoutError}
                                </div>
                            )}
                            <button
                                className={`btn btn--primary ${styles.checkoutBtn}`}
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                            >
                                {isCheckingOut ? t('cart.redirecting') : t('cart.checkout')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
