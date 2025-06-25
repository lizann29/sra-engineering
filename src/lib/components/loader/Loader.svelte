<!-- src/lib/components/FullscreenLoader.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';

    interface Props {
        isLoading: boolean;
    }

    let { isLoading }: Props = $props();

    let progress = $state(0);
    let showContent = $state(false);

    onMount(() => {
        if (isLoading) {
            // Simulate loading progress
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(() => {
                        showContent = true;
                    }, 500);
                }
            }, 150);

            return () => clearInterval(interval);
        }
    });
</script>

{#if isLoading && !showContent}
    <div class="fixed inset-0 z-[9999] bg-slate-900 flex items-center justify-center overflow-hidden">
        <!-- Background video -->
        <video
                class="absolute inset-0 w-full h-full object-cover opacity-30"
                autoplay
                muted
                loop
                playsinline
        >
            <source src="{base}/videos/loader-bg.mp4" type="video/mp4">
            <source src="{base}/videos/loader-bg.webm" type="video/webm">
            <!-- Fallback background if video doesn't load -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-white to-slate-800"></div>
        </video>

        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-slate-900/70"></div>

        <!-- Loading content -->
        <div class="relative z-10 text-center">
            <!-- Animated logo -->
            <div class="mb-8 animate-pulse">
                <div class="relative mx-auto w-32 h-32 mb-6">
                    <div class="absolute inset-0 bg-gradient-to-r from-white to-blacl rounded-full opacity-20 animate-ping"></div>
                    <div class="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-6 flex items-center justify-center">
                        <img
                                src="{base}/images/logo.png"
                                alt="SRA Engineering"
                                class="h-16 w-16 object-contain filter brightness-110"
                        />
                    </div>
                </div>
            </div>

            <!-- Company name with animation -->
            <div class="mb-8">
                <h1 class="text-4xl md:text-6xl font-black text-white tracking-wider mb-2 animate-fade-in">
                    SRA ENGINEERING
                </h1>
                <div class="flex items-center justify-center space-x-4">
                    <div class="h-1 w-16 bg-gradient-to-r from-white to-black rounded-full animate-pulse"></div>
                    <span class="text-white/80 text-lg tracking-widest">HVAC SOLUTIONS</span>
                    <div class="h-1 w-16 bg-gradient-to-r from-white to-black rounded-full animate-pulse"></div>
                </div>
            </div>

            <!-- Progress bar -->
            <div class="mb-6 max-w-md mx-auto">
                <div class="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-white/30">
                    <div
                            class="h-full bg-gradient-to-r from-white to-black transition-all duration-300 ease-out rounded-full relative"
                            style="width: {progress}%"
                    >
                        <div class="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                </div>
                <div class="text-white/60 text-sm mt-2 font-medium">
                    Loading... {Math.round(progress)}%
                </div>
            </div>

            <!-- Loading text -->
            <p class="text-white/70 text-sm mt-4 tracking-wider">
                Preparing your experience...
            </p>
        </div>

        <!-- Corner decorations -->
<!--        <div class="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl"></div>-->
<!--        <div class="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl"></div>-->
    </div>
{/if}

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 1s ease-out;
    }

    /* Custom bounce delays */
    .animate-bounce:nth-child(2) {
        animation-delay: 0.1s;
    }
    .animate-bounce:nth-child(3) {
        animation-delay: 0.2s;
    }

    /* Ensure video covers properly */
    video {
        min-width: 100%;
        min-height: 100%;
    }
</style>