<!-- src/lib/components/Advantages.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { t } from '$lib/stores/translations.js';

    // Animation states for each card
    let visible = $state([false, false, false]);

    onMount(() => {
        // Trigger animations with slight delay between each card
        setTimeout(() => { visible[0] = true; }, 300);
        setTimeout(() => { visible[1] = true; }, 600);
        setTimeout(() => { visible[2] = true; }, 900);
    });

    const advantages = $derived([
        {
            title: $t('guarantee', 'Guarantee'),
            description: $t('guarantee_description', 'We faultlessly fulfill responsibilities taken, guaranteeing a careful attention to the customer\'s needs.'),
            accentColor: "steel",
            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        },
        {
            title: $t('support', 'Support'),
            description: $t('support_description', 'We accompany our customers at all stages of cooperation, providing a free visit of an engineer and an audit performance, following strict deadlines.'),
            accentColor: "charcoal",
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        },
        {
            title: $t('expertise', 'Expertise'),
            description: $t('expertise_description', 'We are proud to move on customer\'s infrastructure to a higher level of efficiency thanks to the implementation of our solutions.'),
            accentColor: "steel",
            icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        },
    ]);
</script>

<div class="advantages-container w-full py-20 px-4 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 relative overflow-hidden">

    <!-- Professional background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-slate-800 to-slate-600 rounded-full opacity-5 blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-full opacity-5 blur-3xl"></div>
        <div class="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full opacity-5 blur-2xl"></div>
    </div>

    <div class="relative z-10">
        <!-- Professional title -->
        <div class="text-center mb-16">
            <div class="inline-block mb-4">
                <div class="h-1 w-20 bg-zinc-700 mx-auto mb-6"></div>
                <h1 class="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
                    {$t('our_advantages', 'Our Advantages')}
                </h1>
                <p class="text-xl text-slate-600 font-medium">{$t('professional_engineering_solutions', 'Professional engineering solutions that deliver results')}</p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {#each advantages as advantage, index}
                <div class="relative group cursor-pointer transform transition-all duration-500 ease-out hover:-translate-y-2"
                     class:opacity-100={visible[index]}
                     class:opacity-0={!visible[index]}
                     class:translate-y-0={visible[index]}
                     class:translate-y-8={!visible[index]}>

                    <!-- Professional card -->
                    <div class="relative bg-white border border-slate-200 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-{advantage.accentColor}-500/30">

                        <!-- Icon container with professional styling -->
                        <div class="flex justify-center mb-6 relative">
                            <div class="relative p-4 bg-slate-100 rounded-full group-hover:bg-{advantage.accentColor}-50 transition-all duration-300">
                                <svg class="w-8 h-8 text-slate-700 group-hover:text-{advantage.accentColor}-600 transition-colors duration-300"
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="{advantage.icon}"></path>
                                </svg>
                            </div>
                            <!-- Accent indicator -->
                            <div class="absolute -top-1 -right-1 w-3 h-3 bg-{advantage.accentColor}-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <!-- Professional typography -->
                        <h2 class="text-2xl font-bold mb-4 text-slate-900 tracking-wide uppercase">
                            {advantage.title}
                        </h2>

                        <p class="text-slate-600 leading-relaxed font-medium mb-6">
                            {advantage.description}
                        </p>

                        <!-- Professional accent line -->
                        <div class="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div class="h-full bg-{advantage.accentColor}-600 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                        </div>

                        <!-- Professional corner accent -->
                        <div class="absolute top-4 right-4 w-1 h-6 bg-{advantage.accentColor}-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-y-0 group-hover:scale-y-100"></div>
                    </div>

                    <!-- Professional shadow effect -->
                    <div class="absolute inset-0 bg-gradient-to-br from-{advantage.accentColor}-600/5 to-slate-900/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl transform translate-y-2"></div>
                </div>
            {/each}
        </div>

        <!-- Professional bottom section -->
        <div class="text-center mt-16">
            <div class="inline-flex items-center space-x-4 bg-white border border-slate-200 rounded-full px-8 py-4 shadow-sm">
                <div class="w-2 h-2 bg-zinc-700 rounded-full"></div>
                <span class="text-slate-700 font-semibold uppercase tracking-wide text-sm">{$t('sra_engineering_excellence', 'SRA Engineering Excellence')}</span>
                <div class="w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>
        </div>
    </div>

    <!-- Subtle professional grid pattern -->
    <div class="absolute inset-0 opacity-[0.02] pointer-events-none"
         style="background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0); background-size: 20px 20px;">
    </div>
</div>

<style>
    .advantages-container {
        min-height: 80vh;
    }

    /* Professional hover effects */
    .group:hover {
        transform: translateY(-8px);
    }

    /* Specific color classes for dynamic colors */
    .bg-steel-50 {
        background-color: rgb(248 250 252);
    }
    .bg-charcoal-50 {
        background-color: rgb(249 250 251);
    }
    .text-steel-600 {
        color: rgb(71 85 105);
    }
    .text-charcoal-600 {
        color: rgb(55 65 81);
    }
    .bg-steel-600 {
        background-color: rgb(71 85 105);
    }
    .bg-charcoal-600 {
        background-color: rgb(55 65 81);
    }
    .border-steel-500\/30 {
        border-color: rgb(100 116 139 / 0.3);
    }
    .border-charcoal-500\/30 {
        border-color: rgb(75 85 99 / 0.3);
    }
    .from-steel-600\/5 {
        --tw-gradient-from: rgb(71 85 105 / 0.05);
    }
    .from-charcoal-600\/5 {
        --tw-gradient-from: rgb(55 65 81 / 0.05);
    }

    /* Professional animations */
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Enhanced typography */
    :global(.advantages-container h1, .advantages-container h2) {
        font-feature-settings: 'kern' 1, 'liga' 1;
        text-rendering: optimizeLegibility;
    }
</style>