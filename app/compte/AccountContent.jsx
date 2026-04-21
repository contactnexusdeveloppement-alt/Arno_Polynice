'use client';

import { useLanguage } from '@/context/LanguageContext';
import LogoutButton from './LogoutButton';
import styles from './page.module.css';

const LANGUAGE_LOCALE = {
    fr: 'fr-FR',
    en: 'en-US',
    es: 'es-ES',
};

export default function AccountContent({ customer }) {
    const { t, language } = useLanguage();
    const locale = LANGUAGE_LOCALE[language] || 'fr-FR';

    return (
        <div className={`page-enter ${styles.accountPage}`}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>{t('auth.myAccount')}</h1>
                        <p className={styles.subtitle}>
                            {t('account.hello')} {customer.firstName || customer.email} !
                        </p>
                    </div>
                    <LogoutButton className={styles.logoutBtn} />
                </header>

                <div className={styles.content}>
                    <section className={styles.ordersSection}>
                        <h2 className={styles.sectionTitle}>{t('account.orderHistory')}</h2>

                        {!customer.orders?.edges?.length ? (
                            <div className={styles.emptyState}>
                                <p>{t('account.noOrders')}</p>
                            </div>
                        ) : (
                            <div className={styles.ordersList}>
                                {customer.orders.edges.map(edge => {
                                    const order = edge.node;
                                    const date = new Date(order.processedAt).toLocaleDateString(locale, {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    });

                                    return (
                                        <div key={order.id} className={styles.orderCard}>
                                            <div className={styles.orderHeader}>
                                                <div>
                                                    <h3 className={styles.orderNumber}>{t('account.orderNumber')} #{order.orderNumber}</h3>
                                                    <p className={styles.orderDate}>{date}</p>
                                                </div>
                                                <div className={styles.orderStatus}>
                                                    <span className={styles.statusBadge}>
                                                        {order.fulfillmentStatus || t('account.processing')}
                                                    </span>
                                                    <span className={styles.orderTotal}>
                                                        {order.totalPrice.amount} {order.totalPrice.currencyCode}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={styles.orderItems}>
                                                {order.lineItems.edges.map(itemEdge => {
                                                    const item = itemEdge.node;
                                                    return (
                                                        <div key={item.title} className={styles.itemRow}>
                                                            <div className={styles.itemImagePlaceholder}>
                                                                {item.variant?.image?.url ? (
                                                                    <img src={item.variant.image.url} alt={item.title} className={styles.itemImage} />
                                                                ) : (
                                                                    <span>{item.title.charAt(0)}</span>
                                                                )}
                                                            </div>
                                                            <div className={styles.itemDetails}>
                                                                <p className={styles.itemName}>{item.title}</p>
                                                                <p className={styles.itemQty}>{t('account.quantity')} : {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    <section className={styles.profileSection}>
                        <h2 className={styles.sectionTitle}>{t('account.myInfo')}</h2>
                        <div className={styles.infoCard}>
                            <p><strong>{t('account.name')} :</strong> {customer.firstName} {customer.lastName}</p>
                            <p><strong>{t('account.email')} :</strong> {customer.email}</p>
                            {customer.phone && <p><strong>{t('account.phone')} :</strong> {customer.phone}</p>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
