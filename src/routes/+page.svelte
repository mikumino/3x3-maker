<script lang="ts">
    import Lightswitch from "$lib/components/ui/lightswitch/lightswitch.svelte";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import * as Sheet from "$lib/components/ui/sheet";
    import Cell from "$lib/components/ui/cell/cell.svelte";
	import Button from "$lib/components/ui/button/button.svelte";

    let open = false;
    let selectedCell = null;
    let selectedType = "animanga";
    let selectedAnimangaSubType = "anime";
    let selectedGameSubType = "game";

    let cells = Array(9).fill(null).map((_, i) => ({ id: i, imageUrl: null, title: null }));

    const handleCellClick = (data: CellData) => { 
        open = true;
        selectedCell = data;
        console.log(data);
    }
</script>

<div class="flex flex-row items-center justify-center h-screen">
    <Sheet.Root bind:open>
        <Sheet.Trigger class="hidden"></Sheet.Trigger>
        <div class="grid grid-cols-3 gap-1">
            {#each cells as cell}
                <Cell on:click={(e) => handleCellClick(e.detail)} data={cell} />
            {/each}
        </div>
        <Sheet.Content class="w-screen" side="left">
            <Sheet.Header>
                <Sheet.Title>3x3 Maker</Sheet.Title>
                <div class="flex flex-col space-y-2">
                    <div class="flex flex-row gap-3">
                        <Button on:click={() => selectedType = "animanga"} variant={selectedType === "animanga" ? "default" : "ghost"}>Anime/Manga</Button>
                        <Button on:click={() => selectedType = "music"} variant={selectedType === "music" ? "default" : "ghost"}>Music</Button>
                        <Button on:click={() => selectedType = "games"} variant={selectedType === "games" ? "default" : "ghost"}>Games</Button>
                        <Button on:click={() => selectedType = "general"} variant={selectedType === "general" ? "default" : "ghost"}>General</Button>
                    </div>
                    <div class="flex flex-row gap-3">
                        {#if selectedType === "animanga"}
                            <Button on:click={() => selectedAnimangaSubType = "anime"} variant={selectedAnimangaSubType === "anime" ? "default" : "ghost"}>Anime</Button>
                            <Button on:click={() => selectedAnimangaSubType = "manga"} variant={selectedAnimangaSubType === "manga" ? "default" : "ghost"}>Manga</Button>
                            <Button on:click={() => selectedAnimangaSubType = "character" } variant={selectedAnimangaSubType === "character" ? "default" : "ghost"}>Character</Button>
                        {/if}
                        {#if selectedType === "games"}
                            <Button on:click={() => selectedGameSubType = "game"} variant={selectedGameSubType === "game" ? "default" : "ghost"}>Game</Button>
                            <Button on:click={() => selectedGameSubType = "character" } variant={selectedGameSubType === "character" ? "default" : "ghost"}>Character</Button>
                        {/if}
                    </div>
                </div>
            </Sheet.Header>

        </Sheet.Content>
    </Sheet.Root>
</div>
