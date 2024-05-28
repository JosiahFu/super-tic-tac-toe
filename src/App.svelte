<script lang="ts">
    import { fade } from 'svelte/transition';
    import Game from './Game.svelte';
    import IdDialog from './IdDialog.svelte';
    import NetworkGame from './NetworkGame.svelte';
    import { theme } from './lib/theme';
    import Sidebar from './Sidebar.svelte';
    import InviteButton from './InviteButton.svelte';
    
    const joinId = new URLSearchParams(window.location.search).get('join')
    
    let gameType: 'single' | 'host' | 'client' | undefined = joinId ? 'client' : undefined;
    let id = joinId || '';
    
    let inviteOpen = false;

    const [themeSetting, themeValue] = theme()

    function genBaseId() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return [...new Array(4).keys()].map(() => letters[Math.floor(letters.length * Math.random())]).join('')
    }

    function createLink(id: string) {
        return `${window.location.origin}${window.location.pathname}?join=${id}`
    }
    
    function host() {
        gameType = 'host'
        id = genBaseId()
        setTimeout(() => inviteOpen = true, 800)
    }
    
    function exit() {
        gameType = undefined;
        id = '';
    }
    
    $: document.body.classList.toggle('light', $themeValue === 'light')
</script>

<main>
    {#if gameType === 'client' && !id}
        <section class="screen" in:fade={{delay: 401}} out:fade>
            <IdDialog on:submit={event => id = event.detail} on:cancel={() => gameType = undefined}/>
        </section>
    {:else if gameType === undefined}
        <section class="screen menu" in:fade={{delay: 401}} out:fade>
            <h2>Start Game</h2>
            <button on:click={() => gameType = 'single'}>Single Device</button>
            <button on:click={host}>Host</button>
            <button on:click={() => gameType = 'client'}>Join</button>

            <Sidebar bind:theme={$themeSetting} noExit />
        </section>
    {:else}
        <section class="screen game" in:fade={{delay: 401}} out:fade>
            {#if gameType === 'single'}
                <Game />
            {:else if gameType === 'host'}
                <NetworkGame host {id} />
            {:else if gameType === 'client'}
                <NetworkGame {id} />
            {/if}
            <Sidebar bind:theme={$themeSetting} on:exit={exit}>
                {#if gameType === 'host'}
                    <InviteButton {id} link={createLink(id)} bind:open={inviteOpen} />
                {/if}
            </Sidebar>
        </section>
    {/if}
</main>

<style>
    .screen {
        display: grid;
        place-content: center;
        height: 100vh;
    }

    .menu {
        grid-auto-flow: row;
        gap: 1em;
    }
</style>
