'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/context/CookieConsentContext';
import GA4PageView from './GA4PageView';

/**
 * Charge les scripts analytics tiers (Microsoft Clarity + Google Analytics 4)
 * UNIQUEMENT si l'utilisateur a explicitement accepté via la bannière cookies.
 *
 * En cas de 'pending' ou 'rejected' → rien n'est rendu, donc :
 *   - Aucun cookie analytics n'est déposé
 *   - Aucune requête réseau vers clarity.ms ou googletagmanager.com
 *   - 100% conforme RGPD / CNIL
 *
 * Note : si l'utilisateur change d'avis et accepte plus tard, les scripts
 * sont injectés à ce moment-là (next/script gère ça proprement). En revanche,
 * passer de 'accepted' à 'rejected' ne décharge pas les scripts déjà
 * chargés en mémoire — il faut reload. C'est documenté dans la politique
 * de confidentialité (vider les cookies du navigateur pour révoquer).
 */

const CLARITY_PROJECT_ID = 'wjr12966i7';
const GA4_MEASUREMENT_ID = 'G-0RZ39DLT3H';

export default function AnalyticsScripts() {
    const { consent } = useCookieConsent();

    if (consent !== 'accepted') return null;

    return (
        <>
            {/* Microsoft Clarity — heatmaps + session recordings */}
            <Script id="ms-clarity" strategy="afterInteractive">
                {`(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
            </Script>

            {/* Google Analytics 4 — trafic + conversions + démographie */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA4_MEASUREMENT_ID}', {
                    send_page_view: true,
                    cookie_flags: 'SameSite=None;Secure',
                });`}
            </Script>

            {/* Tracker pour les navigations Next.js App Router (client-side) */}
            <GA4PageView />
        </>
    );
}
