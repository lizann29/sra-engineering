<!-- ProjectModal.svelte -->
<script lang="ts">
    import { base } from '$app/paths';
    import { fade, fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    interface Project {
        id: number;
        name: string;
        nameEn: string;
        company: string;
        location: string;
        contractDate: string;
        completionDate: string;
        image: string;
    }

    interface Props {
        isOpen: boolean;
        project: Project | null;
    }

    let { isOpen, project }: Props = $props();

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch('close');
    }

    function getProjectStatus(completionDate: string): 'completed' | 'in-progress' {
        const [day, month, year] = completionDate.split('/').map(Number);
        const projectDate = new Date(2000 + year, month - 1, day);
        const cutoffDate = new Date(2025, 5, 1); // 1/6/2025
        return projectDate > cutoffDate ? 'in-progress' : 'completed';
    }

    function getImagePath(imagePath: string) {
        return `${base}${imagePath}`;
    }

    // Handle click outside to close
    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    // Handle escape key
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && project}
    <div
            class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            on:click={handleBackdropClick}
            transition:fade={{ duration: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
    >
        <div
                class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                transition:fly={{ y: 50, duration: 300 }}
                on:click|stopPropagation
        >
            <!-- Modal Header -->
            <div class="relative">
                <img
                        src={getImagePath(project.image)}
                        alt={project.nameEn}
                        class="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                        on:click={closeModal}
                        class="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        aria-label="Close modal"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <!-- Status Badge -->
                <div class="absolute top-4 left-4">
                    {#if getProjectStatus(project.completionDate) === 'completed'}
                        <span class="px-3 py-1 bg-green-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                            Completed
                        </span>
                    {:else}
                        <span class="px-3 py-1 bg-yellow-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                            In Progress
                        </span>
                    {/if}
                </div>
            </div>

            <!-- Modal Content -->
            <div class="p-8">
                <h2 id="modal-title" class="text-2xl font-bold text-white mb-2">
                    {project.nameEn}
                </h2>
                <h3 class="text-lg text-white/80 mb-6">
                    {project.name}
                </h3>

                <div class="grid md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <h4 class="text-white/80 text-sm font-medium mb-1">Company</h4>
                            <p class="text-white">{project.company}</p>
                        </div>
                        <div>
                            <h4 class="text-white/80 text-sm font-medium mb-1">Location</h4>
                            <p class="text-white">{project.location}</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <h4 class="text-white/80 text-sm font-medium mb-1">Contract Date</h4>
                            <p class="text-white">{project.contractDate}</p>
                        </div>
                        <div>
                            <h4 class="text-white/80 text-sm font-medium mb-1">Completion Date</h4>
                            <p class="text-white">{project.completionDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}