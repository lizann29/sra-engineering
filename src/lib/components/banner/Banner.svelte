<!-- src/lib/components/HeroBanner.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { t } from '$lib/stores/translations.js';

    let isVisible = $state(false);

    onMount(() => {
        setTimeout(() => {
            isVisible = true;
        }, 300);
    });
</script>

<div class="relative w-full h-64 md:h-80 overflow-hidden">
    <!-- Main diagonal background -->
    <div class="absolute inset-0">
        <!-- Left side - darker -->
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900"></div>

        <!-- Right diagonal section -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 transform origin-top-right"
             style="clip-path: polygon(60% 0, 100% 0, 100% 100%, 40% 100%);"></div>
    </div>

    <!-- Content container -->
    <div class="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div class="flex justify-between items-center w-full">

            <!-- Left content -->
            <div class="text-white transform transition-all duration-1000 ease-out"
                 class:translate-x-0={isVisible} class:opacity-100={isVisible}
                 class:-translate-x-8={!isVisible} class:opacity-0={!isVisible}>

                <div class="mb-2">
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
                        {$t('company', 'COMPANY')} <span class="text-red-400">"{$t('sra_engineering', 'SRA ENGINEERING')}"</span>
                    </h1>
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-blue-200 tracking-wide">
                        {$t('professional_hvac_solutions', 'Professional HVAC Solutions')}
                    </h2>
                </div>

                <!-- Subtitle with professional styling -->
                <div class="mt-4 flex items-center space-x-4">
                    <div class="h-1 w-12 bg-red-500"></div>
                    <p class="text-lg text-gray-200 font-medium uppercase tracking-widest">
                        {$t('excellence_in_engineering', 'Excellence in Engineering')}
                    </p>
                </div>
            </div>

            <!-- Right logo section -->
            <div class="hidden md:block transform transition-all duration-1000 ease-out delay-300"
                 class:translate-x-0={isVisible} class:opacity-100={isVisible}
                 class:translate-x-8={!isVisible} class:opacity-0={!isVisible}>

                <div class="relative">
                    <!-- Logo background with professional styling -->
                    <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-xl">
                        <div class="text-center">
                            <!-- Main logo text -->
                            <div class="text-white font-black text-3xl lg:text-4xl tracking-wider mb-2">
                                SRA
                            </div>
                            <div class="text-white font-bold text-sm lg:text-base tracking-widest">
                                {$t('engineering', 'ENGINEERING')}
                            </div>

                            <!-- Professional accent lines -->
                            <div class="mt-3 flex justify-center space-x-1">
                                <div class="w-6 h-px bg-red-500"></div>
                                <div class="w-6 h-px bg-blue-400"></div>
                                <div class="w-6 h-px bg-red-500"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Glow effect -->
                    <div class="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-lg blur-lg opacity-50"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>

    <!-- Professional pattern overlay -->
    <div class="absolute inset-0 opacity-5 pointer-events-none"
         style="background-image: url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M0 0h40v40H0V0zm20 20a20 20 0 1 1 0-40 20 20 0 0 1 0 40z\'/%3E%3C/g%3E%3C/svg%3E');"></div>
</div>

<style>
    /* Professional animations */
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Enhanced typography */
    :global(.hero-banner h1, .hero-banner h2) {
        font-feature-settings: 'kern' 1, 'liga' 1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    /* Responsive text scaling */
    @media (max-width: 768px) {
        .container {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
</style>