<!-- Projects.svelte -->
<script lang="ts">
    import { base } from '$app/paths';
    import { fly } from 'svelte/transition';
    import LocationFilter from './LocationFilter.svelte';
    import StatusFilter from './StatusFilter.svelte';
    import ProjectModal from './ProjectModal.svelte';

    // Import your projects data
    import projectsData from '$lib/data/projects.json';

    // State for pagination
    let displayCount = $state(9);

    // State for filters
    let selectedLocation = $state('all');
    let selectedStatus = $state('all');

    // State for modal
    let isModalOpen = $state(false);
    let selectedProject = $state(null);

    // Helper function to determine project status
    function getProjectStatus(completionDate: string): 'completed' | 'in-progress' {
        const [day, month, year] = completionDate.split('/').map(Number);
        const projectDate = new Date(2000 + year, month - 1, day);
        const cutoffDate = new Date(2025, 5, 1); // 1/6/2025
        return projectDate > cutoffDate ? 'in-progress' : 'completed';
    }

    // Get unique locations for filter
    let uniqueLocations = $derived([...new Set(projectsData.map(p => p.location))].sort());

    // Filter projects based on selected filters
    let filteredProjects = $derived(
        projectsData.filter(project => {
            const status = getProjectStatus(project.completionDate);
            const matchesLocation = selectedLocation === 'all' || project.location === selectedLocation;
            const matchesStatus = selectedStatus === 'all' || status === selectedStatus;
            return matchesLocation && matchesStatus;
        })
    );

    // Calculate which projects to show (filtered + paginated)
    let visibleProjects = $derived(filteredProjects.slice(0, displayCount));

    // Check if there are more projects to load
    let hasMoreProjects = $derived(displayCount < filteredProjects.length);

    // Function to load more projects
    function loadMore() {
        displayCount += 9;
    }

    // Function to reset filters
    function resetFilters() {
        selectedLocation = 'all';
        selectedStatus = 'all';
        displayCount = 9;
    }

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

    // Modal functions
    function openModal(project) {
        console.log('Opening modal for:', project.nameEn); // Debug log
        selectedProject = project;
        isModalOpen = true;
    }

    function closeModal() {
        console.log('Closing modal'); // Debug log
        isModalOpen = false;
        selectedProject = null;
    }

    // Reset display count when filters change
    $effect(() => {
        displayCount = 9;
    });
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-8 w-full h-full">
    <div class="max-w-6xl mx-auto">

        <!-- Header Section -->
        <div class="text-center mb-16">
            <div class="mb-8">
                <div class="relative mx-auto w-32 h-32">
                    <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full opacity-20 animate-ping"></div>
                    <div class="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-8 flex items-center justify-center">
                        <svg class="w-16 h-16 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3l1.09 6.26L22 9l-8.91.74L12 16l-1.09-6.26L2 9l8.91-.74L12 3zm7 12l1.09 2.26L24 18l-3.91.74L19 21l-1.09-2.26L14 18l3.91-.74L19 15zm-14 0l1.09 2.26L10 18l-3.91.74L5 21l-1.09-2.26L0 18l3.91-.74L5 15z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-wide">
                OUR PROJECTS
            </h1>

            <div class="flex items-center justify-center space-x-6 mb-8">
                <div class="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-white/80 tracking-widest uppercase">
                    SRA Engineering
                </h2>
                <div class="h-1 w-20 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"></div>
            </div>
        </div>

        <!-- Filters Section -->
        <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-12">
            <div class="grid md:grid-cols-3 gap-6 items-end">
                <!-- Location Filter -->
                <LocationFilter
                        locations={uniqueLocations}
                        bind:selectedLocation
                />

                <!-- Status Filter -->
                <StatusFilter
                        bind:selectedStatus
                />

                <!-- Reset Button -->
                <div>
                    <button
                            onclick={resetFilters}
                            class="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {#each visibleProjects as project, index}
                <div
                        class="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        in:fly={{ y: 50, delay: index * 100 }}
                        onclick={() => openModal(project)}
                >
                    <!-- Project Image -->
                    <div class="relative h-48 overflow-hidden">
                        <img
                                src={getImagePath(project.image)}
                                alt={project.nameEn}
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                        />

                        <!-- Status Badge -->
                        <div class="absolute top-4 right-4">
                            {#if getProjectStatus(project.completionDate) === 'completed'}
                                <span class="px-3 py-1 bg-green-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                    Completed
                                </span>
                            {:else}
                                <span class="px-3 py-1 bg-yellow-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                    In Progress
                                </span>
                            {/if}
                        </div>

                        <!-- Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <!-- Project Info -->
                    <div class="p-6 space-y-4">
                        <!-- Project Name -->
                        <h3 class="text-lg font-bold text-white group-hover:text-red-300 transition-colors line-clamp-2">
                            {project.nameEn}
                        </h3>

                        <!-- Duration -->
                        <div class="flex items-center text-white/70 text-sm">
                            <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                            </svg>
                            <span>{formatDuration(project.contractDate, project.completionDate)}</span>
                        </div>

                        <!-- Location -->
                        <div class="flex items-center text-white/70 text-sm">
                            <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                            </svg>
                            <span>{project.location}</span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- No Results Message -->
        {#if filteredProjects.length === 0}
            <div class="text-center py-20">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-2xl font-bold text-white mb-4">No Projects Found</h3>
                <p class="text-white/70 mb-6">Try adjusting your filters</p>
                <button
                        onclick={resetFilters}
                        class="px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300"
                >
                    Reset Filters
                </button>
            </div>
        {/if}

        <!-- Load More Button -->
        {#if hasMoreProjects}
            <div class="text-center">
                <button
                        onclick={loadMore}
                        class="px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wide text-sm"
                >
                    Load More Projects
                </button>
                <p class="text-white/60 text-sm mt-4">
                    Showing {visibleProjects.length} of {filteredProjects.length} projects
                </p>
            </div>
        {:else if filteredProjects.length > 0}
            <div class="text-center">
                <p class="text-white/60 text-sm">
                    All {filteredProjects.length} projects displayed
                </p>
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