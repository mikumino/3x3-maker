<script lang="ts">
	import { quintOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    export let cell: CellData;
    export let searchQuery: SearchQuery;

    const dispatch = createEventDispatcher();

    interface AnilistResponse {
        data: {
            Page: {
                media: {
                    title: {
                        english: string;
                    },
                    coverImage: {
                        extraLarge: string;
                    },
                    popularity: number;
                }[]
            }
        }
    }

    interface Result {
        imageUrl: string;
        title: string;
    }

    let results: Result[] = [];

    const fetchResults = async () => {
        // anilist uses graphql
        // everything else uses json lol...

        if (searchQuery.type === "animanga") {
            const query = `query {
                Page(page: 1, perPage: 20) {
                    media(search: "${searchQuery.query}", type:${searchQuery.selectedAnimangaSubType === "anime" ? "ANIME" : "MANGA"}) {
                        title {
                            english
                        }
                        coverImage {
                            extraLarge
                        }
                        popularity
                    }
                }
            }`;
            const response = await fetch("https://graphql.anilist.co/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    query,
                }),
            });
            const data: AnilistResponse = await response.json();
            console.log(data);

            // sort by popularity
            results = data.data.Page.media
            .sort((a, b) => b.popularity - a.popularity).map(media => ({
                imageUrl: media.coverImage.extraLarge,
                title: media.title.english,
            }))
            .filter(result => result.imageUrl);

        }
    }

    const handleResultClick = (result: Result) => {
        console.log(result);
        cell.imageUrl = result.imageUrl;
        cell.title = result.title;
        dispatch('resultClick', result);
        console.log(cell);
    }

    $: {
        if (searchQuery.query) {
            fetchResults();
        } else {
            results = [];
        }
    }
</script>

<div class="grid grid-cols-2 overflow-y-auto gap-4 p-4 max-h-full">
    {#each results as result, i (result.imageUrl)}
    <button on:click={() => handleResultClick(result)} class="aspect-square grid-rows-1 grid-cols-1">
        <img 
        in:fly={{y: 10, easing: quintOut, duration: 300, delay: 300 + 50*i}} 
        out:fly={{y: 10, easing: quintOut, duration: 300}}
        class="object-cover h-full w-full rounded-sm col-span-1 row-span-1" 
        src={result.imageUrl} 
        alt={result.title} 
        />
    </button>
    {/each}
</div>