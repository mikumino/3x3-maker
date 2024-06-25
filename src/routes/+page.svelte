<script lang="ts">
    import Lightswitch from "$lib/components/ui/lightswitch/lightswitch.svelte";
    import Searchresults from "$lib/components/ui/searchresults/searchresults.svelte";
    import * as Sheet from "$lib/components/ui/sheet";
    import Cell from "$lib/components/ui/cell/cell.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";

    let open = false;
    let selectedCell: CellData;
    let selectedType = "animanga";
    let selectedAnimangaSubType = "anime";
    let selectedGameSubType = "game";
    let query = "";

    let searchQuery: SearchQuery = {
        query: "",
        type: "animanga",
        selectedAnimangaSubType: "anime",
        selectedGameSubType: "game"
    };

    let cells = Array(9).fill(null).map((_, i) => ({ id: i, imageUrl: null, title: null }));

    const handleCellClick = (data: CellData) => { 
        open = true;
        selectedCell = data;
        console.log(selectedCell);
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        searchQuery = {
            query: query,
            type: selectedType,
            selectedAnimangaSubType: selectedAnimangaSubType,
            selectedGameSubType: selectedGameSubType
        }
    }

    const handleResultClick = (e: Event) => {
        console.log(e.detail);
        selectedCell.imageUrl = e.detail.imageUrl;
        selectedCell.title = e.detail.title;
        cells = cells;
        open = false;
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
        <div class="absolute bottom-5 right-5">
            <Lightswitch />
        </div>
        <Sheet.Content class="w-screen" side="left">
            <Sheet.Header>
                <Sheet.Title>3x3 Maker</Sheet.Title>
            </Sheet.Header>
                <div class="flex flex-col h-full space-y-4">
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
                    {#if selectedType === "animanga"}
                        <p class="text-sm text-muted-foreground">Anime/Manga search is powered by <a class="text-primary hover:underline" href="https://anilist.co">AniList</a>.</p>
                    {/if}
                    {#if selectedType === "music"}
                        <p class="text-sm text-muted-foreground">Music search is powered by <a class="text-primary hover:underline" href="https://www.last.fm/">Last.fm</a>.</p>
                    {/if}
                    {#if selectedType === "games"}
                        <p class="text-sm text-muted-foreground">Game search is powered by <a class="text-primary hover:underline" href="https://www.giantbomb.com/">Giantbomb</a>.</p>
                    {/if}
                    {#if selectedType === "general"}
                        <p class="text-sm text-muted-foreground">General search is powered by <a class="text-primary hover:underline" href="https://www.unsplash.com/">Unsplash</a>.</p>
                    {/if}
                    <form on:submit|preventDefault={handleSubmit}>
                        <Input bind:value={query} placeholder="Search" />
                    </form>
                    <Searchresults on:resultClick={handleResultClick} cell={selectedCell} open={open} searchQuery={searchQuery} />
                </div>

        </Sheet.Content>
    </Sheet.Root>
</div>
