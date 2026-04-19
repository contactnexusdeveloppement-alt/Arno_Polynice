/**
 * Génère un guide Shopify au format .docx pour le client Arno Polynice.
 * Le fichier est créé dans le dossier parent du projet (Bureau/arno-polynice/).
 *
 * Usage : node scripts/generate-shopify-guide.js
 */

const fs = require('fs');
const path = require('path');
const {
    Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, LevelFormat,
    PageOrientation, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType,
    PageBreak, Header, Footer, PageNumber, ExternalHyperlink,
} = require('docx');

const OUTPUT = path.join(__dirname, '..', '..', 'Guide-Shopify-Arno-Polynice.docx');

// --- Couleurs / palette ---
const COLOR_TEXT = '1A1A1A';
const COLOR_MUTED = '6B6B6B';
const COLOR_ACCENT = 'B8A898';
const COLOR_LINK = '3D4F5F';
const COLOR_BG_LIGHT = 'F8F5F0';

// --- Helpers de création ---
const h1 = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true })],
    spacing: { before: 480, after: 240 },
});

const h2 = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true })],
    spacing: { before: 360, after: 180 },
});

const h3 = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, bold: true })],
    spacing: { before: 240, after: 120 },
});

const p = (text, opts = {}) => new Paragraph({
    children: [new TextRun({ text, ...opts })],
    spacing: { after: 120 },
});

const pMulti = (runs) => new Paragraph({
    children: runs,
    spacing: { after: 120 },
});

const bullet = (text, level = 0) => new Paragraph({
    numbering: { reference: 'bullets', level },
    children: [new TextRun(text)],
    spacing: { after: 60 },
});

const bulletBold = (bold, rest) => new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    children: [
        new TextRun({ text: bold, bold: true }),
        new TextRun(rest),
    ],
    spacing: { after: 60 },
});

const numbered = (text, level = 0) => new Paragraph({
    numbering: { reference: 'numbers', level },
    children: [new TextRun(text)],
    spacing: { after: 60 },
});

const tip = (text) => new Paragraph({
    children: [
        new TextRun({ text: '💡 ', bold: true, color: COLOR_ACCENT }),
        new TextRun({ text, italics: true, color: COLOR_MUTED }),
    ],
    spacing: { before: 120, after: 180 },
    indent: { left: 360 },
});

const warning = (text) => new Paragraph({
    children: [
        new TextRun({ text: '⚠️ ', bold: true }),
        new TextRun({ text, italics: true, color: COLOR_MUTED }),
    ],
    spacing: { before: 120, after: 180 },
    indent: { left: 360 },
});

const divider = () => new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_ACCENT, space: 8 } },
    spacing: { before: 120, after: 240 },
});

