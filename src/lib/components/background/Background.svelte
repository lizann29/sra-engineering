<!-- src/lib/components/BackgroundSlideshow.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import { t } from '$lib/stores/translations.js';

    // Derived translations for alt text
    const imageAlts = $derived({
        industrial: $t('industrial_processing_equipment', 'Industrial Processing Equipment'),
        valve: $t('valve_control_systems', 'Valve Control Systems'),
        processing: $t('large_scale_processing', 'Large Scale Processing'),
        fire: $t('fire_suppression_systems', 'Fire Suppression Systems'),
        hvac: $t('hvac_systems', 'HVAC Systems'),
        mechanical: $t('mechanical_engineering', 'Mechanical Engineering')
    });

    // Project images with translations
    const projectImages = $derived([
        { id: 1, src: `${base}/images/project1.jpeg`, alt: imageAlts.industrial },
        { id: 2, src: `${base}/images/project2.jpeg`, alt: imageAlts.valve },
        { id: 3, src: `${base}/images/project3.jpeg`, alt: imageAlts.processing },
        { id: 4, src: `${base}/images/project4.jpeg`, alt: imageAlts.fire },
        { id: 5, src: `${base}/images/project5.jpeg`, alt: imageAlts.hvac },
        { id: 6, src: `${base}/images/project6.jpeg`, alt: imageAlts.mechanical }
    ]);

    let currentSlide = $state(0);

    // Auto-advance slides with longer duration for Ken Burns effect
    onMount(() => {
        const timer = setInterval(() => {
            currentSlide = (currentSlide + 1) % projectImages.length;
        }, 8000); // 8 seconds to enjoy the zoom effect

        return () => clearInterval(timer);
    });
</script>

<section class="relative w-full h-screen overflow-hidden">
    <!-- Background Image Slideshow with Ken Burns Effect -->
    <div class="absolute inset-0">
        {#each projectImages as image, index}
            <div
                    class="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out {index === currentSlide ? 'opacity-100' : 'opacity-0'}"
            >
                <div
                        class="w-full h-full bg-cover bg-center bg-no-repeat transform transition-transform duration-[8000ms] ease-in-out ken-burns {index === currentSlide ? 'scale-110' : 'scale-100'}"
                        style="background-image: url('{image.src}'); background-position: {index % 2 === 0 ? 'center top' : 'center bottom'};"
                        aria-label={image.alt}
                ></div>
            </div>
        {/each}
    </div>

    <!-- Dark Professional Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/70"></div>

    <!-- Content -->
    <div class="relative z-10 h-full flex items-center justify-center">
        <div class="text-center">

            <!-- Main Title -->
            <div class="mb-8">
                <h1 class="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-wider mb-4">
                    {$t('hvac', 'HVAC')}
                </h1>
                <div class="flex items-center justify-center space-x-6">
                    <div class="h-1 w-20 bg-red-600"></div>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-widest">
                        {$t('sra_engineering', 'SRA ENGINEERING')}
                    </h2>
                    <div class="h-1 w-20 bg-red-600"></div>
                </div>
            </div>

            <!-- Subtle Animation -->
            <div class="animate-pulse">
                <div class="w-2 h-2 bg-red-600 rounded-full mx-auto"></div>
            </div>

        </div>
    </div>

    <!-- Subtle Slide Indicators - Bottom Center -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div class="flex space-x-2">
            {#each projectImages as _, index}
                <div
                        class="w-2 h-2 rounded-full transition-all duration-500 {index === currentSlide ? 'bg-red-600 w-8' : 'bg-white/30'}"
                ></div>
            {/each}
        </div>
    </div>

    <!-- Animated Border Effect -->
    <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
</section>

<style>
    /* Ken Burns effect classes */
    .ken-burns {
        transition: transform 8000ms ease-in-out;
    }

    .scale-110 {
        transform: scale(1.1);
    }

    .scale-100 {
        transform: scale(1.0);
    }

    /* Custom duration classes */
    .duration-\[2000ms\] {
        transition-duration: 2000ms;
    }

    .duration-\[8000ms\] {
        transition-duration: 8000ms;
    }

    /* Additional Ken Burns variations for more dynamic effect */
    .ken-burns:nth-child(odd) {
        transform-origin: top left;
    }

    .ken-burns:nth-child(even) {
        transform-origin: bottom right;
    }
</style>