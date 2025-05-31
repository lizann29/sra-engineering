<!-- src/lib/components/AboutUs.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';

    // Animation trigger for elements
    let isVisible = $state(false);
    let currentSlide = $state(0);

    // Project images for background slideshow
    const projectImages = [
        { id: 1, src: `${base}/images/project1.jpg`, alt: "Industrial Processing Equipment" },
        { id: 2, src: `${base}/images/project2.jpg`, alt: "Valve Control Systems" },
        { id: 3, src: `${base}/images/project3.jpg`, alt: "Large Scale Processing" },
        { id: 4, src: `${base}/images/project4.jpg`, alt: "Fire Suppression Systems" },
        { id: 5, src: `${base}/images/project5.jpg`, alt: "HVAC Systems" },
        { id: 6, src: `${base}/images/project6.jpg`, alt: "Mechanical Engineering" }
    ];

    onMount(() => {
        // Trigger animations after component loads
        setTimeout(() => {
            isVisible = true;
        }, 300);

        // Auto-advance slides with Ken Burns effect
        const timer = setInterval(() => {
            currentSlide = (currentSlide + 1) % projectImages.length;
        }, 8000); // 8 seconds per slide

        return () => clearInterval(timer);
    });
</script>

<div class="w-full font-sans">
    <!-- Header banner with Background Slideshow -->
    <div class="w-full min-h-[70vh] relative overflow-hidden shadow-2xl">

        <!-- Background Image Slideshow with Ken Burns Effect -->
        <div class="absolute inset-0">
            {#each projectImages as image, index}
                <div class="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out {index === currentSlide ? 'opacity-100' : 'opacity-0'}">
                    <div
                            class="w-full h-full bg-cover bg-center bg-no-repeat transform transition-transform duration-[8000ms] ease-in-out ken-burns {index === currentSlide ? 'scale-110' : 'scale-100'}"
                            style="background-image: url('{image.src}'); background-position: {index % 2 === 0 ? 'center top' : 'center bottom'};"
                    ></div>
                </div>
            {/each}
        </div>

        <!-- Professional Dark Overlay with Gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-slate-800/80"></div>

        <!-- Enhanced diagonal overlay for visual interest -->
        <div class="absolute inset-0">
            <div class="absolute top-0 right-0 bottom-0 w-2/3 bg-gradient-to-br from-blue-900/30 to-slate-900/50 transform origin-top-right"
                 style="clip-path: polygon(100% 0, 20% 0, 100% 100%);">
            </div>
        </div>

        <!-- Decorative elements with professional colors -->
        <div class="absolute left-0 top-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-red-500/10 to-red-300/10 blur-3xl"></div>
        <div class="absolute right-0 bottom-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-300/10 blur-3xl"></div>

        <div class="container relative z-10 h-full mx-auto px-6 md:px-12 py-20 md:py-28">
            <div class="flex flex-col md:flex-row md:items-center h-full gap-16">
                <!-- Left Side Content (Vision) with professional styling -->
                <div class="text-white w-full md:w-1/2 pr-0 md:pr-8 mb-12 md:mb-0 transform transition-all duration-1000"
                     class:translate-y-0={isVisible} class:opacity-100={isVisible} class:translate-y-10={!isVisible}
                     class:opacity-0={!isVisible}>
                    <div class="relative mb-2">
                        <span class="inline-block h-1 w-12 bg-red-500 mb-2"></span>
                        <h2 class="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">Our <span class="text-red-400">Vision</span></h2>
                    </div>
                    <p class="text-xl leading-relaxed tracking-wide text-gray-200 font-light">
                        To become a leading and preferred company in mechanical and electrical installations for buildings by
                        delivering <span class="font-semibold text-white">innovative, sustainable, and reliable</span> solutions.
                    </p>

                    <!-- Enhanced visual element with professional styling -->
                    <div class="mt-8 bg-white/10 backdrop-blur-sm border-l-4 border-red-500 p-4 rounded-r-lg shadow-lg">
                        <p class="text-red-200 italic font-medium">
                            "Building tomorrow's infrastructure with today's innovation"
                        </p>
                    </div>
                </div>

                <!-- Right Side Content (Mission) with professional styling -->
                <div class="text-white w-full md:w-1/2 pl-0 md:pl-8 mt-8 md:mt-0 transform transition-all duration-1000 delay-300"
                     class:translate-y-0={isVisible} class:opacity-100={isVisible} class:translate-y-10={!isVisible}
                     class:opacity-0={!isVisible}>
                    <div class="relative mb-2">
                        <span class="inline-block h-1 w-12 bg-blue-400 mb-2"></span>
                        <h2 class="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">Our <span class="text-blue-400">Mission</span></h2>
                    </div>
                    <p class="text-xl leading-relaxed tracking-wide text-gray-200 font-light">
                        To design and implement high-quality, safe, and environmentally responsible <span class="font-semibold text-white">mechanical and electrical</span>
                        systems in line with engineering principles, while always prioritizing customer satisfaction.
                    </p>

                    <!-- Enhanced visual elements with professional styling -->
                    <div class="mt-8 flex flex-wrap gap-3">
                        <span class="px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 rounded-full text-sm font-medium backdrop-blur-sm">Sustainability</span>
                        <span class="px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 rounded-full text-sm font-medium backdrop-blur-sm">Innovation</span>
                        <span class="px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 rounded-full text-sm font-medium backdrop-blur-sm">Excellence</span>
                    </div>

                    <div class="mt-10 flex justify-center md:justify-end transform transition-all duration-1000 delay-500"
                         class:translate-y-0={isVisible} class:opacity-100={isVisible} class:translate-y-5={!isVisible}
                         class:opacity-0={!isVisible}>
                        <div class="relative group">
                            <div class="absolute -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                            <div class="relative p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                                <img src="{base}/logo/sra.png" alt="SRA Engineering Logo"
                                     class="h-16 md:h-20 transform transition-all duration-500 hover:scale-105 filter brightness-110" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Subtle Slide Indicators -->
        <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <div class="flex space-x-2">
                {#each projectImages as _, index}
                    <div class="w-2 h-2 rounded-full transition-all duration-500 {index === currentSlide ? 'bg-red-500 w-8' : 'bg-white/30'}"></div>
                {/each}
            </div>
        </div>
    </div>
</div>

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

    /* Ken Burns variations for dynamic effect */
    .ken-burns:nth-child(odd) {
        transform-origin: top left;
    }

    .ken-burns:nth-child(even) {
        transform-origin: bottom right;
    }

    /* Smooth animations */
    :global(body) {
        overflow-x: hidden;
    }

    /* Professional hover effects */
    .text-red-400, .text-blue-400 {
        transition: all 0.3s ease;
    }

    /* Font enhancements */
    :global(html) {
        font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>