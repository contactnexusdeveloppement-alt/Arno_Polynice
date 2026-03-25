export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/compte/', '/connexion/', '/inscription/', '/mot-de-passe-oublie/'],
      },
    ],
    sitemap: 'https://www.arno-polynice.com/sitemap.xml',
  };
}
