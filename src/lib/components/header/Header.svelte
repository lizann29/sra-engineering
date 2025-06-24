<!-- src/lib/components/Header.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import { enhance } from "$app/forms";
    import { t, setLanguage } from '$lib/stores/translations.js';
    import LanguageSwitcher from '../LanguageSwitcher.svelte';

    // Create derived nav items
    const navTitles = $derived({
        services: $t('services', 'Services'),
        projects: $t('projects', 'Projects'),
        aboutCompany: $t('about_company', 'About Company'),
        partners: $t('partners', 'Partners'),
        contacts: $t('contacts', 'Contacts')
    });

    const navItems = $derived([
        { title: navTitles.services, path: `/` },
        { title: navTitles.projects, path: `/projects` },
        { title: navTitles.aboutCompany, path: `/` },
        { title: navTitles.partners, path: `/` },
        { title: navTitles.contacts, path: `/` }
    ]);

    // Mobile menu state
    let isMenuOpen = $state(false);

    // Scroll state
    let isScrolled = $state(false);

    // Toggle mobile menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    // Close menu when clicking outside or on window resize
    onMount(() => {
        // Initialize scroll state immediately
        isScrolled = window.scrollY > 20;

        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMenuOpen) {
                isMenuOpen = false;
            }
        };

        // Handle scroll events
        const handleScroll = () => {
            isScrolled = window.scrollY > 20;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    });

    function submitOnChange(event) {
        const selectedLang = event.target.value;
        setLanguage(selectedLang);
        event.target.parentElement.submit();
    }
</script>

<header
        class="fixed w-full z-50 transition-all duration-300 ease-in-out"
        class:bg-black={isScrolled}
        class:bg-gradient-to-r={!isScrolled}
        class:from-black={!isScrolled}
        class:via-gray-900={!isScrolled}
        class:to-zinc-900={!isScrolled}
        class:shadow-2xl={isScrolled}
        class:backdrop-blur-sm={isScrolled}
>
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <div class="flex-shrink-0">
                <a href="{base}/" class="text-2xl font-bold transition-colors">
                    <img
                            src="{base}/images/logo.png"
                            alt={$t('company_logo', 'Company Logo')}
                            class="h-40 md:h-42 w-auto object-contain filter brightness-110 contrast-125"
                    >
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex space-x-8 align-middle content-center items-center">
                {#each navItems as item}
                    <a
                            href="{base}{item.path}"
                            class="text-gray-300 hover:text-white transition-all duration-200 font-semibold tracking-wider text-sm uppercase border-b-2 border-transparent hover:border-white pb-1 relative group"
                    >
                        {item.title}
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                {/each}
                <a
                        href="{base}/client"
                        class="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-none transition-all duration-200 font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl border-2 border-white hover:border-gray-200"
                >
                    {$t('become_a_client', 'Become a client')}
                </a>
            </nav>

            <!-- Language Switcher (Desktop) -->
            <div class="hidden lg:block">
                <LanguageSwitcher />
            </div>

            <!-- Mobile menu button -->
            <button
                    class="lg:hidden p-2 focus:outline-none transition-colors text-gray-300 hover:text-white"
                    on:click={toggleMenu}
                    aria-label={isMenuOpen ? $t('close_menu', 'Close menu') : $t('open_menu', 'Open menu')}
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    {#if isMenuOpen}
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    {:else}
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    {/if}
                </svg>
            </button>
        </div>

        <!-- Mobile menu -->
        {#if isMenuOpen}
            <div class="lg:hidden py-4 pb-6 border-t border-gray-700 bg-black/98 backdrop-blur-sm">
                <nav class="flex flex-col space-y-4">
                    {#each navItems as item}
                        <a
                                href="{base}{item.path}"
                                class="text-gray-300 hover:text-white py-3 transition-all duration-200 font-semibold tracking-wider text-sm uppercase border-l-4 border-transparent hover:border-white pl-4"
                                on:click={() => isMenuOpen = false}
                        >
                            {item.title}
                        </a>
                    {/each}
                    <a
                            href="{base}/client"
                            class="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-none transition-all duration-200 font-bold text-sm uppercase tracking-wider w-full text-center mt-6 shadow-lg border-2 border-white"
                            on:click={() => isMenuOpen = false}
                    >
                        {$t('become_a_client', 'Become a client')}
                    </a>

                    <!-- Language Switcher (Mobile) -->
                    <div class="pt-4 border-t border-gray-700 mt-4">
                        <LanguageSwitcher />
                    </div>
                </nav>
            </div>
        {/if}
    </div>
</header>

<!-- Spacer to prevent content from going under the fixed header -->
<div class="h-20"></div>