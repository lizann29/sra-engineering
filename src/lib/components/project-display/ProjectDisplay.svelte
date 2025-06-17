<!-- ProjectDisplay.svelte -->
<script lang="ts">
    import { base } from '$app/paths';
    import { t } from '$lib/stores/translations.js';

    const project = $derived({
        nameEn: $t('georgian_sambo_federation_center', 'Georgian Sambo Federation Center'),
        location: $t('tbilisi_georgia', 'Tbilisi, Georgia'),
        image: "/images/sambo.png",
        description: $t('sambo_description', 'Modern sports facility featuring state-of-the-art architectural design with extensive glazing, clean geometric lines, and professional training facilities for the Georgian Sambo Federation.'),
        category: $t('sports_complex', 'Sports Complex'),
        client: $t('georgian_sambo_federation', 'Georgian Sambo Federation')
    });
</script>

<section class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-8 w-full">
    <div class="max-w-6xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-16">
            <div class="mb-8">
                <div class="relative mx-auto w-32 h-32">
                    <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full opacity-20 animate-ping"></div>
                    <div class="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-8 flex items-center justify-center">
                        <svg class="w-16 h-16 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <h2 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-wide">
                {$t('featured_projects', 'FEATURED PROJECTS')}
            </h2>

            <div class="flex items-center justify-center space-x-6 mb-8">
                <div class="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
                <p class="text-xl md:text-2xl font-bold text-white/80 tracking-widest uppercase">
                    {$t('sra_engineering', 'SRA Engineering')}
                </p>
                <div class="h-1 w-20 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"></div>
            </div>
        </div>

        <!-- Project Display -->
        <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300">
            <div class="grid lg:grid-cols-2 gap-0">
                <!-- Project Image -->
                <div class="relative h-64 lg:h-96 overflow-hidden">
                    <img
                            src="{base}{project.image}"
                            alt={project.nameEn}
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                    />

                    <!-- Status Badge -->
                    <div class="absolute top-4 right-4">
                        <span class="px-3 py-1 bg-green-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            {$t('in_progress', 'In Progress')}
                        </span>
                    </div>

                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <!-- Project Info -->
                <div class="p-8 space-y-6">
                    <!-- Project Title -->
                    <div>
                        <h3 class="text-3xl font-bold text-white mb-2 leading-tight">
                            {project.nameEn}
                        </h3>
                        <p class="text-white/60 font-medium italic">{$t('by_sra_engineering', 'by SRA Engineering')}</p>
                    </div>

                    <!-- Project Details Grid -->
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Location -->
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-white/60 font-medium uppercase tracking-wide">{$t('location', 'Location')}</p>
                                <p class="text-white font-semibold">{project.location}</p>
                            </div>
                        </div>

                        <!-- Category -->
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                                    <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-white/60 font-medium uppercase tracking-wide">{$t('category', 'Category')}</p>
                                <p class="text-white font-semibold">{project.category}</p>
                            </div>
                        </div>

                        <!-- Client -->
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-white/60 font-medium uppercase tracking-wide">{$t('client', 'Client')}</p>
                                <p class="text-white font-semibold">{project.client}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <div class="pt-4">
                        <a
                                href="{base}/projects"
                                class="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wide text-sm"
                        >
                            <span>{$t('see_more_projects', 'See More Projects')}</span>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>