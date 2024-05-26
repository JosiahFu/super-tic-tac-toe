<script lang="ts">
    import { createLink } from './App.svelte';
    import Game from './Game.svelte';
    import PopupButton from './lib/PopupButton.svelte';
    import { defaultState } from './lib/data';
    import { peerClient, peerHost } from './lib/peer';

    export let host: boolean = false;
    export let id: string
    
    function prefixId(baseId: string) {
        return `super-ttt-${baseId}`
    }
    
    const gameState = (host ? peerHost : peerClient)(defaultState(), prefixId(id));

</script>

<Game bind:gameState={$gameState} player={host ? 'X' : 'O'} on:exit>
    <svelte:fragment slot="sidebar">
        {#if host}
            <PopupButton>
                <svelte:fragment slot="icon">
                    Invite
                </svelte:fragment>
                
                <span>Game code: {id}</span> 
                <button on:click={() => navigator.clipboard.writeText(createLink(id))}>Copy Link</button>
            </PopupButton>
        {/if}
        <slot name="sidebar" />
    </svelte:fragment>
</Game>
