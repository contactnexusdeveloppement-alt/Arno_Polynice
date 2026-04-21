/**
 * Génère l'acte de cession des droits d'auteur pour le site Arno Polynice.
 *
 * Complémente le contrat de prestation DEV-2026-002 du 21 mars 2026 en
 * respectant les mentions obligatoires de l'article L131-3 du Code de la
 * Propriété Intellectuelle.
 *
 * Usage : node scripts/generate-cession-droits.js
 * Sortie : C:\Users\lecha\OneDrive\Bureau\arno-polynice\Acte-Cession-Droits-Arno-Polynice.docx
 */

const fs = require('fs');
const path = require('path');
const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    LevelFormat,
    BorderStyle,
    PageBreak,
} = require('docx');

// -------------------- Helpers --------------------
const h1 = (text) =>
    new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, bold: true })],
    });

const h2 = (text) =>
    new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text, bold: true })],
    });

const p = (text, opts = {}) =>
    new Paragraph({
        alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [
            new TextRun({
                text,
                bold: opts.bold || false,
                italics: opts.italic || false,
                size: opts.size || 22,
            }),
        ],
    });

const pRich = (runs) =>
    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: runs.map((r) =>
            new TextRun({
                text: r.text,
                bold: r.bold || false,
                italics: r.italic || false,
                size: r.size || 22,
            })
        ),
    });

const bullet = (text) =>
    new Paragraph({
        numbering: { reference: 'bullets', level: 0 },
        spacing: { after: 80 },
        alignment: AlignmentType.JUSTIFIED,
        children: [new TextRun({ text, size: 22 })],
    });

const spacer = () =>
    new Paragraph({
        children: [new TextRun({ text: ' ', size: 22 })],
    });

const hr = () =>
    new Paragraph({
        border: {
            bottom: { color: '888888', space: 1, style: BorderStyle.SINGLE, size: 6 },
        },
    });

