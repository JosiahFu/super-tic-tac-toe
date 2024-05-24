<script lang="ts">
    import { derived, readonly, writable } from 'svelte/store';
    import { defaultState, winnerOf, type Mark, type SubGrid as SubGridData } from './lib/data';
    import GridCell from './lib/GridCell.svelte';
    import SubGrid from './lib/SubGrid.svelte';
    import { setContext } from 'svelte';

    export let gameState = defaultState()
    
    export let turn = writable(gameState.turn)
    $: $turn = gameState.turn
    setContext('turn', readonly(turn))
    
    export let player: Mark | null = null;
    
    function onMark(markIndex: number) {
        gameState.turn = gameState.turn === 'O' ? 'X' : 'O'

        if (winnerOf(gameState.grid[markIndex]) !== null) {
            gameState.nextGrid = null
        } else {
            gameState.nextGrid = markIndex
        }
    }
    
    $: subWins = gameState.grid.map(winnerOf) as SubGridData
    $: winner = winnerOf(subWins)
</script>

<div class="nine">
    {#each gameState.grid as _, index}
        <GridCell {index}>
            <SubGrid
                bind:grid={gameState.grid[index]}
                next={index === gameState.nextGrid}
                turn={gameState.turn}
                allowed={(gameState.nextGrid === null || index === gameState.nextGrid) && (player === null || player === gameState.turn)}
                on:mark={({detail: markIndex}) => onMark(markIndex)} />
        </GridCell>
    {/each}
</div>

<style>
    .nine {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        height: 100%;
        aspect-ratio: 1;
        padding: 1em;
        box-sizing: border-box;
        --border-width: 5px;
    }
</style>
