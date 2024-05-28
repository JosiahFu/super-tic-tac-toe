<script lang="ts">
    import Game from './Game.svelte';
    import { defaultState } from './lib/data';
    import { debouncedDelay } from './lib/debouncedDelay';
    import { peerClient, peerHost } from './lib/peer';

    export let host: boolean = false;
    export let id: string

    function prefixId(baseId: string) {
        return `super-ttt-${baseId}`
    }
    
    const gameState = (host ? peerHost : peerClient)(defaultState(), prefixId(id));

</script>

<Game bind:gameState={$gameState} player={host ? 'X' : 'O'} on:exit />
