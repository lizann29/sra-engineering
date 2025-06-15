<!-- Projects.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import { fade, fly } from 'svelte/transition';
    import projectsData from '$lib/data/projects.json';
    import Projects from "$lib/components/projects/Projects.svelte";

    // Projects data
    const projects = projectsData;

    // Helper function to determine project status
    function getProjectStatus(completionDate: string): 'completed' | 'in-progress' {
        const [day, month, year] = completionDate.split('/').map(Number);
        const projectDate = new Date(2000 + year, month - 1, day);
        const cutoffDate = new Date(2025, 5, 1); // 1/6/2025
        return projectDate > cutoffDate ? 'in-progress' : 'completed';
    }

    // Filter state
    let selectedLocation = $state('all');
    let selectedStatus = $state('all');
    let searchTerm = $state('');
    let selectedProject = $state(null);
    let isModalOpen = $state(false);

    // Derived values
    let uniqueLocations = $derived([...new Set(projects.map(p => p.location))].sort());

    let filteredProjects = $derived(
        projects.filter(project => {
            const status = getProjectStatus(project.completionDate);
            const matchesLocation = selectedLocation === 'all' || project.location === selectedLocation;
            const matchesStatus = selectedStatus === 'all' || status === selectedStatus;
            const matchesSearch = searchTerm === '' ||
                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.company.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesLocation && matchesStatus && matchesSearch;
        })
    );

    // Statistics
    let totalProjects = $derived(projects.length);
    let completedProjects = $derived(projects.filter(p => getProjectStatus(p.completionDate) === 'completed').length);
    let inProgressProjects = $derived(projects.filter(p => getProjectStatus(p.completionDate) === 'in-progress').length);

    // Modal functions
    function openModal(project) {
        selectedProject = project;
        isModalOpen = true;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        isModalOpen = false;
        selectedProject = null;
        document.body.style.overflow = 'auto';
    }

    // Reset filters
    function resetFilters() {
        selectedLocation = 'all';
        selectedStatus = 'all';
        searchTerm = '';
    }
</script>

<div style="width: 100%">
    <Projects/>
</div>

<!--<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" style="width: 100%">-->
<!--    &lt;!&ndash; Hero Section &ndash;&gt;-->
<!--    <div class="relative py-20 px-8">-->
<!--        <div class="max-w-6xl mx-auto text-center">-->
<!--            &lt;!&ndash; Animated icon &ndash;&gt;-->
<!--            <div class="mb-8">-->
<!--                <div class="relative mx-auto w-32 h-32">-->
<!--                    <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full opacity-20 animate-ping"></div>-->
<!--                    <div class="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-8 flex items-center justify-center">-->
<!--                        <svg class="w-16 h-16 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">-->
<!--                            <path d="M12 3l1.09 6.26L22 9l-8.91.74L12 16l-1.09-6.26L2 9l8.91-.74L12 3zm7 12l1.09 2.26L24 18l-3.91.74L19 21l-1.09-2.26L14 18l3.91-.74L19 15zm-14 0l1.09 2.26L10 18l-3.91.74L5 21l-1.09-2.26L0 18l3.91-.74L5 15z"/>-->
<!--                        </svg>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-wide">-->
<!--                OUR PROJECTS-->
<!--            </h1>-->

