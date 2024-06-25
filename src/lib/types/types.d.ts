interface CellData {
    id: number | null;
    imageUrl: string | null;
    title: string | null;
}

interface SearchQuery {
    query: string;
    type: string;
    selectedAnimangaSubType: string;
    selectedGameSubType: string;
}