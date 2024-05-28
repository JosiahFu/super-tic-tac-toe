<script lang="ts">
    import { readonly, writable } from 'svelte/store';
    import { defaultState, winnerOf, type Mark, type Nine, type Result, type SubGrid as SubGridData } from './lib/data';
    import SubGrid from './lib/SubGrid.svelte';
    import { setContext } from 'svelte';
    import CellGrid from './lib/CellGrid.svelte';

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
    
    $: subWins = gameState.grid.map(winnerOf) as Nine<Result>
    $: winner = winnerOf(subWins)
    
    $: superNext = winner === null && gameState.nextGrid === null
</script>

<div class="game-container">
    <div class="game" class:next-x={superNext && gameState.turn === 'X'} class:next-o={superNext && gameState.turn === 'O'}>
        <CellGrid let:index >
            <SubGrid
                bind:grid={gameState.grid[index]}
                next={winner === null && index === gameState.nextGrid}
                turn={gameState.turn}
                allowed={winner === null && (gameState.nextGrid === null || index === gameState.nextGrid) && (player === null || player === gameState.turn)}
                on:mark={({detail: markIndex}) => onMark(markIndex)} />
        </CellGrid>
    </div>
</div>

<style>
    .game-container {
        height: 100vmin;
        width: 100vmin;
        display: grid;
    }

    .game {
        position: relative;
        padding: 3vmin;
        margin: 3vmin;
        border-radius: 1em;
        box-sizing: border-box;
        --border-width: max(3px, 0.5vmin);
        border-color: transparent;
        transition: background-color 0.4s;
    }
    
    :global(.high-contrast) .game {
        border: var(--border-width) solid transparent;
    }
    
    .next-x {
        background-color: var(--x-color-focus);
    }
    
    :global(.high-contrast) .next-x {
        border-color: var(--x-color);
    }
    
    .next-o {
        background-color: var(--o-color-focus);
        border-color: var(--o-color);
    }

    :global(.high-contrast) .next-o {
        border-color: var(--o-color);
    }
    
    :global(.high-contrast) .next-x, :global(.high-contrast) .next-o {
        background-color: transparent
    }
    
</style>
