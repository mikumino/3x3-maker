<script lang="ts">
    import { quintOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
	import Button from "../button/button.svelte";

    export let result: Result;

    const dispatch = createEventDispatcher();

    const handleResultClick = () => {
        dispatch('resultClick', result);
    }

    const handleCropClick = (e: Event) => {
        e.stopPropagation();
        console.log('crop click');
    }

</script>

<button on:click={handleResultClick} class="relative aspect-square grid-rows-1 grid-cols-1 group">
    <Button on:click={handleCropClick} variant="outline" class="opacity-0 absolute group-hover:opacity-100 transition-all bottom-5 right-5">Crop</Button>  
    <img 
    in:fly={{y: 10, easing: quintOut, duration: 300, delay: 300}} 
    out:fly={{y: 10, easing: quintOut, duration: 300}}
    class="object-cover h-full w-full rounded-sm col-span-1 row-span-1" 
    src={result.imageUrl} 
    alt={result.title} />
</button>