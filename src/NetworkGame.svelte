<script lang="ts">
    import Game from './Game.svelte'
    import { defaultState } from './lib/data'
    import { peerClient, peerHost } from './lib/stores/peer'

    export let host: boolean = false
    export let id: string
    export let connected = false

    function prefixId(baseId: string) {
        return `super-ttt-${baseId}`
    }

    const gameState = (host ? peerHost : peerClient)(
        defaultState(),
        prefixId(id)
    )
    const connectedState = gameState.connected

    $: connected =
        typeof $connectedState === 'number'
            ? $connectedState > 0
            : $connectedState
</script>

<Game bind:gameState={$gameState} player={host ? 'X' : 'O'} on:exit />
