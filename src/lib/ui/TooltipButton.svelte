<script lang="ts">
    import { fade } from 'svelte/transition';

    export let tooltip: string
    
    export let disabled = false;
    
    let hovered = false;
    
    export let shown = false;
</script>

<div class="container">
    {#if hovered || shown}
        <div class="tooltip-container" transition:fade={{duration: 200}}>
            <div class="tooltip">{tooltip}</div>
        </div>
    {/if}
    <button on:click on:mouseenter={() => hovered = true} on:mouseleave={() => hovered = false} {disabled}>
        <slot />
    </button>
</div>

<style>
    .container {
        position: relative;
    }
    
    .tooltip-container {
        position: absolute;
        left: 0;
        width: 0;
        top: 0;
        bottom: 0;
    }
    
    .tooltip {
        position: absolute;
        right: 0.5em;
        background-color: var(--dialog-color);
        padding: 0.5em 1em;
        border-radius: 0.5em;
        width: max-content;
    }
</style>
