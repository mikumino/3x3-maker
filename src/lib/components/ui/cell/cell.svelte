<script lang="ts">
    import Image  from 'lucide-svelte/icons/image';
    export let image: string = "";
    export let open = false;
</script>

<button on:click={() => open = true} class="flex flex-col items-center justify-center w-[200px] h-[200px] bg-background group">
    {#if image}
        <img src={image} alt="filled cell" class="aspect-square object-cover" />
    {/if}
    {#if !image}
        <Image class="w-11 h-11 group-hover:text-primary transition-colors" /> 
    {/if}
</button>