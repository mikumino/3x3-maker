<script lang="ts">
    import Lightswitch from "$lib/components/ui/lightswitch/lightswitch.svelte";
    import Cell from "$lib/components/ui/cell/cell.svelte";
</script>

<div class="flex flex-row items-center justify-center h-screen">
    <div class="hidden flex-col">

    </div>
    <div class="flex flex-col">
        <div class="flex flex-col gap-3 w-[600px] h-[600px]">
            <div class="flex flex-row gap-3 w-full h-full">
                <div class="w-1/3 h-full">
                    <Cell />
                </div>
                <div class="w-1/3 h-full">
                    <Cell />
                </div>
                <div class="w-1/3 h-full">
                    <Cell />
                </div>
            </div>
            <div class="flex flex-row gap-3 w-full h-full">
                <div class="w-1/3 h-full">
                    <Cell />
                </div>
                <div class="w-1/3 h-full">
                    <Cell />
                </div>
                <div class="w-1/3 h-full">
                    <Cell />
                </div>
            </div>
            <div class="flex flex-row gap-3 w-full h-full">
                <div class="w-1/3 h-full">
                    <Cell />
                </div>
                <div class="w-1/3 h-full">
                    <Cell />
                </div>
                <div class="w-1/3 h-full">
                    <Cell />
                </div>
            </div>
        </div>
    </div>
</div>
