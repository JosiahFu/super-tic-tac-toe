<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Mark from './Mark.svelte';
    import { winnerOf, type MarkEventData, type SubGrid, type Mark as MarkData } from './data';
    import OMark from './OMark.svelte';
    import XMark from './XMark.svelte';
    import CellGrid from './CellGrid.svelte';

    export let grid: SubGrid;
    
    export let turn: MarkData;
    
    export let next: boolean;
    export let allowed: boolean;
    
    const dispatch = createEventDispatcher<{mark: number}>()
    
    $: winner = winnerOf(grid)
</script>

<div class='container' class:next-x={next && turn === 'X'} class:next-o={next && turn === 'O'}>
    <CellGrid let:index fade={winner !== null}>
        <Mark bind:mark={grid[index]} allowed={allowed && winner === null} on:mark={event => dispatch('mark', index)} />
    </CellGrid>

    <XMark delay active={winner === 'X'} --border-width=30px />
    <OMark delay active={winner === 'O'} --border-width=30px />
</div>

<style>
    .container {
        position: relative;
        padding: 5%;
        margin: 5%;
        border-radius: 5%;
        transition: 0.2s;
    }
    
    .next-x {
        background-color: var(--x-color-focus)
    }
    
    .next-o {
        background-color: var(--o-color-focus)
    }
</style>
