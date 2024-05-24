<script lang="ts">
    import Game from './Game.svelte';
    import IdDialog from './IdDialog.svelte';
    import NetworkGame from './NetworkGame.svelte';
    
    let gameType: 'single' | 'host' | 'client' | undefined = undefined;
    let showDialog = true;
    let id = '';

    function genBaseId() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return [...new Array(4).keys()].map(() => letters[Math.floor(letters.length * Math.random())]).join('')
    }
</script>

<main>
    {#if gameType === 'single'}
        <Game />
    {:else if gameType === 'host'}
        {#if showDialog}
            <IdDialog bind:value={id} optional on:submit={() => showDialog = false} />
        {:else}
            <NetworkGame host id={id || genBaseId()} />
        {/if}
    {:else if gameType === 'client'}
        {#if showDialog}
            <IdDialog bind:value={id} on:submit={() => showDialog = false}/>
        {:else}
            <NetworkGame {id} />
        {/if}
    {:else}
        <button on:click={() => gameType = 'single'}>Start Same Device</button>
        <button on:click={() => gameType = 'host'}>Start Network</button>
        <button on:click={() => gameType = 'client'}>Join Network</button>
    {/if}
</main>

<style>
    main {
        display: grid;
        place-items: center;
        height: 100vh;
    }
</style>
