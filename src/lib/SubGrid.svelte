<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Mark from './Mark.svelte';
    import { winnerOf, type MarkEventData, type SubGrid, type Mark as MarkData } from './data';
    import OMark from './OMark.svelte';
    import XMark from './XMark.svelte';
    import GridCell from './GridCell.svelte';

    export let grid: SubGrid;
    
    export let turn: MarkData;
    
    export let next: boolean;
    export let allowed: boolean;
    
    const dispatch = createEventDispatcher<{mark: number}>()
    
    $: winner = winnerOf(grid)
</script>

<div class='nine' class:next class:next-x={next && turn === 'X'} class:next-o={next && turn === 'O'}>
    {#each grid as _, index}
        <GridCell {index} fade={winner !== null}>
            <Mark bind:mark={grid[index]} allowed={allowed && winner === null} on:mark={event => dispatch('mark', index)} />
        </GridCell>
    {/each}

    <XMark delay active={winner === 'X'} --border-width=30px />
    <OMark delay active={winner === 'O'} --border-width=30px />
</div>

<style>
    .nine {
        display: inline-grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        position: relative;
        padding: 5%;
        margin: 5%;
        border-radius: 5%;
        transition: 0.2s;
    }
    
    .next-x {
        background-color: #ff00003f;
    }
    
    .next-o {
        background-color: #0000ff3f;
    }
</style>
