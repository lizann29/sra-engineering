<!-- src/lib/components/LanguageSwitcher.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { currentLang, setLanguage, t } from '$lib/stores/translations.js';

    interface Props {
        currentLanguage?: string;
    }

    let { currentLanguage = $bindable() }: Props = $props();

    const dispatch = createEventDispatcher();

    // Get current language from store if not provided
    if (!currentLanguage) {
        currentLanguage = $currentLang;
    }

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ka', name: 'ქართული', flag: '🇬🇪' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' }
    ];

    function changeLanguage(langCode: string) {
        currentLanguage = langCode;
        setLanguage(langCode); // Update the translation store
        dispatch('languageChanged', { language: langCode });
    }
</script>

<div class="relative">
    <select
            value={currentLanguage}
            on:change={(e) => changeLanguage(e.target.value)}
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none"
    >
        {#each languages as lang}
            <option value={lang.code} class="bg-gray-800">
                {lang.flag} {lang.name}
            </option>
        {/each}
    </select>
</div>

<style>
    select {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5rem;
    }
</style>