<!--            <div class="flex items-center justify-center space-x-6 mb-8">-->
<!--                <div class="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>-->
<!--                <h2 class="text-xl md:text-2xl font-bold text-white/80 tracking-widest uppercase">-->
<!--                    Engineering Excellence-->
<!--                </h2>-->
<!--                <div class="h-1 w-20 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"></div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; Statistics Section &ndash;&gt;-->
<!--    <div class="max-w-6xl mx-auto px-8 mb-12">-->
<!--        <div class="grid md:grid-cols-3 gap-6">-->
<!--            <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">-->
<!--                <div class="text-3xl font-bold text-white mb-2">{totalProjects}</div>-->
<!--                <div class="text-white/70">Total Projects</div>-->
<!--            </div>-->
<!--            <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">-->
<!--                <div class="text-3xl font-bold text-green-400 mb-2">{completedProjects}</div>-->
<!--                <div class="text-white/70">Completed</div>-->
<!--            </div>-->
<!--            <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">-->
<!--                <div class="text-3xl font-bold text-yellow-400 mb-2">{inProgressProjects}</div>-->
<!--                <div class="text-white/70">In Progress</div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; Filters Section &ndash;&gt;-->
<!--    <div class="max-w-6xl mx-auto px-8 mb-12">-->
<!--        <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">-->
<!--            <div class="grid md:grid-cols-4 gap-6 items-end">-->
<!--                &lt;!&ndash; Search &ndash;&gt;-->
<!--                <div>-->
<!--                    <label class="block text-white/80 text-sm font-medium mb-2">Search Projects</label>-->
<!--                    <input-->
<!--                            type="text"-->
<!--                            bind:value={searchTerm}-->
<!--                            placeholder="Search by name or company..."-->
<!--                            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"-->
<!--                    />-->
<!--                </div>-->

