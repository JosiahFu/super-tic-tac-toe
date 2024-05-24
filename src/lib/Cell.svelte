<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Mark } from './data';
    import OMark from './OMark.svelte';
    import XMark from './XMark.svelte';

    export let mark: Mark | undefined
    
    export let allowed: boolean;
    export let fade: boolean;

    $: available = allowed && mark === undefined
    
    const dispatch = createEventDispatcher<{mark: (mark: Mark) => void}>()
    
    function click() {
        if (available) {
            dispatch('mark', newMark => mark = newMark)
        }
    }
</script>

<button class="cell" class:available class:fade on:click={click}>
    {#if mark === 'X'}
        <XMark />
    {:else if mark === 'O'}
        <OMark />
    {/if}
</button>

<style>
    .cell {
        position: relative;
        --border-width: 10px;
        transition: opacity 0.4s 0.4s;
    }
    
    .available {
        cursor: pointer;
    }
    
    .fade {
        opacity: 0.5;
    }
</style>
