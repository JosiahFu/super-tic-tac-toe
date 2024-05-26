<script lang="ts">
    import { createLink } from './App.svelte';
    import Game from './Game.svelte';
    import PopupButton from './lib/PopupButton.svelte';
    import { defaultState } from './lib/data';
    import { debouncedDelay } from './lib/debouncedDelay';
    import { peerClient, peerHost } from './lib/peer';

    export let host: boolean = false;
    export let id: string
    
    let copiedLink = false;
    
    const delayReset = debouncedDelay(() => copiedLink = false, 2000)

    function copyLink() {
        navigator.clipboard.writeText(createLink(id))       
        copiedLink = true;
        delayReset();
    }
    
    function prefixId(baseId: string) {
        return `super-ttt-${baseId}`
    }
    
    const gameState = (host ? peerHost : peerClient)(defaultState(), prefixId(id));

</script>

<Game bind:gameState={$gameState} player={host ? 'X' : 'O'} on:exit>
    <svelte:fragment slot="sidebar">
        {#if host}
            <PopupButton width=8em>
                <svelte:fragment slot="icon">
                    Invite
                </svelte:fragment>
                
                <span>Game code: {id}</span> 
                <button on:click={copyLink}>Copy Link
                    {#if copiedLink}
                        yep
                    {/if}
                </button>
            </PopupButton>
        {/if}
        <slot name="sidebar" />
    </svelte:fragment>
</Game>
