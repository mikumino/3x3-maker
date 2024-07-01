<script lang="ts">
    import { quintOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let result: Result;

    const dispatch = createEventDispatcher();

    const handleResultClick = () => {
        dispatch('resultClick', result);
    }

</script>

<button on:click={handleResultClick} class="aspect-square grid-rows-1 grid-cols-1">
    <img 
    in:fly={{y: 10, easing: quintOut, duration: 300, delay: 300}} 
    out:fly={{y: 10, easing: quintOut, duration: 300}}
    class="object-cover h-full w-full rounded-sm col-span-1 row-span-1" 
    src={result.imageUrl} 
    alt={result.title} 
    />
</button>