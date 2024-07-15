import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { LASTFM_API_KEY } from "$env/static/private";

export const GET: RequestHandler = async ({ url }) => {
    const query = url.searchParams.get("query");
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${LASTFM_API_KEY}&format=json`);
        const data = await response.json() as { results: { albummatches: { album: { name: string; image: string[]; }[] } } };
        return json(data.results.albummatches.album);
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "fuuuck" }), { status: 500 });
    }
}