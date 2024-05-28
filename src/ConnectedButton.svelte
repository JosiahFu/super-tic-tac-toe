<script lang="ts">
    import { ConnectedIcon, ProgressIcon } from './lib/icons/icons';
import TooltipButton from './lib/ui/TooltipButton.svelte';

    export let connected: boolean;
    export let host: boolean;

    let shown = true;
    
    $: {
        shown = true
        if (connected) setTimeout(() => shown = false, 5000);
    }
</script>

<div class="container">
    <TooltipButton {shown} tooltip={connected ? 'Connected' : host ? 'Waiting for other player...' : 'Connecting...'}>
        {#if connected}
            <ConnectedIcon />
        {:else}
            <ProgressIcon class="connected-button-spin" />
        {/if}
    </TooltipButton>
</div>

<style>
    .container {
        display: contents;
    }
    
    .container :global(button) {
        cursor: initial;
        scale: 1;
    }
    
    :global(.connected-button-spin) {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { rotate: 0deg; }
        to { rotate: 360deg; }
    }
</style>
