<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import ThemeButton from './ThemeButton.svelte';
    import TooltipButton from './lib/TooltipButton.svelte';
    import { ExitIcon } from './lib/icons/icons';
    
    export let theme: 'light' | 'dark' | 'system';
    
    export let noExit = false;

    const dispatch = createEventDispatcher<{exit: undefined}>()
</script>


<div class="sidebar">
    {#if !noExit}
        <TooltipButton on:click={() => dispatch('exit')} tooltip="Exit">
            <ExitIcon />
        </TooltipButton>
    {/if}
    <ThemeButton bind:theme />
    <slot />
</div>

<style>
    .sidebar {
        position: fixed;
        right: 0.5em;
        top: 0.5em;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
</style>
