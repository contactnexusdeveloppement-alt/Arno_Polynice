'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Tracker page_view GA4 pour l'App Router Next.js.
 *
 * Pourquoi ce composant : l'App Router fait du client-side navigation entre
 * les routes (pas de full page reload), donc le snippet gtag.js initial ne
 * fire que pour le premier load. Sans ce composant, GA4 sous-compte
 * massivement les pages vues.
 *
 * Ici on écoute les changements de pathname + searchParams via les hooks
 * Next.js, et on envoie un event "page_view" custom à chaque navigation.
 *
 * useSearchParams() impose que le composant soit wrappé dans <Suspense>
 * (cf. https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout).
 */

function GA4PageViewInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
        const query = searchParams?.toString();
        const pagePath = query ? `${pathname}?${query}` : pathname;
        window.gtag('event', 'page_view', {
            page_path: pagePath,
            page_location: window.location.href,
            page_title: document.title,
        });
    }, [pathname, searchParams]);

    return null;
}

export default function GA4PageView() {
    return (
        <Suspense fallback={null}>
            <GA4PageViewInner />
        </Suspense>
    );
}
