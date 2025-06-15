<!-- StatusFilter.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    interface Props {
        selectedStatus: string;
    }

    let { selectedStatus = $bindable() }: Props = $props();

    const dispatch = createEventDispatcher();

    function handleStatusChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        selectedStatus = target.value;
        dispatch('statusChanged', { status: selectedStatus });
    }
</script>

<div>
    <label class="block text-white/80 text-sm font-medium mb-2">Status</label>
    <select
            value={selectedStatus}
            on:change={handleStatusChange}
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
    >
        <option value="all" class="bg-gray-800">All Status</option>
        <option value="completed" class="bg-gray-800">Completed</option>
        <option value="in-progress" class="bg-gray-800">In Progress</option>
    </select>
</div>