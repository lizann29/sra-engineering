<!-- src/lib/components/BackgroundSlideshow.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';

    // Project images - შენი ნამდვილი ფოტოების array
    const projectImages = [
        { id: 1, src: "/images/project1.jpeg", alt: "Industrial Processing Equipment" },
        { id: 2, src: "/images/project2.jpeg", alt: "Valve Control Systems" },
        { id: 3, src: "/images/project3.jpeg", alt: "Large Scale Processing" },
        { id: 4, src: "/images/project4.jpeg", alt: "Fire Suppression Systems" },
        { id: 5, src: "/images/project5.jpeg", alt: "HVAC Systems" },
        { id: 6, src: "/images/project6.jpeg", alt: "Mechanical Engineering" }
    ];

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
                    HVAC
                </h1>
                <div class="flex items-center justify-center space-x-6">
                    <div class="h-1 w-20 bg-red-600"></div>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-widest">
                        SRA ENGINEERING
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