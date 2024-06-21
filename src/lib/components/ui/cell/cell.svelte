<script lang="ts">
    import Image  from 'lucide-svelte/icons/image';
    export let image: string = "";
</script>

<div class="flex flex-col items-center justify-center w-full h-full bg-background">
    {#if image}
        <img src={image} alt="filled cell" class="w-full h-full" />
    {/if}
    {#if !image}
        <Image class="w-11 h-11" /> 
    {/if}
</div>