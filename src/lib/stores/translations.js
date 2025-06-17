// src/lib/stores/translations.js
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Create a store for current language
export const currentLang = writable('en');

// Store for all translations
export const translations = writable({});

// Load translations dynamically
async function loadTranslations(lang) {
    try {
        const translationModule = await import(`../translations/${lang}.json`);
        return translationModule.default;
    } catch (error) {
        console.warn(`Could not load translations for ${lang}, falling back to English`);
        const fallback = await import(`../translations/en.json`);
        return fallback.default;
    }
}

// Initialize translations
export async function initTranslations(initialLang = 'en') {
    // Load all translation files
    const langs = ['en', 'ka', 'tr', 'ru'];
    const allTranslations = {};

    for (const lang of langs) {
        allTranslations[lang] = await loadTranslations(lang);
    }

    translations.set(allTranslations);
    currentLang.set(initialLang);
}

// Derived store for current translations
export const t = derived(
    [translations, currentLang],
    ([$translations, $currentLang]) => {
        const currentTranslations = $translations[$currentLang] || $translations['en'] || {};

        return (key, fallback = key) => {
            // Try to find translation by key
            if (currentTranslations[key]) {
                return currentTranslations[key];
            }

            // Try to find by searching for the fallback text in the original language
            const englishTranslations = $translations['en'] || {};
            const foundKey = Object.keys(englishTranslations).find(k =>
                englishTranslations[k] === fallback
            );

            if (foundKey && currentTranslations[foundKey]) {
                return currentTranslations[foundKey];
            }

            // Return fallback (original text)
            return fallback;
        };
    }
);

// Helper function to change language
export function setLanguage(lang) {
    currentLang.set(lang);
    if (browser) {
        localStorage.setItem('preferred-language', lang);
    }
}

// Helper function to get stored language preference
export function getStoredLanguage() {
    if (browser) {
        return localStorage.getItem('preferred-language') || 'en';
    }
    return 'en';
}