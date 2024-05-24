<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Mark } from './data';
    import OMark from './OMark.svelte';
    import XMark from './XMark.svelte';

    export let mark: Mark | null
    
    export let allowed: boolean;

    $: available = allowed && mark === null
    
    const dispatch = createEventDispatcher<{mark: (mark: Mark) => void}>()
    
    function click() {
        if (available) {
            dispatch('mark', newMark => mark = newMark)
        }
    }
</script>

<button class="cell" class:available on:click={click}>
    {#if mark === 'X'}
        <XMark />
    {:else if mark === 'O'}
        <OMark />
    {/if}
</button>

<style>
    button {
        background-color: transparent;
        border: none;
    }

    .cell {
        position: relative;
        --border-width: 5px;
    }
    
    .available {
        cursor: pointer;
    }
</style>
