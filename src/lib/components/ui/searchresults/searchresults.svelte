<script lang="ts">
	import SearchResult from "./search-result.svelte";
    import { createEventDispatcher } from "svelte";
    import { LASTFM_API_KEY } from "$env/static/private";
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

    interface LastfmResponse {
        results: {
            albummatches: {
                album: {
                    name: string;
                    image: string[];
                }[]
            }
        }
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

        } else if (searchQuery.type === "music") {
            const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchQuery.query}&api_key=${LASTFM_API_KEY}&format=json`);
            const data: LastfmResponse = await response.json();
            console.log(data);

            // results = data.results.albummatches.album
            //     .filter(result => result.image)
            //     .map(album => ({
            //         imageUrl: album.image[0],
            //         title: album.name,
            //     }))
        }
    }

    const handleResultClick = (e: CustomEvent) => {
        console.log(e.detail);
        cell.imageUrl = e.detail.imageUrl;
        cell.title = e.detail.title;
        dispatch('resultClick', e.detail);
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
        <SearchResult result={result} on:resultClick={handleResultClick} />
    {/each}
</div>