<!--                &lt;!&ndash; Location Filter &ndash;&gt;-->
<!--                <div>-->
<!--                    <label class="block text-white/80 text-sm font-medium mb-2">Location</label>-->
<!--                    <select-->
<!--                            bind:value={selectedLocation}-->
<!--                            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"-->
<!--                    >-->
<!--                        <option value="all">All Locations</option>-->
<!--                        {#each uniqueLocations as location}-->
<!--                            <option value={location} class="bg-gray-800">{location}</option>-->
<!--                        {/each}-->
<!--                    </select>-->
<!--                </div>-->

<!--                &lt;!&ndash; Status Filter &ndash;&gt;-->
<!--                <div>-->
<!--                    <label class="block text-white/80 text-sm font-medium mb-2">Status</label>-->
<!--                    <select-->
<!--                            bind:value={selectedStatus}-->
<!--                            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"-->
<!--                    >-->
<!--                        <option value="all" class="bg-gray-800">All Status</option>-->
<!--                        <option value="completed" class="bg-gray-800">Completed</option>-->
<!--                        <option value="in-progress" class="bg-gray-800">In Progress</option>-->
<!--                    </select>-->
<!--                </div>-->

<!--                &lt;!&ndash; Reset Button &ndash;&gt;-->
<!--                <div>-->
<!--                    <button-->
<!--                            onclick={resetFilters}-->
<!--                            class="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"-->
<!--                    >-->
<!--                        Reset Filters-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; Projects Grid &ndash;&gt;-->
<!--    <div class="max-w-6xl mx-auto px-8 pb-20">-->
<!--        {#if filteredProjects.length === 0}-->
<!--            <div class="text-center py-20">-->
<!--                <div class="text-6xl mb-4">🔍</div>-->
<!--                <h3 class="text-2xl font-bold text-white mb-4">No Projects Found</h3>-->
<!--                <p class="text-white/70 mb-6">Try adjusting your filters or search terms</p>-->
<!--                <button-->
<!--                        onclick={resetFilters}-->
<!--                        class="px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300"-->
<!--                >-->
<!--                    Reset Filters-->
<!--                </button>-->
<!--            </div>-->
<!--        {:else}-->
<!--            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">-->
<!--                {#each filteredProjects as project, index}-->
<!--                    <div-->
<!--                            class="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"-->
<!--                            onclick={() => openModal(project)}-->
<!--                            in:fly={{ y: 50, delay: index * 100 }}-->
<!--                    >-->
<!--                        &lt;!&ndash; Project Image &ndash;&gt;-->
<!--                        <div class="relative h-48 overflow-hidden">-->
<!--                            <img-->
<!--                                    src={project.image}-->
<!--                                    alt={project.nameEn}-->
<!--                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"-->
<!--                                    loading="lazy"-->
<!--                            />-->
<!--                            &lt;!&ndash; Status Badge &ndash;&gt;-->
<!--                            <div class="absolute top-4 right-4">-->
<!--                                {#if getProjectStatus(project.completionDate) === 'completed'}-->
<!--                                    <span class="px-3 py-1 bg-green-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">-->
<!--                                        Completed-->
<!--                                    </span>-->
<!--                                {:else}-->
<!--                                    <span class="px-3 py-1 bg-yellow-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">-->
<!--                                        In Progress-->
<!--                                    </span>-->
<!--                                {/if}-->
<!--                            </div>-->
<!--                        </div>-->

<!--                        &lt;!&ndash; Project Info &ndash;&gt;-->
<!--                        <div class="p-6">-->
<!--                            <h3 class="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-300 transition-colors">-->
<!--                                {project.nameEn}-->
<!--                            </h3>-->
<!--                            <p class="text-white/70 text-sm mb-4 line-clamp-1">-->
<!--                                {project.company}-->
<!--                            </p>-->

<!--                            <div class="space-y-2">-->
<!--                                <div class="flex items-center text-white/60 text-sm">-->
<!--                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">-->
<!--                                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>-->
<!--                                    </svg>-->
<!--                                    {project.location}-->
<!--                                </div>-->
<!--                                <div class="flex items-center text-white/60 text-sm">-->
<!--                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">-->
<!--                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>-->
<!--                                    </svg>-->
<!--                                    {project.completionDate}-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                {/each}-->
<!--            </div>-->
<!--        {/if}-->
<!--    </div>-->
<!--</div>-->

<!--&lt;!&ndash; Modal &ndash;&gt;-->
<!--{#if isModalOpen && selectedProject}-->
<!--    <div-->
<!--            class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"-->
<!--            onclick={closeModal}-->
<!--            transition:fade={{ duration: 300 }}-->
<!--    >-->
<!--        <div-->
<!--                class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"-->
<!--                transition:fly={{ y: 50, duration: 300 }}-->
<!--        >-->
<!--            &lt;!&ndash; Modal Header &ndash;&gt;-->
<!--            <div class="relative">-->
<!--                <img-->
<!--                        src={selectedProject.image}-->
<!--                        alt={selectedProject.nameEn}-->
<!--                        class="w-full h-64 object-cover rounded-t-2xl"-->
<!--                />-->
<!--                <button-->
<!--                        onclick={closeModal}-->
<!--                        class="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"-->
<!--                >-->
<!--                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>-->
<!--                    </svg>-->
<!--                </button>-->
<!--                &lt;!&ndash; Status Badge &ndash;&gt;-->
<!--                <div class="absolute top-4 left-4">-->
<!--                    {#if getProjectStatus(selectedProject.completionDate) === 'completed'}-->
<!--                        <span class="px-3 py-1 bg-green-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">-->
<!--                            Completed-->
<!--                        </span>-->
<!--                    {:else}-->
<!--                        <span class="px-3 py-1 bg-yellow-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">-->
<!--                            In Progress-->
<!--                        </span>-->
<!--                    {/if}-->
<!--                </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; Modal Content &ndash;&gt;-->
<!--            <div class="p-8">-->
<!--                <h2 class="text-2xl font-bold text-white mb-2">-->
<!--                    {selectedProject.nameEn}-->
<!--                </h2>-->
<!--                <h3 class="text-lg text-white/80 mb-6">-->
<!--                    {selectedProject.name}-->
<!--                </h3>-->

<!--                <div class="grid md:grid-cols-2 gap-6">-->
<!--                    <div class="space-y-4">-->
<!--                        <div>-->
<!--                            <h4 class="text-white/80 text-sm font-medium mb-1">Company</h4>-->
<!--                            <p class="text-white">{selectedProject.company}</p>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <h4 class="text-white/80 text-sm font-medium mb-1">Location</h4>-->
<!--                            <p class="text-white">{selectedProject.location}</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="space-y-4">-->
<!--                        <div>-->
<!--                            <h4 class="text-white/80 text-sm font-medium mb-1">Contract Date</h4>-->
<!--                            <p class="text-white">{selectedProject.contractDate}</p>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <h4 class="text-white/80 text-sm font-medium mb-1">Completion Date</h4>-->
<!--                            <p class="text-white">{selectedProject.completionDate}</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--{/if}-->

<style>
    .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>