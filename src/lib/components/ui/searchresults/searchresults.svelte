<script lang="ts">
    export let searchQuery: SearchQuery;

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
            results = data.data.Page.media.sort((a, b) => b.popularity - a.popularity).map(media => ({
                imageUrl: media.coverImage.extraLarge,
                title: media.title.english,
            }));

            // remove entries with no image
            results = results.filter(result => result.imageUrl);
        }
    }

    $: {
        if (searchQuery.query) {
            fetchResults();
        } else {
            results = [];
        }
    }
</script>

<div class="grid grid-cols-2 overflow-y-scroll gap-4 p-4 max-h-full">
    {#each results as result}
        <div class="flex flex-col gap-2">
            <img class="aspect-square object-cover rounded-sm" src={result.imageUrl} alt="result" />
            <!-- <p>{result.title}</p> -->
        </div>
    {/each}
</div>