// -------------------- Construction du document --------------------
const children = [
    // Entête
    new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun({ text: 'NEXUS DÉVELOPPEMENT', bold: true, size: 24 }),
        ],
    }),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun({
                text: 'SARL au capital de 500 € — SIREN 995 394 095 — TVA FR49995394095',
                size: 18,
                italics: true,
            }),
        ],
    }),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun({
                text: '4 rue de la Ferme, 78990 Élancourt, France',
                size: 18,
                italics: true,
            }),
        ],
    }),
    spacer(),
    hr(),
    spacer(),

    // Titre
    h1("ACTE DE CESSION DES DROITS D'AUTEUR"),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        children: [
            new TextRun({
                text: 'Portant sur le site internet « Arno Polynice »',
                italics: true,
                size: 22,
            }),
        ],
    }),

    // Préambule
    h2('ENTRE LES SOUSSIGNÉS'),

    pRich([
        { text: 'La société ', size: 22 },
        { text: 'NEXUS DÉVELOPPEMENT', bold: true, size: 22 },
        {
            text: ", Société à Responsabilité Limitée au capital de 500 €, immatriculée au RCS sous le numéro 995 394 095, dont le siège social est situé 4 rue de la Ferme, 78990 Élancourt, France, représentée par M. Adam, agissant en qualité de Gérant et Représentant Légal,",
            size: 22,
        },
    ]),
    pRich([
        { text: 'Ci-après dénommée « ', size: 22 },
        { text: 'le Cédant', bold: true, size: 22 },
        { text: ' »,', size: 22 },
    ]),
    p("D'une part,"),
    spacer(),

    pRich([
        { text: 'ET', bold: true, size: 22 },
    ]),
    spacer(),

    pRich([
        { text: 'M. ', size: 22 },
        { text: 'Adelson PAUGAIN', bold: true, size: 22 },
        {
            text: ", exerçant en qualité d'Entrepreneur Individuel (EI), en cours d'immatriculation, domicilié 68 rue André Vitu, 88000 Épinal, France,",
            size: 22,
        },
    ]),
    pRich([
        { text: 'Ci-après dénommé « ', size: 22 },
        { text: 'le Cessionnaire', bold: true, size: 22 },
        { text: ' »,', size: 22 },
    ]),
    p("D'autre part,"),
    spacer(),

    pRich([
        {
            text: 'Ci-après désignés ensemble « les Parties » ou individuellement « la Partie ».',
            italic: true,
            size: 22,
        },
    ]),
    spacer(),

    // Préambule contextuel
    h2('IL A ÉTÉ PRÉALABLEMENT EXPOSÉ CE QUI SUIT'),

    pRich([
        {
            text: 'Dans le cadre du devis et contrat n° ',
            size: 22,
        },
        { text: 'DEV-2026-002', bold: true, size: 22 },
        {
            text: ' en date du 21 mars 2026, signé des deux Parties le 23 mars 2026, le Cédant a conçu et développé, pour le compte du Cessionnaire, un site internet e-commerce sur-mesure accessible aux adresses ',
            size: 22,
        },
        { text: 'www.arno-polynice.com', bold: true, size: 22 },
        { text: ' et ', size: 22 },
        { text: 'www.arno-polynice.fr', bold: true, size: 22 },
        {
            text: " (ci-après « le Site »), destiné à la commercialisation en ligne des créations de la marque « Arno Polynice ».",
            size: 22,
        },
    ]),
    p("Le présent acte a pour objet, en application des articles L.111-1, L.122-1 et suivants, et L.131-1 et suivants du Code de la Propriété Intellectuelle, d'organiser la cession, du Cédant au Cessionnaire, de l'ensemble des droits patrimoniaux d'auteur portant sur le Site, conformément aux mentions obligatoires de l'article L.131-3 du même Code."),
    p("Le présent acte vient compléter et préciser l'article 1.1 du contrat DEV-2026-002 dit « Clause de réserve de propriété »."),
    spacer(),

    // CECI ETANT EXPOSE
    pRich([
        { text: 'CECI EXPOSÉ, IL A ÉTÉ CONVENU ET ARRÊTÉ CE QUI SUIT', bold: true, size: 22 },
    ]),
    spacer(),

    // ARTICLE 1
    h2('ARTICLE 1 — OBJET DE LA CESSION'),
    p("Le Cédant cède, à titre exclusif, au Cessionnaire qui l'accepte, l'intégralité des droits patrimoniaux d'auteur portant sur les œuvres ci-après désignées, créées spécifiquement pour le Cessionnaire dans le cadre du contrat DEV-2026-002 (ci-après « les Œuvres ») :"),
    bullet("Le code source intégral du Site (front-end et back-end), incluant l'ensemble des fichiers, scripts, styles, configurations et schémas de données développés spécifiquement ;"),
    bullet("La structure et l'architecture logicielle du Site, incluant le paramétrage de l'hébergement Vercel, du back-office Shopify et des intégrations tierces ;"),
    bullet("Le design graphique, la charte visuelle, la typographie, la palette de couleurs, les maquettes et les gabarits de pages créés spécifiquement pour le Site ;"),
    bullet("Les éléments graphiques originaux conçus dans le cadre du projet (icônes, pictogrammes, mises en page, identité visuelle appliquée au Site) ;"),
    bullet("Les textes, rédactionnels et contenus éditoriaux produits par le Cédant pour le Site, dans la mesure où ils n'émanent pas du Cessionnaire ;"),
    bullet("La documentation technique et les guides d'utilisation produits par le Cédant, en ce compris le guide Shopify remis au Cessionnaire."),
    spacer(),

    // ARTICLE 2
    h2('ARTICLE 2 — NATURE ET ÉTENDUE DES DROITS CÉDÉS'),
    p("La présente cession porte sur l'intégralité des droits patrimoniaux reconnus à l'auteur par le Code de la Propriété Intellectuelle, et notamment :"),
    bullet("Le droit de reproduction : droit de reproduire ou faire reproduire les Œuvres, en tout ou partie, par tous procédés connus ou à venir, sur tous supports matériels ou immatériels, et en nombre illimité d'exemplaires ;"),
    bullet("Le droit de représentation : droit de communiquer ou faire communiquer les Œuvres au public, par tout procédé, filaire ou non, y compris la mise à disposition du public par tous réseaux de communication électronique ;"),
    bullet("Le droit d'adaptation, de modification et de transformation : droit d'adapter, modifier, transformer, faire évoluer, corriger, faire évoluer techniquement, porter sur d'autres environnements, intégrer à d'autres œuvres ou logiciels, refondre ou faire refondre tout ou partie des Œuvres ;"),
    bullet("Le droit de traduction : droit de traduire ou faire traduire les Œuvres en toutes langues ;"),
    bullet("Le droit d'exploitation commerciale : droit d'exploiter les Œuvres à titre commercial ou non commercial, y compris le droit de céder, concéder ou transférer à des tiers tout ou partie des droits cédés ;"),
    bullet("Le droit de retrait et de suspension : dans la mesure où il n'est pas incompatible avec les droits moraux du Cédant."),
    pRich([
        { text: 'La cession est ', size: 22 },
        { text: 'exclusive', bold: true, size: 22 },
        {
            text: ' : le Cédant s’interdit, pour la durée de la cession, d’exploiter ou de concéder à un tiers tout ou partie des droits cédés sur les Œuvres telles que livrées au Cessionnaire.',
            size: 22,
        },
    ]),
    spacer(),

    // ARTICLE 3
    h2('ARTICLE 3 — TERRITOIRE'),
    pRich([
        { text: 'La présente cession est consentie pour le ', size: 22 },
        { text: 'monde entier', bold: true, size: 22 },
        { text: ', tous pays sans exception et sans limitation territoriale.', size: 22 },
    ]),
    spacer(),

    // ARTICLE 4
    h2('ARTICLE 4 — DURÉE DE LA CESSION'),
    pRich([
        { text: "La présente cession est consentie pour toute la ", size: 22 },
        { text: 'durée légale de protection des droits d’auteur', bold: true, size: 22 },
        { text: ", telle que définie par le Code de la Propriété Intellectuelle français et les conventions internationales, soit la durée de la vie de l’auteur augmentée de soixante-dix (70) années suivant son décès.", size: 22 },
    ]),
    spacer(),

    // ARTICLE 5
    h2('ARTICLE 5 — DESTINATION ET MODES D’EXPLOITATION'),
    p("La cession est consentie pour toutes destinations, et en particulier pour les modes d’exploitation suivants :"),
    bullet("Exploitation commerciale du Site dans le cadre de l’activité e-commerce du Cessionnaire ;"),
    bullet("Diffusion du Site sur tout réseau de communication électronique, internet public, intranets, extranets, applications mobiles ;"),
    bullet("Communication et promotion de la marque « Arno Polynice » sur tous supports numériques et imprimés ;"),
    bullet("Intégration des Œuvres dans des supports tiers (marketplaces, réseaux sociaux, campagnes publicitaires) ;"),
    bullet("Adaptation des Œuvres aux évolutions techniques, juridiques ou commerciales de l’activité du Cessionnaire."),
    spacer(),

    // ARTICLE 6
    h2('ARTICLE 6 — PRIX DE LA CESSION'),
    pRich([
        { text: 'La présente cession est consentie à titre onéreux. Le prix de la cession est compris dans le forfait de création du Site, soit la somme de ', size: 22 },
        { text: 'cinq cents euros toutes taxes comprises (500,00 € TTC)', bold: true, size: 22 },
        { text: ", telle que prévue au devis et contrat DEV-2026-002 du 21 mars 2026. Les Parties reconnaissent que ce prix est forfaitaire, définitif et non révisable, et qu’il tient compte de l’étendue et de la durée des droits cédés.", size: 22 },
    ]),
    spacer(),

    // ARTICLE 7
    h2('ARTICLE 7 — CONDITION SUSPENSIVE — TRANSFERT EFFECTIF DES DROITS'),
    pRich([
        { text: "Conformément à l’article 1.1 du contrat DEV-2026-002, ", size: 22 },
        { text: 'la présente cession est soumise à la condition suspensive du paiement intégral et effectif par le Cessionnaire', bold: true, size: 22 },
        { text: " de l’ensemble des sommes dues au titre du forfait de création, soit 500,00 € TTC (acompte de 50 % et solde de 50 %).", size: 22 },
    ]),
    p("Le transfert effectif des droits patrimoniaux n’interviendra qu’à la date d’encaissement intégral par le Cédant du montant total de la facture de création. Jusqu’à cette date, le Cédant conserve la pleine propriété intellectuelle et matérielle des Œuvres."),
    p("Le Cessionnaire dispose toutefois, dès la mise en ligne du Site, d’une licence d’utilisation non exclusive et non transférable lui permettant l’exploitation normale du Site pendant la période intercalaire."),
    spacer(),

    // ARTICLE 8
    h2('ARTICLE 8 — GARANTIES DU CÉDANT'),
    p('Le Cédant garantit au Cessionnaire :'),
    bullet("Qu’il est titulaire exclusif des droits patrimoniaux cédés et qu’il a toute latitude pour procéder à la présente cession ;"),
    bullet("Que les Œuvres sont originales au sens du Code de la Propriété Intellectuelle et ne constituent ni une contrefaçon ni une reprise d’œuvres préexistantes appartenant à des tiers ;"),
    bullet("Que les Œuvres ne portent atteinte à aucun droit d’un tiers (droit d’auteur, droit des marques, droit à l’image, droits voisins, etc.) ;"),
    bullet("La jouissance paisible des droits cédés et s’engage à défendre le Cessionnaire contre toute action, revendication ou éviction émanant d’un tiers fondée sur l’antériorité ou la violation d’un droit de propriété intellectuelle."),
    spacer(),

    // ARTICLE 9
    h2('ARTICLE 9 — DROITS MORAUX'),
    p("Conformément à l’article L.121-1 du Code de la Propriété Intellectuelle, le Cédant conserve ses droits moraux sur les Œuvres, et notamment le droit à la paternité et le droit au respect de l’intégrité des Œuvres."),
    p("Le Cédant accepte néanmoins expressément que le Cessionnaire fasse évoluer le Site (ajouts de fonctionnalités, refonte graphique, modifications techniques) sans que ces évolutions puissent être considérées comme une atteinte au respect de l’œuvre, dès lors qu’elles correspondent à l’évolution normale d’un site e-commerce dans son environnement technique et commercial."),
    p("Le Cédant renonce à exiger la mention de sa paternité sur le Site, étant entendu qu’il conserve la faculté de faire figurer la mention « Conception & développement : Nexus Développement » dans les mentions légales ou le pied de page du Site, mention que le Cessionnaire s’engage à ne pas retirer pendant toute la durée du contrat de maintenance."),
    spacer(),

    // ARTICLE 10
    h2("ARTICLE 10 — ÉLÉMENTS TIERS ET LOGICIELS OPEN SOURCE"),
    p("Les Parties reconnaissent que le Site intègre des composants logiciels tiers qui restent la propriété de leurs auteurs respectifs et demeurent soumis à leurs propres conditions de licence. Il s’agit notamment, de manière non exhaustive :"),
    bullet("Des frameworks et bibliothèques open source (Next.js, React, Node.js, etc.) soumis à leurs licences respectives (MIT, Apache, ISC, etc.) ;"),
    bullet("Des polices de caractères et ressources graphiques sous licence libre utilisées dans le Site ;"),
    bullet("Des services tiers utilisés par le Site (Shopify, Vercel, Stripe, Infomaniak, etc.), dont l’usage reste soumis à leurs conditions générales respectives et aux abonnements souscrits directement par le Cessionnaire."),
    p("La présente cession ne peut en aucun cas être interprétée comme portant sur les droits afférents à ces composants tiers."),
    spacer(),

    // ARTICLE 11
    h2('ARTICLE 11 — LIVRABLES ET SUPPORTS REMIS'),
    p("Sous réserve du paiement intégral prévu à l’article 7 des présentes, le Cédant remet ou garantit l’accès au Cessionnaire aux éléments suivants :"),
    bullet("L’accès en lecture et/ou en administration au dépôt de code source du Site hébergé sur GitHub ;"),
    bullet("La propriété du back-office Shopify du Site et de ses données marchandes (produits, commandes, clients) ;"),
    bullet("La propriété et la gestion des noms de domaine arno-polynice.com et arno-polynice.fr enregistrés au nom du Cessionnaire ;"),
    bullet("Le guide d’utilisation Shopify et la documentation fonctionnelle associée."),
    p("Pendant la durée du contrat de maintenance mensuelle souscrit séparément, l’hébergement Vercel demeure géré par le Cédant. En cas de résiliation du contrat de maintenance, le Cédant s’engage à transférer au Cessionnaire, ou à tout tiers désigné par lui, la gestion de l’hébergement Vercel, dans un délai raisonnable et sans frais supplémentaires autres que ceux liés à la migration elle-même."),
    spacer(),

    // ARTICLE 12
    h2('ARTICLE 12 — INDÉPENDANCE DES STIPULATIONS'),
    p("Si l’une quelconque des stipulations du présent acte était déclarée nulle, inapplicable ou inopposable par une décision de justice devenue définitive, les autres stipulations conserveraient leur plein effet. Les Parties s’engageraient alors à négocier de bonne foi une stipulation de substitution aussi proche que possible de la stipulation invalidée, dans l’esprit du présent acte."),
    spacer(),

    // ARTICLE 13
    h2('ARTICLE 13 — DROIT APPLICABLE ET JURIDICTION COMPÉTENTE'),
    p("Le présent acte est soumis au droit français."),
    p("En cas de litige relatif à sa formation, son interprétation, son exécution ou sa cessation, et à défaut d’accord amiable dans un délai de trente (30) jours à compter de la notification écrite du différend par la Partie la plus diligente, les Parties conviennent expressément de soumettre leur différend au Tribunal de Commerce de Versailles, auquel elles attribuent compétence exclusive, nonobstant pluralité de défendeurs ou appel en garantie."),
    spacer(),

    // ARTICLE 14
    h2('ARTICLE 14 — DISPOSITIONS FINALES'),
    p("Le présent acte est établi en deux (2) exemplaires originaux, un pour chacune des Parties, qui reconnaissent en avoir reçu un exemplaire."),
    p("Il annule et remplace tout accord antérieur portant spécifiquement sur la cession des droits d’auteur, et complète, sans le modifier, le contrat de prestation DEV-2026-002."),
    spacer(),
    spacer(),

    // Signatures
    h2('SIGNATURES'),
    spacer(),
    p("Fait à ______________________, le ______________________,"),
    spacer(),
    p("En deux exemplaires originaux."),
    spacer(),
    spacer(),

    // Bloc signature 2 colonnes
    new Paragraph({
        children: [
            new TextRun({ text: 'Pour le Cédant,', bold: true, size: 22 }),
            new TextRun({ text: '\t\t\t\t\t\t', size: 22 }),
            new TextRun({ text: 'Pour le Cessionnaire,', bold: true, size: 22 }),
        ],
    }),
    new Paragraph({
        children: [
            new TextRun({ text: 'NEXUS DÉVELOPPEMENT', size: 22 }),
            new TextRun({ text: '\t\t\t\t\t', size: 22 }),
            new TextRun({ text: 'M. Adelson PAUGAIN', size: 22 }),
        ],
    }),
    new Paragraph({
        children: [
            new TextRun({ text: 'M. Adam, Gérant', italics: true, size: 20 }),
            new TextRun({ text: '\t\t\t\t\t\t\t', size: 22 }),
            new TextRun({ text: 'Entrepreneur Individuel', italics: true, size: 20 }),
        ],
    }),
    spacer(),
    new Paragraph({
        children: [
            new TextRun({
                text: 'Signature précédée de la mention « Lu et approuvé — Bon pour accord »',
                italics: true,
                size: 18,
            }),
        ],
    }),
    spacer(),
    spacer(),
    spacer(),
    spacer(),
    spacer(),
    spacer(),
    spacer(),
    spacer(),
    spacer(),
];

