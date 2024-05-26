<script lang="ts">
    import { fade } from 'svelte/transition';
    import Game from './Game.svelte';
    import IdDialog from './IdDialog.svelte';
    import NetworkGame from './NetworkGame.svelte';
    
    const joinId = new URLSearchParams(window.location.search).get('join')
    
    let gameType: 'single' | 'host' | 'client' | undefined = joinId ? 'client' : undefined;
    let id = joinId || '';

    function genBaseId() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return [...new Array(4).keys()].map(() => letters[Math.floor(letters.length * Math.random())]).join('')
    }
    
    function host() {
        gameType = 'host'
        id = genBaseId()
    }
    
    function exit() {
        gameType = undefined;
        id = '';
    }
</script>

<script lang="ts" context="module">
    export function createLink(id: string) {
        return `${window.location.origin}${window.location.pathname}?join=${id}`
    }
</script>

<main>
    {#if gameType === undefined}
        <section class="menu" in:fade={{delay: 400}} out:fade>
            <button on:click={() => gameType = 'single'}>Start Same Device</button>
            <button on:click={host}>Start Network</button>
            <button on:click={() => gameType = 'client'}>Join Network</button>
        </section>
    {:else}
        <section class="game" in:fade={{delay: 400}} out:fade>
            {#if gameType === 'single'}
                <Game on:exit={exit} />
            {:else if gameType === 'host'}
                <NetworkGame host {id} on:exit={exit} />
            {:else if gameType === 'client'}
                {#if !id}
                    <IdDialog on:submit={event => id = event.detail}/>
                {:else}
                    <NetworkGame {id} on:exit={exit} />
                {/if}
            {/if}
        </section>
    {/if}
</main>

<style>
    .game {
        display: grid;
        height: 100vh;
        place-items: center;
    }
</style>
