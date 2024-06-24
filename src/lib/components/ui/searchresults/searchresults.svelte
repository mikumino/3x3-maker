<script lang="ts">
    export let searchQuery: SearchQuery;
</script>

<div class="grid grid-cols-2 gap-4 p-4">
    <p>{searchQuery.query}</p>
    <p>{searchQuery.type}</p>
</div>