// -------------------- Document final --------------------
const doc = new Document({
    creator: 'Nexus Développement',
    title: "Acte de cession des droits d'auteur — Arno Polynice",
    description: "Acte de cession des droits patrimoniaux d'auteur portant sur le site www.arno-polynice.com",
    styles: {
        default: {
            document: {
                run: { font: 'Calibri', size: 22 },
            },
        },
        paragraphStyles: [
            {
                id: 'Heading1',
                name: 'Heading 1',
                basedOn: 'Normal',
                next: 'Normal',
                quickFormat: true,
                run: { size: 32, bold: true, font: 'Calibri' },
                paragraph: {
                    spacing: { before: 240, after: 240 },
                    outlineLevel: 0,
                },
            },
            {
                id: 'Heading2',
                name: 'Heading 2',
                basedOn: 'Normal',
                next: 'Normal',
                quickFormat: true,
                run: { size: 26, bold: true, font: 'Calibri' },
                paragraph: {
                    spacing: { before: 280, after: 140 },
                    outlineLevel: 1,
                },
            },
        ],
    },
    numbering: {
        config: [
            {
                reference: 'bullets',
                levels: [
                    {
                        level: 0,
                        format: LevelFormat.BULLET,
                        text: '\u2022',
                        alignment: AlignmentType.LEFT,
                        style: {
                            paragraph: { indent: { left: 720, hanging: 360 } },
                        },
                    },
                ],
            },
        ],
    },
    sections: [
        {
            properties: {
                page: {
                    size: {
                        width: 11906, // A4 (format français)
                        height: 16838,
                    },
                    margin: {
                        top: 1440,
                        right: 1440,
                        bottom: 1440,
                        left: 1440,
                    },
                },
            },
            children,
        },
    ],
});

// -------------------- Export --------------------
const OUTPUT_PATH = path.resolve(
    __dirname,
    '..',
    '..',
    'Acte-Cession-Droits-Arno-Polynice.docx'
);

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(OUTPUT_PATH, buffer);
    const stats = fs.statSync(OUTPUT_PATH);
    console.log(`✓ Acte généré : ${OUTPUT_PATH}`);
    console.log(`  Taille : ${(stats.size / 1024).toFixed(1)} Ko`);
});
