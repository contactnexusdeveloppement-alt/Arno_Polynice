import { SITE_URL, getContactPageSchema, getBreadcrumbSchema, jsonLdScriptProps } from '@/lib/schemas';

/**
 * Server layout pour /contact.
 *
 * Pourquoi un layout et pas la page directement : `app/contact/page.js` est
 * un Client Component (`'use client'`) car il gère le state du formulaire.
 * Il ne peut donc pas exporter `metadata` ni injecter du JSON-LD côté serveur.
 * On délègue ces responsabilités SEO à ce layout server.
 */

export const metadata = {
    title: 'Contact — Atelier Épinal Vosges',
    description: 'Contactez Arno Polynice : commandes, créations sur mesure, collaborations, demandes presse. Atelier basé à Épinal dans les Vosges, France.',
    alternates: { canonical: `${SITE_URL}/contact` },
};

const contactPageSchema = getContactPageSchema();

const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Contact', url: `${SITE_URL}/contact` },
]);

export default function ContactLayout({ children }) {
    return (
        <>
            <script {...jsonLdScriptProps(contactPageSchema)} />
            <script {...jsonLdScriptProps(breadcrumbSchema)} />
            {children}
        </>
    );
}
