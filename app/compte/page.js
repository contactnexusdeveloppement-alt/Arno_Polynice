import { getSessionCustomer } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import AccountContent from './AccountContent';

// Force dynamic to avoid caching authenticated pages
export const dynamic = 'force-dynamic';

export default async function AccountPage() {
    const customer = await getSessionCustomer();

    if (!customer) {
        redirect('/connexion');
    }

    // Les données client sont récupérées côté serveur (session) puis passées
    // au composant client pour bénéficier de la traduction via useLanguage().
    return <AccountContent customer={customer} />;
}
