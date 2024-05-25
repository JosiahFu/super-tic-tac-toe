<script lang="ts">
    import { createEventDispatcher, getContext } from 'svelte';
    import type { Mark } from './data';
    import OMark from './OMark.svelte';
    import XMark from './XMark.svelte';
    import type { Readable } from 'svelte/store';

    export let mark: Mark | null
    
    export let allowed: boolean;
    
    const turn = getContext<Readable<Mark>>('turn')

    $: available = allowed && mark === null
    
    const dispatch = createEventDispatcher<{mark: undefined}>()
    
    function click() {
        if (available) {
            mark = $turn
            dispatch('mark')
        }
    }
</script>

<button class="cell" class:available on:click={click}>
    <XMark active={mark === 'X'} hoverable={available && $turn === 'X'} />
    <OMark active={mark === 'O'} hoverable={available && $turn === 'O'} />
</button>

<style>
    button {
        background-color: transparent;
        border: none;
    }

    .cell {
        position: relative;
    }
    
    .available {
        cursor: pointer;
    }
</style>
