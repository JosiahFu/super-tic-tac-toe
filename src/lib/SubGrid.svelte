<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Cell from './Cell.svelte';
    import { winnerOf, type MarkEventData, type SubGrid } from './data';
    import OMark from './OMark.svelte';
    import XMark from './XMark.svelte';

    export let grid: SubGrid;
    
    export let next: boolean;
    export let allowed: boolean;
    
    const dispatch = createEventDispatcher<{mark: MarkEventData}>()
    
    $: winner = winnerOf(grid)
</script>

<div class='nine' class:next>
    {#each grid as _, index}
        <Cell bind:mark={grid[index]} {allowed} fade={winner !== undefined} on:mark={event => dispatch('mark', {setMark: event.detail, markIndex: index})} />
    {/each}

    {#if winner === 'X'}
        <XMark delay={400} />
    {:else if winner === 'O'}
        <OMark delay={400} />
    {/if}
</div>

<style>
    .nine {
        display: inline-grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        position: relative;
        --border-width: 40px;
    }
</style>
