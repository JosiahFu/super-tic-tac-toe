<script lang="ts">
    import { defaultState } from './lib/data';
    import { peerClient, peerHost } from './lib/peer';

    export let host: boolean
    export let id: string

    function prefixId(baseId: string) {
        return `super-ttt-${baseId}`
    }
    
    const gameState = host ? peerHost(defaultState, prefixId(id)) : peerClient(defaultState, prefixId(id));

</script>

<div class="nine">
    {#each $gameState as subgrid}
        <div class="nine">
            {#each subgrid as _, index}
                <input type="text" bind:value={subgrid[index]} />
            {/each}
        </div>
    {/each}
</div>

<p>Host Id: {id}</p>

<style>
    .nine {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }
</style>
