import styles from './page.module.css';
import { getPressPage, getPressItems } from '@/lib/shopify';
import PressItem from '@/components/PressItem';
import PressEmpty from '@/components/PressEmpty';

// ISR : permet au client d'ajouter une parution depuis Shopify et de la voir
// en ligne en quelques minutes max, sans rebuild manuel.
export const revalidate = 300;

export const metadata = {
    title: 'Presse — Arno Polynice dans les médias',
    description: 'Articles de presse, interviews et vidéos consacrés à Arno Polynice, créateur de mode artisanale française basé dans les Vosges.',
    alternates: { canonical: 'https://www.arno-polynice.com/presse' },
};

// Fallback statique : si Shopify est down ou les metaobjects sont vides,
// la page reste fonctionnelle avec un en-tête + une invitation à revenir.
const FALLBACK_PAGE = {
    label: 'Médias',
    title: 'Arno Polynice dans les médias',
    intro: "Articles de presse, interviews et vidéos qui parlent du travail d'Arno Polynice et de la marque.",
};

export default async function PressePage() {
    const [pageData, items] = await Promise.all([
        getPressPage(),
        getPressItems(),
    ]);

    const page = pageData ?? FALLBACK_PAGE;

    return (
        <div className="page-enter">
            <section className={styles.pressPage}>
                <div className={styles.header}>
                    {page.label && <span className={styles.label}>{page.label}</span>}
                    <h1 className={styles.title}>{page.title}</h1>
                    {page.intro && <p className={styles.intro}>{page.intro}</p>}
                </div>

                {items.length > 0 ? (
                    <div className={styles.itemsList}>
                        {items.map(item => (
                            <PressItem key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <PressEmpty />
                    </div>
                )}
            </section>
        </div>
    );
}
