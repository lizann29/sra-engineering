// translation-extractor.js
// Run this script to automatically extract and translate all text from your Svelte components

import fs from 'fs';
import path from 'path';
import { Translate } from '@google-cloud/translate/build/src/v2/index.js';

// Initialize Google Translate (you'll need to set up credentials)
const translate = new Translate({
    projectId: 'my-translation-website', // Your actual project ID
    keyFilename: './google-translate-key.json'// Your key file
});

// Target languages
const targetLanguages = ['ka', 'tr', 'ru']; // Georgian, Turkish, Russian
const languageNames = {
    'en': 'English',
    'ka': 'Georgian',
    'tr': 'Turkish',
    'ru': 'Russian'
};

// Text patterns to extract from Svelte files
const textPatterns = [
    // Text between HTML tags: <h1>Text here</h1>
    /<[^>]*>([^<]+)</g,
    // Text in attributes: title="Text here", alt="Text here", etc.
    /(?:title|alt|placeholder|aria-label)="([^"]+)"/g,
    // Text in JavaScript strings (for hardcoded text)
    /['"`]([^'"`]+)['"`]/g
];

// Common words to exclude (technical terms, variables, etc.)
const excludePatterns = [
    /^[0-9]+$/, // Pure numbers
    /^[a-zA-Z0-9\-_]+\.(jpg|jpeg|png|gif|svg|webp)$/i, // Image files
    /^\/[a-zA-Z0-9\-_\/]*$/, // URLs/paths
    /^[a-zA-Z0-9\-_]+$/, // Single words that might be variables
    /^(function|const|let|var|if|else|for|while|return|import|export|from|as)$/, // JS keywords
    /^(div|span|img|svg|path|button|input|form|select|option)$/i, // HTML tags
    /^(px|rem|em|vh|vw|%|deg|ms|s)$/, // CSS units
    /^(true|false|null|undefined)$/, // JS literals
    /^#[0-9a-fA-F]{3,6}$/, // Hex colors
    /^rgb\(|rgba\(|hsl\(|hsla\(/i, // CSS color functions
];

// Function to extract meaningful text from a string
function extractMeaningfulText(content) {
    const extractedTexts = new Set();

    // Extract text from different patterns
    textPatterns.forEach(pattern => {
        const matches = content.matchAll(pattern);
        for (const match of matches) {
            const text = match[1]?.trim();
            if (text && text.length > 2 && !excludePatterns.some(p => p.test(text))) {
                // Additional filters for meaningful text
                if (text.includes(' ') || text.length > 4) { // Multi-word or longer single words
                    extractedTexts.add(text);
                }
            }
        }
    });

    return Array.from(extractedTexts);
}

// Function to scan Svelte files and extract text
async function scanSvelteFiles(directory = './src/lib/components') {
    const allTexts = new Set();

    function scanDirectory(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                scanDirectory(filePath);
            } else if (file.endsWith('.svelte')) {
                console.log(`Scanning: ${filePath}`);
                const content = fs.readFileSync(filePath, 'utf-8');
                const texts = extractMeaningfulText(content);

                texts.forEach(text => allTexts.add(text));
                console.log(`Found ${texts.length} text strings in ${file}`);
            }
        });
    }

    scanDirectory(directory);
    return Array.from(allTexts);
}

// Function to translate texts
async function translateTexts(texts, targetLang) {
    console.log(`Translating ${texts.length} strings to ${languageNames[targetLang]}...`);

    const translations = {};
    const batchSize = 100; // Google Translate works better with smaller batches

    for (let i = 0; i < texts.length; i += batchSize) {
        const batch = texts.slice(i, i + batchSize);

        try {
            const [translatedBatch] = await translate.translate(batch, {
                from: 'en',
                to: targetLang
            });

            batch.forEach((originalText, index) => {
                translations[originalText] = Array.isArray(translatedBatch)
                    ? translatedBatch[index]
                    : translatedBatch;
            });

            console.log(`Translated batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(texts.length/batchSize)}`);

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
            console.error(`Error translating batch:`, error);
            // Fallback: add original text as translation
            batch.forEach(text => {
                translations[text] = text;
            });
        }
    }

    return translations;
}

// Function to create translation files
async function createTranslationFiles(texts) {
    const translations = {
        en: {}
    };

    // Create English base (original texts)
    texts.forEach(text => {
        const key = text.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 50); // Limit key length

        translations.en[key] = text;
    });

    // Translate to other languages
    for (const lang of targetLanguages) {
        console.log(`\nTranslating to ${languageNames[lang]}...`);
        const translatedTexts = await translateTexts(texts, lang);

        translations[lang] = {};
        texts.forEach(text => {
            const key = text.toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '_')
                .substring(0, 50);

            translations[lang][key] = translatedTexts[text] || text;
        });
    }

    // Write translation files
    Object.keys(translations).forEach(lang => {
        const filename = `./src/lib/translations/${lang}.json`;

        // Create directory if it doesn't exist
        const dir = path.dirname(filename);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(filename, JSON.stringify(translations[lang], null, 2));
        console.log(`Created translation file: ${filename}`);
    });

    return translations;
}

// Main execution function
async function main() {
    try {
        console.log('🔍 Scanning Svelte components for text...\n');

        const extractedTexts = await scanSvelteFiles();

        console.log(`\n📝 Found ${extractedTexts.length} unique text strings:`);
        console.log(extractedTexts.slice(0, 10).map(t => `  - "${t}"`).join('\n'));
        if (extractedTexts.length > 10) {
            console.log(`  ... and ${extractedTexts.length - 10} more`);
        }

        console.log('\n🌍 Starting translation process...');

        const translations = await createTranslationFiles(extractedTexts);

        console.log('\n✅ Translation complete!');
        console.log(`Created translation files for: ${Object.keys(translations).join(', ')}`);

        // Calculate cost estimate
        const totalChars = extractedTexts.join('').length * targetLanguages.length;
        const estimatedCost = totalChars < 500000 ? 'FREE' : `$${(totalChars * 0.00002).toFixed(2)}`;

        console.log(`\n💰 Estimated Google Translate cost: ${estimatedCost}`);
        console.log(`📊 Total characters translated: ${totalChars.toLocaleString()}`);

    } catch (error) {
        console.error('❌ Error during translation process:', error);
    }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}