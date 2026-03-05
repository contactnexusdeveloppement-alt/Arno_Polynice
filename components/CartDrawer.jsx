'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
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
                alert(data.error || 'Erreur lors du paiement');
                setIsCheckingOut(false);
            }
        } catch (err) {
            alert('Erreur de connexion. Veuillez réessayer.');
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
                        Panier
                        {totalItems > 0 && <span className={styles.count}>({totalItems})</span>}
                    </h2>
                    <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Fermer">
                        ✕
                    </button>
                </div>

                {/* Content */}
                {items.length === 0 ? (
                    <div className={styles.empty}>
                        <p className={styles.emptyText}>Votre panier est vide</p>
                        <button onClick={() => setIsOpen(false)} className="btn btn--secondary btn--small">
                            Continuer mes achats
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
                                            <span>Taille {item.size}</span>
                                        </div>
                                        <div className={styles.itemBottom}>
                                            <div className={styles.quantity}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                                                    className={styles.qtyBtn}
                                                >
                                                    −
                                                </button>
                                                <span className={styles.qtyNum}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                                                    className={styles.qtyBtn}
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
                                        aria-label="Retirer"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className={styles.footer}>
                            <div className={styles.totalRow}>
                                <span className={styles.totalLabel}>Total</span>
                                <span className={styles.totalPrice}>{totalPrice},00 €</span>
                            </div>
                            <p className={styles.shipping}>Frais de livraison calculés à l'étape suivante</p>
                            <button
                                className={`btn btn--primary ${styles.checkoutBtn}`}
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                            >
                                {isCheckingOut ? 'Redirection...' : 'Procéder au paiement'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
