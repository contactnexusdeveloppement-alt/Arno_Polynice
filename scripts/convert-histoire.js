/**
 * Convertit les images de /public/images/histoire-new/ vers /public/images/histoire/ en WebP.
 * Redimensionne selon le type (portrait grande, carré) et compresse en quality 82.
 *
 * Usage : node scripts/convert-histoire.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'public', 'images', 'histoire-new');
const DEST_DIR = path.join(__dirname, '..', 'public', 'images', 'histoire');

// Map fichier source -> { maxWidth, label }
const FILES = [
    { in: '01-hero.jpg', out: '01-hero.webp', maxWidth: 1400 },
    { in: '02-haut.jpg', out: '02-haut.webp', maxWidth: 1400 },
    { in: '02-bg.jpg', out: '02-bg.webp', maxWidth: 900 },
    // 02-bd : pas d'image, reste en placeholder
    { in: '03-adn.jpg', out: '03-adn.webp', maxWidth: 1400 },
    { in: '04-main.JPG', out: '04-main.webp', maxWidth: 1400 },
    { in: '04-hd.JPG', out: '04-hd.webp', maxWidth: 900 },
    { in: '04-bd.JPG', out: '04-bd.webp', maxWidth: 900 },
    { in: '05-haut.jpg', out: '05-haut.webp', maxWidth: 1400 },
    { in: '05-bg.jpg', out: '05-bg.webp', maxWidth: 900 },
    { in: '05-bd.jpg', out: '05-bd.webp', maxWidth: 900 },
    { in: '06-nouvelle.jpg', out: '06-nouvelle.webp', maxWidth: 1400 },
];

(async () => {
    if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR, { recursive: true });
    }

    let totalIn = 0;
    let totalOut = 0;

    for (const file of FILES) {
        const inputPath = path.join(SRC_DIR, file.in);
        const outputPath = path.join(DEST_DIR, file.out);

        if (!fs.existsSync(inputPath)) {
            console.warn(`SKIP ${file.in} (introuvable)`);
            continue;
        }

        const inputSize = fs.statSync(inputPath).size;
        const meta = await sharp(inputPath).metadata();

        await sharp(inputPath)
            .rotate() // respecte EXIF orientation
            .resize({
                width: file.maxWidth,
                height: undefined,
                fit: 'inside',
                withoutEnlargement: true,
            })
            .webp({ quality: 82, effort: 5 })
            .toFile(outputPath);

        const outputSize = fs.statSync(outputPath).size;
        const newMeta = await sharp(outputPath).metadata();

        const inMB = (inputSize / 1024 / 1024).toFixed(2);
        const outKB = (outputSize / 1024).toFixed(0);
        const ratio = ((1 - outputSize / inputSize) * 100).toFixed(0);

        console.log(
            `${file.out.padEnd(20)} ${meta.width}x${meta.height} (${inMB} MB) → ${newMeta.width}x${newMeta.height} (${outKB} KB) -${ratio}%`
        );

        totalIn += inputSize;
        totalOut += outputSize;
    }

    console.log(
        `\nTotal : ${(totalIn / 1024 / 1024).toFixed(2)} MB → ${(totalOut / 1024 / 1024).toFixed(2)} MB (-${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`
    );
})();
