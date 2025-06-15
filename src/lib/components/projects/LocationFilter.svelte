<!-- LocationFilter.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    interface Props {
        locations: string[];
        selectedLocation: string;
    }

    let { locations, selectedLocation = $bindable() }: Props = $props();

    const dispatch = createEventDispatcher();

    function handleLocationChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        selectedLocation = target.value;
        dispatch('locationChanged', { location: selectedLocation });
    }
</script>

<div>
    <label class="block text-white/80 text-sm font-medium mb-2">Location</label>
    <select
            value={selectedLocation}
            on:change={handleLocationChange}
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
    >
        <option value="all" class="bg-gray-800">All Locations</option>
        {#each locations as location}
            <option value={location} class="bg-gray-800">{location}</option>
        {/each}
    </select>
</div>