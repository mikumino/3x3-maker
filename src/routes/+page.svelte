<script lang="ts">
    import Lightswitch from "$lib/components/ui/lightswitch/lightswitch.svelte";
    import * as Sheet from "$lib/components/ui/sheet";
    import Cell from "$lib/components/ui/cell/cell.svelte";
    
    let open = false;

    const handleCellClick = () => {
        open = true;
    }
</script>

<div class="flex flex-row items-center justify-center h-screen">
    <Sheet.Root bind:open>
        <Sheet.Trigger class="hidden"></Sheet.Trigger>
        <div class="grid grid-cols-3 gap-1">
            <Cell bind:open={open} />
            <Cell bind:open={open} />
            <Cell bind:open={open} />
            <Cell bind:open={open} />
            <Cell bind:open={open} />
            <Cell bind:open={open} />
            <Cell bind:open={open} />
            <Cell bind:open={open} />
            <Cell bind:open={open} />
        </div>
        <Sheet.Content side="left">
            <Sheet.Header>
                <Sheet.Title>Sheet</Sheet.Title>
            </Sheet.Header>
        </Sheet.Content>
    </Sheet.Root>
</div>
