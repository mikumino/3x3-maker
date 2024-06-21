<script lang="ts">
    import Image  from 'lucide-svelte/icons/image';
    import { createEventDispatcher } from 'svelte';

    export let data: CellData;

    const dispatch = createEventDispatcher();

    const handleClick = () => {
        dispatch('click', data);
    }
</script>

<button on:click={handleClick} class="flex flex-col items-center justify-center w-[200px] h-[200px] bg-background group">
    {#if data.imageUrl}
        <img src={data.imageUrl} alt="filled cell" class="aspect-square object-cover" />
    {/if}
    {#if !data.imageUrl}
        <Image class="w-11 h-11 group-hover:text-primary transition-colors" /> 
    {/if}
</button>