// --- Construction du document ---
const doc = new Document({
    creator: 'NEXUS DEVELOPPEMENT',
    title: 'Guide Shopify — Arno Polynice',
    description: 'Guide d\'utilisation Shopify pour la boutique Arno Polynice',
    styles: {
        default: {
            document: {
                run: { font: 'Calibri', size: 22 }, // 11pt
            },
        },
        paragraphStyles: [
            {
                id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 44, bold: true, font: 'Calibri', color: COLOR_TEXT },
                paragraph: {
                    spacing: { before: 480, after: 240 },
                    outlineLevel: 0,
                    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_ACCENT, space: 6 } },
                },
            },
            {
                id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 32, bold: true, font: 'Calibri', color: COLOR_TEXT },
                paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 1 },
            },
            {
                id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 26, bold: true, font: 'Calibri', color: COLOR_MUTED },
                paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 },
            },
        ],
    },
    numbering: {
        config: [
            {
                reference: 'bullets',
                levels: [
                    { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
                        style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
                    { level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT,
                        style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
                ],
            },
            {
                reference: 'numbers',
                levels: [
                    { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
                        style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
                ],
            },
        ],
    },
    sections: [{
        properties: {
            page: {
                size: { width: 11906, height: 16838 }, // A4
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
            },
        },
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: 'Guide Shopify — Arno Polynice  ·  page ', size: 18, color: COLOR_MUTED }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 18, color: COLOR_MUTED }),
                    ],
                })],
            }),
        },
        children: [
            // =============== PAGE DE TITRE ===============
            new Paragraph({ spacing: { before: 2400 }, children: [new TextRun('')] }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                children: [new TextRun({ text: 'ARNO POLYNICE', bold: true, size: 40, color: COLOR_TEXT })],
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 960 },
                children: [new TextRun({ text: 'Guide d\'utilisation Shopify', size: 32, color: COLOR_MUTED })],
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                border: { top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_ACCENT, space: 10 } },
                spacing: { before: 120, after: 480 },
                children: [new TextRun({ text: '  ', size: 18 })],
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                children: [new TextRun({ text: 'Tout ce que vous devez savoir pour gérer votre boutique en ligne au quotidien : ajouter des produits, traiter les commandes, gérer les stocks, modifier le contenu du site.', size: 22, italics: true, color: COLOR_MUTED })],
            }),
            new Paragraph({ spacing: { before: 2400 }, children: [new TextRun('')] }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Réalisé par NEXUS DEVELOPPEMENT', size: 20, color: COLOR_MUTED })],
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Avril 2026', size: 18, color: COLOR_MUTED })],
            }),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== SOMMAIRE ===============
            h1('Sommaire'),
            numbered('Se connecter à Shopify'),
            numbered('Tableau de bord — vue d\'ensemble'),
            numbered('Gérer les produits (ajouter, modifier, supprimer)'),
            numbered('Gérer les stocks et les variantes'),
            numbered('Gérer les commandes'),
            numbered('Modifier le contenu visuel du site (images d\'accueil, Notre Histoire, etc.)'),
            numbered('Configurer la livraison'),
            numbered('Gérer les clients et la newsletter'),
            numbered('Créer des promotions et codes promo'),
            numbered('Voir les statistiques de vente'),
            numbered('Astuces quotidiennes et bonnes pratiques'),
            numbered('Support et contacts utiles'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 1. CONNEXION ===============
            h1('1. Se connecter à Shopify'),
            p('Toute la gestion de votre boutique se fait depuis une interface appelée le Shopify Admin. C\'est un site web auquel vous vous connectez avec votre email et votre mot de passe.'),

            h2('Adresse de connexion'),
            pMulti([
                new TextRun('Rendez-vous sur '),
                new ExternalHyperlink({
                    link: 'https://arno-polynice.myshopify.com/admin',
                    children: [new TextRun({ text: 'arno-polynice.myshopify.com/admin', color: COLOR_LINK, underline: {} })],
                }),
                new TextRun(' ou tapez tout simplement '),
                new TextRun({ text: 'shopify.com', bold: true }),
                new TextRun(' puis cliquez sur "Log in".'),
            ]),

            h2('Si c\'est la première fois'),
            p('Vous avez reçu un email d\'invitation de Shopify (expéditeur : no-reply@shopify.com). Cliquez sur le lien contenu dans cet email pour créer votre mot de passe.'),
            warning('Si vous ne trouvez pas l\'email, vérifiez votre dossier "Spam" / "Courriers indésirables".'),

            h2('Application mobile'),
            p('Pour gérer votre boutique depuis votre téléphone, téléchargez l\'application "Shopify" (gratuite) sur l\'App Store ou le Play Store. Vous recevrez des notifications à chaque nouvelle commande.'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 2. TABLEAU DE BORD ===============
            h1('2. Tableau de bord — vue d\'ensemble'),
            p('Une fois connecté, vous arrivez sur le tableau de bord (ou "Home"). Il résume en un coup d\'œil :'),
            bullet('Les ventes du jour et du mois'),
            bullet('Les nouvelles commandes à traiter'),
            bullet('Le nombre de visiteurs sur le site'),
            bullet('Les produits en rupture de stock'),

            h2('La navigation à gauche'),
            p('Le menu de gauche est votre principal outil. Voici les sections les plus utiles au quotidien :'),
            bulletBold('Orders (Commandes)', ' — toutes les commandes reçues, à expédier, en cours, annulées.'),
            bulletBold('Products (Produits)', ' — votre catalogue complet. C\'est ici que vous ajoutez, modifiez ou supprimez un produit.'),
            bulletBold('Customers (Clients)', ' — la liste des clients qui ont commandé ou créé un compte.'),
            bulletBold('Content (Contenu)', ' — c\'est ici que se trouvent les images et textes affichés sur le site (Metaobjects).'),
            bulletBold('Analytics', ' — les statistiques de vente détaillées.'),
            bulletBold('Marketing', ' — les campagnes email, les automatisations.'),
            bulletBold('Discounts (Réductions)', ' — pour créer des codes promo.'),
            bulletBold('Settings (Paramètres)', ' — tous les réglages du compte, des paiements, des livraisons.'),
            tip('En haut à droite de chaque page il y a une loupe 🔎 pour chercher un produit, une commande, ou un client très rapidement.'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 3. PRODUITS ===============
            h1('3. Gérer les produits'),

            h2('Ajouter un nouveau produit'),
            numbered('Dans le menu de gauche, cliquez sur Products (ou Produits).'),
            numbered('En haut à droite, cliquez sur le bouton Add product.'),
            numbered('Remplissez les champs dans cet ordre :'),
            bullet('Title : le nom du produit (ex. "Ensemble à plis bleu marine")', 1),
            bullet('Description : le texte qui apparaît sur la fiche produit. Utilisez les options de mise en forme (gras, listes) pour structurer.', 1),
            bullet('Media : glissez-déposez vos photos. La première photo sera l\'image principale. Prévoyez 4 à 6 photos minimum (pieds, détails, de dos, etc.).', 1),
            bullet('Pricing : prix de vente TTC. Laissez le champ "Cost per item" vide sauf si vous voulez suivre votre marge.', 1),
            bullet('Inventory : cochez "Track quantity" et indiquez la quantité disponible en stock.', 1),
            bullet('Shipping : cochez "This is a physical product" et indiquez le poids (utile pour calculer les frais de port).', 1),
            bullet('Variants : si le produit existe en plusieurs tailles / couleurs, ajoutez des variantes (voir section suivante).', 1),
            bullet('Product organization : catégorie (Type), collection (ex. "Femme", "Homme", "Unisexe"), tags.', 1),
            bullet('Status : passez de "Draft" à "Active" pour rendre le produit visible sur le site.', 1),
            numbered('Cliquez sur Save en haut à droite.'),
            tip('Pour qu\'un produit apparaisse dans les bonnes rubriques (Femme / Homme / Unisexe), ajoutez-le aux bonnes collections dans "Collections" en bas à droite de la page produit.'),

            h2('Modifier un produit existant'),
            numbered('Products → cliquez sur le nom du produit.'),
            numbered('Modifiez les champs souhaités.'),
            numbered('Save.'),

            h2('Supprimer un produit'),
            numbered('Products → cliquez sur le produit.'),
            numbered('Descendez tout en bas de la page.'),
            numbered('Cliquez sur le bouton rouge Delete product.'),
            warning('La suppression est définitive. Si vous pensez réutiliser le produit plus tard, préférez changer son statut en "Draft" (il disparaît du site mais reste sauvegardé).'),

            h2('Dupliquer un produit'),
            p('Pour créer un nouveau produit similaire (ex. même coupe, autre couleur) :'),
            numbered('Ouvrez le produit existant.'),
            numbered('Cliquez sur Duplicate en haut.'),
            numbered('Modifiez les champs qui changent (nom, photos, variantes).'),
            numbered('Save.'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 4. STOCKS ET VARIANTES ===============
            h1('4. Gérer les stocks et les variantes'),

            h2('Qu\'est-ce qu\'une variante ?'),
            p('Une variante est une déclinaison d\'un même produit : taille (S, M, L), couleur (noir, bleu), matière, etc. Chaque variante a son propre stock, son propre prix éventuellement, et son propre code-barres (SKU).'),

            h2('Créer des variantes'),
            numbered('Dans la page d\'un produit, descendez jusqu\'à la section Variants.'),
            numbered('Cliquez sur Add options like size or color.'),
            numbered('Option name : ex. "Taille". Option values : S, M, L, XL (séparés par Entrée).'),
            numbered('Vous pouvez ajouter une deuxième option (ex. "Couleur") avec ses propres valeurs.'),
            numbered('Shopify génère automatiquement toutes les combinaisons (ex. S/Noir, S/Bleu, M/Noir…).'),
            numbered('Pour chaque variante, renseignez le stock dans la colonne "Available".'),
            numbered('Save.'),
            tip('Vous pouvez modifier le stock directement depuis la liste des produits sans ouvrir chaque fiche : Products → vue liste → colonne "Inventory".'),

            h2('Mettre à jour les stocks rapidement'),
            p('Quand vous recevez du stock (ou qu\'il faut ajuster après un événement physique) :'),
            numbered('Menu de gauche : Products → Inventory.'),
            numbered('Recherchez le produit.'),
            numbered('Cliquez sur le nombre dans la colonne "Available" et modifiez-le.'),
            numbered('La modification est enregistrée automatiquement.'),

            h2('Être alerté quand un produit est presque en rupture'),
            numbered('Ouvrez le produit.'),
            numbered('Section Inventory → cochez "Continue selling when out of stock" si vous voulez accepter des commandes même en rupture, ou décochez pour bloquer les ventes.'),
            tip('Shopify ne prévient pas automatiquement d\'une rupture. Prenez l\'habitude de regarder "Inventory" chaque semaine, ou installez l\'appli gratuite "Stocky" pour des alertes par email.'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 5. COMMANDES ===============
            h1('5. Gérer les commandes'),

            h2('Les différents statuts'),
            bulletBold('Paid (Payé)', ' — le client a payé, la commande attend d\'être préparée.'),
            bulletBold('Unfulfilled (Non expédié)', ' — les produits n\'ont pas encore été envoyés.'),
            bulletBold('Fulfilled (Expédié)', ' — vous avez marqué la commande comme envoyée.'),
            bulletBold('Refunded (Remboursé)', ' — la commande a été remboursée partiellement ou totalement.'),
            bulletBold('Cancelled (Annulée)', ' — la commande est annulée (ne jamais confondre avec Refunded).'),

            h2('Traiter une commande (étape par étape)'),
            numbered('Menu Orders → cliquez sur la commande.'),
            numbered('Vérifiez l\'adresse de livraison et les produits commandés.'),
            numbered('Préparez physiquement le colis.'),
            numbered('Dans Shopify, cliquez sur Fulfill items.'),
            numbered('Entrez le numéro de suivi du transporteur (tracking number) + nom du transporteur.'),
            numbered('Cochez "Send shipment details to customer" pour que le client reçoive automatiquement un email avec le suivi.'),
            numbered('Cliquez sur Fulfill items.'),

            h2('Rembourser une commande'),
            numbered('Ouvrez la commande.'),
            numbered('Cliquez sur Refund en haut à droite.'),
            numbered('Choisissez les articles à rembourser (partiel) ou tout (total).'),
            numbered('Ajoutez éventuellement un commentaire.'),
            numbered('Cliquez sur Refund.'),
            p('Le montant est recrédité automatiquement sur la carte bancaire du client (3 à 5 jours ouvrés côté banque).'),
            warning('Le remboursement est définitif. Si le client a fait une erreur, mieux vaut lui répondre par email d\'abord avant de rembourser.'),

            h2('Annuler une commande non payée'),
            p('Ne rembourse pas (la commande n\'a jamais été payée). Annuler ne fait que fermer la commande.'),
            numbered('Ouvrez la commande.'),
            numbered('Cliquez sur More actions → Cancel order.'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 6. CONTENU DU SITE (METAOBJECTS) ===============
            h1('6. Modifier le contenu visuel du site'),
            p('Certains éléments visuels du site Arno Polynice sont gérés depuis Shopify (pas uniquement dans le code). Cela vous permet de changer les photos de la page d\'accueil, de la section Vision, etc., sans avoir besoin d\'un développeur.'),
            p('Ces éléments sont appelés des "Metaobjects".'),

            h2('Où les trouver'),
            numbered('Menu de gauche : Content.'),
            numbered('Cliquez sur Metaobjects.'),
            numbered('Vous verrez la liste des types disponibles :'),
            bulletBold('hero_slide', ' — les grandes images qui défilent en haut de la page d\'accueil.'),
            bulletBold('vision_image', ' — l\'image de la section "Vision" sur la page d\'accueil.'),
            bulletBold('histoire_image', ' — les images affichées sur la page Notre Histoire.'),
            bulletBold('ethics_page', ' — le titre, l\'introduction et la citation de la page Notre Éthique.'),
            bulletBold('ethics_value', ' — les 4 engagements (Matières, Fabrication, Anti-gaspillage, Transparence) de la page Notre Éthique.'),

            h2('Modifier un hero slide (image d\'accueil)'),
            numbered('Metaobjects → hero_slide → cliquez sur l\'entrée existante à modifier.'),
            numbered('Remplacez l\'image (cliquez dessus → "Replace image").'),
            numbered('Modifiez le titre et le sous-titre si besoin.'),
            numbered('Save.'),
            p('Le site se met à jour automatiquement en quelques secondes (pas besoin de recompiler).'),
            tip('Format d\'image recommandé pour un hero slide : 1800×1000 pixels, format .jpg ou .webp, poids sous 500 Ko. Les photos très grandes (plus de 3 Mo) ralentiront le site.'),

            h2('Ajouter un nouveau hero slide'),
            numbered('Metaobjects → hero_slide → bouton Add entry.'),
            numbered('Uploadez la photo, remplissez le titre et le sous-titre.'),
            numbered('Save.'),

            h2('Modifier les images de Notre Histoire'),
            numbered('Metaobjects → histoire_image → sélectionnez l\'entrée à modifier.'),
            numbered('Remplacez l\'image comme précédemment.'),
            numbered('Save.'),
            warning('Les noms des entrées (ex. "01-hero", "02-haut") correspondent aux emplacements précis sur la page. Ne les renommez pas sans demander au développeur, sinon l\'image ne s\'affichera plus.'),

            h2('Modifier la page Notre Éthique (texte + citation)'),
            p('La page « Notre Éthique » est entièrement éditable depuis Shopify. Elle se compose de deux types d\'entrées :'),
            bulletBold('Ethics Page (1 entrée)', ' — le label "Nos engagements", le titre principal "Notre Éthique", l\'introduction sous le titre, et la citation finale + son auteur.'),
            bulletBold('Ethics Value (4 entrées)', ' — les 4 engagements affichés en grille (numéro, titre, description). Une entrée par engagement.'),

            h3('Modifier le titre, l\'intro ou la citation'),
            numbered('Metaobjects → Ethics Page → cliquez sur l\'entrée existante (il n\'y en a qu\'une).'),
            numbered('Modifiez les champs souhaités : Label, Title, Intro, Quote text, Quote author.'),
            numbered('Save.'),

            h3('Modifier un engagement (Matières, Fabrication, etc.)'),
            numbered('Metaobjects → Ethics Value → cliquez sur l\'entrée à modifier.'),
            numbered('Modifiez le titre (ex. "Matières Responsables") ou la description.'),
            numbered('Le champ Number contrôle le grand chiffre affiché à côté (ex. "01"). Le champ Position contrôle l\'ordre d\'affichage (1, 2, 3, 4).'),
            numbered('Save.'),

            h3('Ajouter ou supprimer un engagement'),
            p('Vous pouvez avoir plus ou moins de 4 engagements. Le site les affichera tous dans l\'ordre indiqué par le champ Position.'),
            numbered('Pour ajouter : Metaobjects → Ethics Value → bouton Add entry → remplissez Position (5, 6...), Number, Title, Text → Save.'),
            numbered('Pour supprimer : ouvrez l\'entrée → bouton ... → Delete entry.'),

            tip('Le site se met à jour automatiquement environ 5 minutes après vos modifications. Si vous ne voyez pas le changement immédiatement, attendez puis rafraîchissez.'),
            warning('Ne modifiez pas les "noms" internes des champs (label, title, intro, etc.). Vous ne pouvez modifier que leur contenu (la valeur saisie).'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 7. LIVRAISON ===============
            h1('7. Configurer la livraison'),

            h2('Les zones et tarifs'),
            numbered('Settings → Shipping and delivery.'),
            numbered('Vous verrez les "shipping zones" déjà configurées (ex. France métropolitaine, UE, Monde).'),
            numbered('Cliquez sur une zone pour voir ou modifier ses tarifs.'),

            h2('Ajouter un tarif de livraison'),
            numbered('Dans une zone → Add rate.'),
            numbered('Nom du tarif : ex. "Colissimo 48h".'),
            numbered('Prix : montant fixe (ex. 6.90 €) OU calculé par poids.'),
            numbered('Save.'),
            tip('Proposez un tarif "Livraison gratuite dès X €" pour inciter aux paniers plus gros : Add rate → cochez "Free shipping" + condition "Minimum order price".'),

            h2('Frais de port calculés par poids'),
            p('Si vos produits ont des poids très différents, la facturation au poids est plus juste. Dans le produit (section Shipping), indiquez le poids en grammes. Puis dans Shipping rates, choisissez "Use weight to calculate rate".'),

            h2('Emballer et expédier'),
            p('Shopify propose des intégrations directes avec Colissimo, Mondial Relay, UPS, Chronopost. Pour activer : Settings → Shipping → Carriers → Connect.'),
            p('Vous imprimez les étiquettes directement depuis Shopify, ce qui gagne beaucoup de temps.'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 8. CLIENTS ===============
            h1('8. Gérer les clients et la newsletter'),

            h2('Voir la liste des clients'),
            numbered('Menu Customers → liste de tous les clients qui ont commandé ou créé un compte.'),
            p('Vous pouvez cliquer sur un client pour voir son historique de commandes, son adresse, ses coordonnées.'),

            h2('Newsletter'),
            p('Les clients qui cochent "Inscrivez-vous à notre newsletter" sur le site apparaissent automatiquement avec le tag "Email subscriber".'),
            p('Pour leur envoyer un email marketing :'),
            numbered('Menu Marketing → Create campaign → Shopify Email.'),
            numbered('Choisissez un template, rédigez votre message.'),
            numbered('Sélectionnez le segment "Email subscribers".'),
            numbered('Send now ou Schedule pour programmer.'),
            tip('Shopify Email est gratuit jusqu\'à 10 000 emails/mois. Largement suffisant pour démarrer.'),

            h2('Exporter la liste des clients'),
            numbered('Customers → bouton Export en haut à droite.'),
            numbered('Choisissez "All customers" et le format CSV.'),
            p('Utile pour vos propres campagnes ou pour la comptabilité.'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 9. PROMOS ===============
            h1('9. Créer des promotions et codes promo'),

            h2('Code promo pourcentage (ex. -15%)'),
            numbered('Menu Discounts → Create discount → Amount off products.'),
            numbered('Method : Discount code.'),
            numbered('Code : ex. "BIENVENUE15" (c\'est ce que le client tapera).'),
            numbered('Value : Percentage → 15%.'),
            numbered('Applies to : All products OU certaines collections.'),
            numbered('Minimum purchase requirements : ex. 50 € minimum (facultatif).'),
            numbered('Customer eligibility : All customers OU segment spécifique.'),
            numbered('Usage limits : cochez "Limit to one per customer" pour éviter les abus.'),
            numbered('Active dates : date de début et de fin.'),
            numbered('Save.'),

            h2('Réduction automatique'),
            p('Au lieu d\'un code à taper, la réduction s\'applique automatiquement au panier (ex. -10% sur toute la collection été).'),
            numbered('Discounts → Create → Amount off products.'),
            numbered('Method : Automatic discount.'),
            numbered('Le reste est identique.'),

            h2('Livraison offerte'),
            numbered('Discounts → Create → Free shipping.'),
            numbered('Définissez le code et les conditions (ex. "GRATUIT49" minimum 49 €).'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 10. STATISTIQUES ===============
            h1('10. Voir les statistiques de vente'),

            h2('Vue d\'ensemble'),
            numbered('Menu Analytics → Dashboard.'),
            p('Vous voyez :'),
            bullet('Chiffre d\'affaires total (jour/semaine/mois/année)'),
            bullet('Nombre de commandes'),
            bullet('Taux de conversion (% de visiteurs qui achètent)'),
            bullet('Valeur moyenne d\'un panier'),
            bullet('Produits les plus vendus'),
            bullet('Origine du trafic (Instagram, Google, direct…)'),

            h2('Reports (rapports détaillés)'),
            p('Analytics → Reports. Rapports spécialisés : ventes par produit, par collection, par canal, retours, etc.'),

            h2('Lire le rapport "Live View"'),
            p('Analytics → Live view : vous voyez les visiteurs actuellement sur le site en temps réel, ce qu\'ils regardent, et les ventes qui se font. Utile pendant les opérations commerciales.'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 11. ASTUCES ===============
            h1('11. Astuces quotidiennes et bonnes pratiques'),

            h2('Rythme de gestion recommandé'),
            bulletBold('Tous les matins', ' — vérifier les nouvelles commandes et les expédier sous 48h.'),
            bulletBold('Une fois par semaine', ' — vérifier les stocks, réapprovisionner, mettre à jour les photos si besoin.'),
            bulletBold('Une fois par mois', ' — regarder les stats Analytics, identifier les best-sellers, éventuellement lancer une campagne newsletter.'),

            h2('Photos produit — les bonnes pratiques'),
            bullet('Format carré 1:1 ou portrait 4:5, haute définition (min 1500 px de largeur).'),
            bullet('Fond neutre (blanc, beige) pour les photos packshot.'),
            bullet('5 à 8 photos par produit : vue de face, de dos, de profil, détails (boutons, étiquettes), porté par un mannequin.'),
            bullet('Poids du fichier : sous 500 Ko idéalement. Compressez avec '),
            pMulti([
                new TextRun({ text: '         ', size: 18 }),
                new ExternalHyperlink({
                    link: 'https://squoosh.app',
                    children: [new TextRun({ text: 'squoosh.app', color: COLOR_LINK, underline: {} })],
                }),
                new TextRun(' (gratuit, dans le navigateur).'),
            ]),

            h2('Descriptions produit — structure efficace'),
            numbered('Une phrase d\'accroche (le style, l\'ambiance).'),
            numbered('Les caractéristiques techniques (matière, coupe, composition).'),
            numbered('Les conseils d\'entretien (lavage, repassage).'),
            numbered('Éventuellement l\'histoire du modèle (d\'où vient l\'inspiration).'),

            h2('Gérer les avis clients'),
            p('L\'app gratuite Shopify "Product Reviews" ajoute des étoiles et commentaires sur chaque fiche produit. Installation : Apps → visitez le Shopify App Store → recherchez "Product Reviews" (Shopify).'),

            h2('SEO — être visible sur Google'),
            bullet('Chaque produit a un champ "Search engine listing" en bas de sa fiche. Remplissez le titre (max 60 caractères) et la description (max 160 caractères).'),
            bullet('Utilisez des mots-clés simples : "chemise bicolore seersucker" plutôt que "ma merveilleuse chemise".'),
            bullet('Remplissez les "alt text" des photos (ce texte sert aux malvoyants et à Google).'),
            new Paragraph({ children: [new PageBreak()] }),

            // =============== 12. SUPPORT ===============
            h1('12. Support et contacts utiles'),

            h2('Support Shopify'),
            p('24h/24, 7j/7. Disponible en français.'),
            bullet('Chat : depuis votre Shopify Admin, bouton "Help" en bas à droite.'),
            bulletBold('Centre d\'aide : ', ''),
            pMulti([
                new TextRun('         '),
                new ExternalHyperlink({
                    link: 'https://help.shopify.com/fr',
                    children: [new TextRun({ text: 'help.shopify.com/fr', color: COLOR_LINK, underline: {} })],
                }),
            ]),
            bulletBold('Forum communauté : ', ''),
            pMulti([
                new TextRun('         '),
                new ExternalHyperlink({
                    link: 'https://community.shopify.com',
                    children: [new TextRun({ text: 'community.shopify.com', color: COLOR_LINK, underline: {} })],
                }),
            ]),

            h2('Besoin d\'une évolution du site ?'),
            p('Pour toute modification technique (nouvelle fonctionnalité, refonte d\'une page, bug) :'),
            bulletBold('NEXUS DEVELOPPEMENT', ''),
            bullet('Email : [à compléter]'),
            bullet('Téléphone : [à compléter]'),

            h2('Urgences'),
            p('En cas de problème critique (site inaccessible, bug de paiement) :'),
            numbered('Contactez d\'abord le support Shopify (chat).'),
            numbered('Prévenez NEXUS DEVELOPPEMENT en parallèle.'),
            numbered('Documentez le problème (captures d\'écran, heure, URL concernée).'),

            divider(),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 480 },
                children: [new TextRun({ text: 'Bonne réussite avec votre boutique !', italics: true, size: 24, color: COLOR_MUTED })],
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '— L\'équipe NEXUS DEVELOPPEMENT', size: 20, color: COLOR_MUTED })],
            }),
        ],
    }],
});

// --- Écriture du fichier ---
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(OUTPUT, buffer);
    const sizeKB = (buffer.length / 1024).toFixed(1);
    console.log(`✓ Guide généré : ${OUTPUT}`);
    console.log(`  Taille : ${sizeKB} KB`);
});
