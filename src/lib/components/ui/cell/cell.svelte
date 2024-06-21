<script lang="ts">
    import Image  from 'lucide-svelte/icons/image';
    export let image: string = "";
</script>

<button class="flex flex-col items-center justify-center w-full h-full bg-background group">
    {#if image}
        <img src={image} alt="filled cell" class="w-full h-full" />
    {/if}
    {#if !image}
        <Image class="w-11 h-11 group-hover:text-primary transition-colors" /> 
    {/if}
</button>