import { getSessionCustomer } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import LogoutButton from './LogoutButton';
import styles from './page.module.css';

// Force dynamic to avoid caching authenticated pages
export const dynamic = 'force-dynamic';

export default async function AccountPage() {
    const customer = await getSessionCustomer();

    if (!customer) {
        redirect('/connexion');
    }

    return (
        <div className={`page-enter ${styles.accountPage}`}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Mon compte</h1>
                        <p className={styles.subtitle}>Bonjour, {customer.firstName || customer.email} !</p>
                    </div>
                    <LogoutButton className={styles.logoutBtn} />
                </header>

                <div className={styles.content}>
                    <section className={styles.ordersSection}>
                        <h2 className={styles.sectionTitle}>Historique des commandes</h2>

                        {!customer.orders?.edges?.length ? (
                            <div className={styles.emptyState}>
                                <p>Vous n'avez pas encore passé de commande.</p>
                            </div>
                        ) : (
                            <div className={styles.ordersList}>
                                {customer.orders.edges.map(edge => {
                                    const order = edge.node;
                                    const date = new Date(order.processedAt).toLocaleDateString('fr-FR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    });

                                    return (
                                        <div key={order.id} className={styles.orderCard}>
                                            <div className={styles.orderHeader}>
                                                <div>
                                                    <h3 className={styles.orderNumber}>Commande #{order.orderNumber}</h3>
                                                    <p className={styles.orderDate}>{date}</p>
                                                </div>
                                                <div className={styles.orderStatus}>
                                                    <span className={styles.statusBadge}>{order.fulfillmentStatus || 'En cours de traitement'}</span>
                                                    <span className={styles.orderTotal}>{order.totalPrice.amount} {order.totalPrice.currencyCode}</span>
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
                                                                <p className={styles.itemQty}>Quantité : {item.quantity}</p>
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
                        <h2 className={styles.sectionTitle}>Mes informations</h2>
                        <div className={styles.infoCard}>
                            <p><strong>Nom :</strong> {customer.firstName} {customer.lastName}</p>
                            <p><strong>Email :</strong> {customer.email}</p>
                            {customer.phone && <p><strong>Téléphone :</strong> {customer.phone}</p>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
