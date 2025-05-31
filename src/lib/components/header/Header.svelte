<!-- src/lib/components/Header.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';

    const navItems = $state([
        { title: 'Services', path: `/` },
        { title: 'Projects', path: `/projects` },
        { title: 'About Company', path: `/` },
        { title: 'Partners', path: `/` },
        { title: 'Contacts', path: `/` }
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
</script>

<header
        class="fixed w-full z-50 transition-all duration-300 ease-in-out"
        class:bg-slate-900={isScrolled}
        class:bg-gradient-to-r={!isScrolled}
        class:from-slate-900={!isScrolled}
        class:via-blue-900={!isScrolled}
        class:to-slate-800={!isScrolled}
        class:shadow-xl={isScrolled}
        class:backdrop-blur-sm={isScrolled}
>
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <div class="flex-shrink-0">
                <a href="/" class="text-2xl font-bold transition-colors">
                    <img
                            src="/images/logo.png"
                            alt="Company Logo"
                            class="h-40 md:h-42 w-auto object-contain filter brightness-110"
                    >
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex space-x-8 align-middle content-center items-center">
                {#each navItems as item}
                    <a
                            href={item.path}
                            class="text-white hover:text-red-400 transition-all duration-200 font-medium tracking-wide text-sm uppercase border-b-2 border-transparent hover:border-red-400 pb-1"
                    >
                        {item.title}
                    </a>
                {/each}
                <a
                        href="/client"
                        class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-sm transition-all duration-200 font-semibold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl border border-red-600 hover:border-red-700"
                >
                    Become a client
                </a>
            </nav>

            <!-- Language Switcher (Desktop) -->
            <div class="hidden lg:block">
                <!--                <LanguageSwitcher />-->
            </div>

            <!-- Mobile menu button -->
            <button
                    class="lg:hidden p-2 focus:outline-none transition-colors text-white hover:text-red-400"
                    on:click={toggleMenu}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
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
            <div class="lg:hidden py-4 pb-6 border-t border-slate-700 bg-slate-900/95 backdrop-blur-sm">
                <nav class="flex flex-col space-y-4">
                    {#each navItems as item}
                        <a
                                href={item.path}
                                class="text-white hover:text-red-400 py-3 transition-all duration-200 font-medium tracking-wide text-sm uppercase border-l-4 border-transparent hover:border-red-400 pl-4"
                                on:click={() => isMenuOpen = false}
                        >
                            {item.title}
                        </a>
                    {/each}
                    <a
                            href="/client"
                            class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-sm transition-all duration-200 font-semibold text-sm uppercase tracking-wide w-full text-center mt-6 shadow-lg border border-red-600"
                            on:click={() => isMenuOpen = false}
                    >
                        Become a client
                    </a>

                    <!-- Language Switcher (Mobile) -->
                    <div class="pt-4 border-t border-slate-700 mt-4">
                        <!--                        <LanguageSwitcher />-->
                    </div>
                </nav>
            </div>
        {/if}
    </div>
</header>

<!-- Spacer to prevent content from going under the fixed header -->
<div class="h-20"></div>