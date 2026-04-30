/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.shopify.com',
                pathname: '/**',
            },
        ],
    },

    /**
     * Headers de sécurité globaux. Appliqués à toutes les routes.
     *
     * - X-Frame-Options : empêche l'iframing du site (anti-clickjacking)
     * - X-Content-Type-Options : empêche le MIME-sniffing (anti-XSS)
     * - Referrer-Policy : ne fuite que l'origine vers les domaines tiers
     * - Permissions-Policy : désactive caméra/micro/geo (pas utilisés)
     *
     * Note : pas de Content-Security-Policy ici — sa configuration correcte
     * est complexe (Shopify CDN, Vercel, fonts Google, scripts inline JSON-LD,
     * Vercel Analytics) et toute erreur casse silencieusement le rendu.
     * À ajouter plus tard avec audit complet si nécessaire.
     */
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                ],
            },
        ];
    },
};

export default nextConfig;
