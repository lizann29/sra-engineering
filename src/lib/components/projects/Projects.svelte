<!-- Projects.svelte -->
<script lang="ts">
    import { base } from '$app/paths';
    import { fly } from 'svelte/transition';
    import ProjectModal from './ProjectModal.svelte';

    // Import your projects data
    import projectsData from '$lib/data/projects.json';

    // Separate image arrays for each facility type
    const facilityImages = {
        'energy facility': [
            '/images/energy-9.jpeg',
            '/images/energy-20.jpeg',
            '/images/energy-17.jpeg',
            '/images/energy-12.jpeg',
            '/images/energy-6.jpeg',
            '/images/energy-4.jpeg'
        ],
        'structural works': [
            '/images/structural-work.jpeg',
            '/images/structural-work-1.jpeg',
            '/images/structural-work-2.jpeg',
            '/images/structural-work-3.jpeg',
            '/images/structural-work-4.jpeg',
            '/images/structural-work-5.jpeg',
            '/images/structural-work-6.jpeg',
            '/images/structural-work-7.jpeg',
            '/images/structural-work-8.jpeg',
            '/images/structural-work-9.jpeg',
            '/images/structural-work-10.jpeg',
            '/images/structural-work-11.jpeg',
            '/images/structural-work-14.jpeg',
            '/images/structural-work-15.jpeg',
            '/images/stuctural-work-16.jpeg'
        ]
    };

    // State for facility type filter
    let selectedFacilityType = $state('energy facility');

    // State for slideshow
    let currentSlideIndex = $state(0);

    // State for modal
    let isModalOpen = $state(false);
    let selectedProject = $state(null);

    // Helper function to determine project status
    function getProjectStatus(completionDate: string): 'completed' | 'ongoing' {
        const [day, month, year] = completionDate.split('/').map(Number);
        const projectDate = new Date(2000 + year, month - 1, day);
        const currentDate = new Date();
        return projectDate > currentDate ? 'ongoing' : 'completed';
    }

    // Filter projects based on selected facility type
    let filteredProjects = $derived(
        projectsData.filter(project => project.facilityType === selectedFacilityType)
    );

    // Get images for current facility type
    let currentImages = $derived(facilityImages[selectedFacilityType] || []);

    // Function to format duration from contract to completion
    function formatDuration(contractDate: string, completionDate: string) {
        const [cDay, cMonth, cYear] = contractDate.split('/').map(Number);
        const [compDay, compMonth, compYear] = completionDate.split('/').map(Number);

        const contract = new Date(2000 + cYear, cMonth - 1, cDay);
        const completion = new Date(2000 + compYear, compMonth - 1, compDay);

        const contractFormatted = contract.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const completionFormatted = completion.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        return `${contractFormatted} - ${completionFormatted}`;
    }

    // Function to get correct image path
    function getImagePath(imagePath: string) {
        return `${base}${imagePath}`;
    }

    // Slideshow functions
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % currentImages.length;
    }

    function prevSlide() {
        currentSlideIndex = currentSlideIndex === 0 ? currentImages.length - 1 : currentSlideIndex - 1;
    }

    function goToSlide(index: number) {
        currentSlideIndex = index;
    }

    // Auto slideshow
    let slideInterval: any;
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Modal functions
    function openModal(project) {
        selectedProject = project;
        isModalOpen = true;
    }

    function closeModal() {
        isModalOpen = false;
        selectedProject = null;
    }

    // Reset slide index when filter changes
    $effect(() => {
        currentSlideIndex = 0;
        startAutoSlide();
        return () => stopAutoSlide();
    });

    // Get counts for each facility type
    let energyCount = $derived(projectsData.filter(p => p.facilityType === 'energy facility').length);
    let structuralCount = $derived(projectsData.filter(p => p.facilityType === 'structural works').length);
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-500 via-slate-600 to-gray-500 py-20 px-8 w-full h-full">
    <div class="max-w-7xl mx-auto">

        <!-- Header Section -->
        <div class="text-center mb-16">
            <div class="mb-8">
                <div class="relative mx-auto w-32 h-32">
                    <div class="absolute inset-0 bg-gradient-to-r from-red-950 to-blue-900 rounded-full opacity-20 animate-ping"></div>
                    <div class="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-8 flex items-center justify-center">
                        <svg class="w-16 h-16 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9l-6.91 1.01L12 16l-3.09-6.73L2 9l6.91-0.74L12 2zm0 0v14l-3.09-6.73L2 9l6.91-0.74L12 2z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-wide">
                OUR PROJECTS
            </h1>

            <div class="flex items-center justify-center space-x-6 mb-8">
                <div class="h-1 w-20 bg-gradient-to-r from-red-950 to-blue-950 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-white/80 tracking-widest uppercase">
                    SRA Engineering
                </h2>
                <div class="h-1 w-20 bg-gradient-to-r from-red-950 to-blue-950 rounded-full"></div>
            </div>
        </div>

        <!-- Facility Type Filter Section -->
        <div class="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-12">
            <div class="flex flex-col lg:flex-row items-center justify-center gap-8">

                <!-- Radio Button Options -->
                <div class="flex flex-wrap justify-center gap-6">

                    <!-- Energy Facility -->
                    <label class="relative cursor-pointer group">
                        <input
                                type="radio"
                                bind:group={selectedFacilityType}
                                value="energy facility"
                                class="sr-only"
                        />
                        <div class="flex items-center space-x-4 px-10 py-6 rounded-2xl border-2 transition-all duration-300 {selectedFacilityType === 'energy facility' ? 'border-red-950 bg-red-500/20 text-white shadow-red-500/30 shadow-lg' : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'}">
                            <div class="flex items-center space-x-3">
                                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                                </svg>
                                <span class="font-black text-xl">ENERGY FACILITY</span>
                            </div>
                            <span class="px-4 py-2 bg-white/20 rounded-full text-sm font-bold">
                                {energyCount}
                            </span>
                        </div>
                    </label>

                    <!-- Structural Works -->
                    <label class="relative cursor-pointer group">
                        <input
                                type="radio"
                                bind:group={selectedFacilityType}
                                value="structural works"
                                class="sr-only"
                        />
                        <div class="flex items-center space-x-4 px-10 py-6 rounded-2xl border-2 transition-all duration-300 {selectedFacilityType === 'structural works' ? 'border-blue-950 bg-blue-500/20 text-white shadow-blue-500/30 shadow-lg' : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'}">
                            <div class="flex items-center space-x-3">
                                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"/>
                                </svg>
                                <span class="font-black text-xl">STRUCTURAL WORKS</span>
                            </div>
                            <span class="px-4 py-2 bg-white/20 rounded-full text-sm font-bold">
                                {structuralCount}
                            </span>
                        </div>
                    </label>

                </div>
            </div>
        </div>

        <!-- Slideshow Section -->
        {#if currentImages.length > 0}
            <div class="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden mb-12">

                <!-- Slideshow Container -->
                <div class="relative h-96 md:h-[500px] overflow-hidden"
                     onmouseenter={stopAutoSlide}
                     onmouseleave={startAutoSlide}>

                    <!-- Slides -->
                    {#each currentImages as imagePath, index}
                        <div class="absolute inset-0 transition-all duration-700 {index === currentSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}"
                             in:fly={{ x: 300, duration: 700 }}>
                            <img
                                    src={getImagePath(imagePath)}
                                    alt="Project Image {index + 1}"
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                            />

                            <!-- Overlay -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        </div>
                    {/each}

                    <!-- Navigation Arrows -->
                    <button
                            onclick={prevSlide}
                            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>

                    <button
                            onclick={nextSlide}
                            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>

                    <!-- Slide Indicators -->
                    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {#each currentImages as _, index}
                            <button
                                    onclick={() => goToSlide(index)}
                                    class="w-3 h-3 rounded-full transition-all duration-300 {index === currentSlideIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}"
                            ></button>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Projects List Below Slideshow -->
            <div class="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                <h2 class="text-3xl font-black text-white mb-8 text-center uppercase tracking-wide">
                    {selectedFacilityType === 'energy facility' ? 'Energy Facility Projects' : 'Structural Works Projects'}
                </h2>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each filteredProjects as project, index}
                        <div class="bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105"
                             onclick={() => openModal(project)}>

                            <h3 class="text-lg font-bold text-white mb-3 line-clamp-2">
                                {project.name}
                            </h3>

                            <div class="space-y-2 text-sm">
                                <div class="flex items-center text-white/80">
                                    <svg class="w-4 h-4 mr-2 text-red-950" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="font-medium uppercase">{project.location}</span>
                                </div>

                                <div class="flex items-center text-white/80">
                                    <svg class="w-4 h-4 mr-2 text-blue-950" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="font-medium">{formatDuration(project.contractDate, project.completionDate)}</span>
                                </div>

                                <div class="flex items-center text-black">
                                    <svg class="w-4 h-4 mr-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-xs truncate">{project.company}</span>
                                </div>
                            </div>

                            <!-- Status Badge -->
                            <div class="mt-4">
                                {#if getProjectStatus(project.completionDate) === 'completed'}
                                    <span class="px-3 py-1 bg-green-600/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
                                        COMPLETED
                                    </span>
                                {:else}
                                    <span class="px-3 py-1 bg-green-50 text-red-600 text-xs font-bold rounded-full border border-red-500/30">
                                        ONGOING
                                    </span>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}

    </div>
</div>

<!-- Project Modal -->
<ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        on:close={closeModal}
/>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>