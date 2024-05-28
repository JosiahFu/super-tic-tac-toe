<script lang="ts">
    import QRCode from '@castlenine/svelte-qrcode';
    import DialogButton from './lib/ui/DialogButton.svelte';
    import { debouncedDelay } from './lib/debouncedDelay';
    import { ClipboardCheckIcon, ClipboardIcon, ConnectedIcon, InviteIcon, ProgressIcon } from './lib/icons/icons';

    export let id: string;
    export let link: string;
    export let host = false;
    export let connected: boolean;

    let tooltipShown = false;

    $: {
        if (!host || connected) {
            tooltipShown = true
            if (connected) setTimeout(() => tooltipShown = false, 5000);
        }
    }
    
    $: allowed = host && !connected
    
    let open = false;
    
    let input: HTMLInputElement
    
    let copiedLink = false;
    
    const delayReset = debouncedDelay(() => copiedLink = false, 5000)

    function copyLink() {
        navigator.clipboard.writeText(link)       
        copiedLink = true;
        input.select();
        input.setSelectionRange(0, 9999)
        delayReset();
    }
    
    function openSelf() {
        open = true
    }

    export { openSelf as open }
</script>


<DialogButton tooltip={connected ? 'Connected' : host ? 'Invite' : 'Connecting...'} bind:open {tooltipShown} disabled={!allowed}>
    <svelte:fragment slot="button">
        {#if connected}
            <ConnectedIcon />
        {:else if host}
            <InviteIcon />
        {:else}
            <ProgressIcon class="button-spin" />
        {/if}
    </svelte:fragment>

    <h2>Game Code</h2>

    <div class="code">
        {#each id as char}
            <span>{char}</span>
        {/each}
    </div>

    <h2>Link</h2>
    <div class="link-container">
        <input readonly value={link} bind:this={input} />
        <button on:click={copyLink}>
            {#if copiedLink}
                <ClipboardCheckIcon />
            {:else}
                <ClipboardIcon />
            {/if}
            {' '}Copy
        </button>
    </div>
    
    <QRCode data={link} isResponsive />
</DialogButton>

<style>
    
    :global(.button-spin) {
        animation: spin 1s linear infinite;
    }
    
    .code {
        font-family: monospace;
        padding: 0.3em 0.6em;        
        background-color: var(--field-color);
        border-radius: 0.5em;
        font-size: 2.5em;
        
        display: flex;
        width: min-content;
        flex-direction: row;
        gap: 0.4em;
        
        margin-left: auto;
        margin-right: auto;
    }
    
    .link-container {
        display: flex;
        flex-direction: row;
        margin-bottom: 1em;
    }
    
    button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        gap: 0.3em;
    }
    
    input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    
    @keyframes spin {
        from { rotate: 0deg; }
        to { rotate: 360deg; }
    }
</style>
