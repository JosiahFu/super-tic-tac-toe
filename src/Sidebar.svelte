<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import ThemeButton from './ThemeButton.svelte'
    import TooltipButton from './lib/ui/TooltipButton.svelte'
    import { ExitIcon } from './lib/icons/icons'
    import type { ThemeSetting } from './lib/theme'

    export let noExit = false

    const dispatch = createEventDispatcher<{ exit: undefined }>()
</script>

<div class="sidebar">
    <slot />
    <ThemeButton />
    {#if !noExit}
        <TooltipButton on:click={() => dispatch('exit')} tooltip="Leave Game">
            <ExitIcon />
        </TooltipButton>
    {/if}
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
