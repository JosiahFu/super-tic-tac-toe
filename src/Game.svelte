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
</script>

<div class="game-container">
    <div class="game" class:next={winner === null && gameState.nextGrid === null} class:next-x={gameState.turn === 'X'} class:next-o={gameState.turn === 'O'}>
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

<div class="sidebar">
    <slot name="sidebar" />
    <!--Undo button-->
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
        transition: background-color 0.4s;
    }
    
    .next.next-x {
        background-color: var(--x-color-focus);
    }

    .next.next-o {
        background-color: var(--o-color-focus);
    }
    
    .sidebar {
        position: fixed;
        right: 0;
        top: 0;
    }
</style>
