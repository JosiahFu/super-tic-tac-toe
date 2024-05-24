<script lang="ts">
    import { defaultState, winnerOf, type Mark, type SubGrid as SubGridData } from './lib/data';
    import GridCell from './lib/GridCell.svelte';
    import SubGrid from './lib/SubGrid.svelte';

    export let gameState = defaultState()
    
    export let player: Mark | undefined = undefined;
    
    function onMark(setMark: (mark: Mark) => void, markIndex: number) {
        setMark(gameState.turn)
        gameState.turn = gameState.turn === 'O' ? 'X' : 'O'

        if (winnerOf(gameState.grid[markIndex]) !== undefined) {
            gameState.nextGrid = undefined
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
                allowed={(gameState.nextGrid === undefined || index === gameState.nextGrid) && (player === undefined || player === gameState.turn)}
                on:mark={({detail: {setMark, markIndex}}) => onMark(setMark, markIndex)} />
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
