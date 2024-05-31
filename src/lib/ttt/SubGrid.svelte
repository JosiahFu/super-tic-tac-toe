<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Mark from './Mark.svelte'
    import { winnerOf, type SubGrid, type Mark as MarkData } from '../data'
    import OMark from './OMark.svelte'
    import XMark from './XMark.svelte'
    import CellGrid from './CellGrid.svelte'

    export let grid: SubGrid

    export let turn: MarkData

    export let next: boolean
    export let allowed: boolean

    const dispatch = createEventDispatcher<{ mark: number }>()

    $: winner = winnerOf(grid)
</script>

<div
    class="container"
    class:next-x={next && turn === 'X'}
    class:next-o={next && turn === 'O'}>
    <CellGrid let:index fade={winner !== null}>
        <Mark
            bind:mark={grid[index]}
            allowed={allowed && winner === null}
            on:mark={() => dispatch('mark', index)} />
    </CellGrid>

    <div class="submark-container">
        <XMark delay active={winner === 'X'} />
        <OMark delay active={winner === 'O'} />
    </div>
</div>

<style>
    .container {
        position: relative;
        padding: 5%;
        margin: 5%;
        border-radius: 5%;
        border-color: transparent;
        transition:
            background-color 0.4s,
            border-color 0.4s;
    }

    :global(.high-contrast) .container {
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

    :global(.high-contrast) .next-x,
    :global(.high-contrast) .next-o {
        background-color: transparent;
    }

    .submark-container {
        display: contents;
        --border-width: max(10px, 2vmin);
    }
</style>
