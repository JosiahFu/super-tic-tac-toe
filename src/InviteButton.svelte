<script lang="ts">
    import QRCode from '@castlenine/svelte-qrcode';
import DialogButton from './lib/DialogButton.svelte';
    import { debouncedDelay } from './lib/debouncedDelay';
    import { ClipboardCheckIcon, ClipboardIcon, InviteIcon } from './lib/icons/icons';

    export let id: string;
    export let link: string;
    
    export let open = false;
    
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
</script>


<DialogButton tooltip="Invite" bind:open>
    <InviteIcon slot="button" />

    <h2>Game Code</h2>

    <div class="code">
        {#each id as char}
            <span>{char}</span>
        {/each}
    </div>

    <h2>Link</h2>
    <div class="link-container">
        <button on:click={copyLink}>
            {#if copiedLink}
                <ClipboardCheckIcon />
            {:else}
                <ClipboardIcon />
            {/if}
            {' '}Copy
        </button>
        <input readonly value={link} bind:this={input} />
    </div>
    
    <QRCode data={link} isResponsive />
</DialogButton>

<style>
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
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        display: inline-flex;
        flex-direction: row;
        align-content: center;
        gap: 0.3em;
    }
    
    input {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
</style>
