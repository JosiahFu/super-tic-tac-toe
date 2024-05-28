<script lang="ts">
    import { fade } from 'svelte/transition';
    import Game from './Game.svelte';
    import IdDialog from './IdDialog.svelte';
    import NetworkGame from './NetworkGame.svelte';
    import { theme } from './lib/theme';
    import Sidebar from './Sidebar.svelte';
    import InviteButton from './InviteButton.svelte';
    import { localBoolean } from './lib/localStore';
    
    const joinId = new URLSearchParams(window.location.search).get('join')
    
    let gameType: 'single' | 'host' | 'client' | undefined = joinId ? 'client' : undefined;
    let id = joinId || '';
    
    let inviteOpen = false;
    let idDialog: IdDialog | undefined;

    const [themeSetting, themeValue] = theme()
    const highContrast = localBoolean('highContrast', false)

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
    }
    
    function exit() {
        gameType = undefined;
        id = '';
        inviteOpen = false;
    }
    
    $: document.body.classList.toggle('light', $themeValue === 'light')
    $: document.body.classList.toggle('high-contrast', $highContrast)
</script>

<main>
    {#if gameType === 'client' && !id}
        <section class="screen" in:fade={{delay: 401}} out:fade on:introend={() => idDialog?.focus()}>
            <IdDialog on:submit={event => id = event.detail} on:cancel={() => gameType = undefined} bind:this={idDialog} />
        </section>
    {:else if gameType === undefined}
        <section class="screen menu" in:fade={{delay: 401}} out:fade>
            <h1>Super Tic Tac Toe</h1>
            <h2>Start Game</h2>
            <button on:click={() => gameType = 'single'}>Single Device</button>
            <button on:click={host}>Host</button>
            <button on:click={() => gameType = 'client'}>Join</button>

            <Sidebar bind:theme={$themeSetting} bind:highContrast={$highContrast} noExit />
        </section>
    {:else}
        <section class="screen" in:fade={{delay: 401}} out:fade on:introend={() => inviteOpen = true}>
            {#if gameType === 'single'}
                <Game />
            {:else if gameType === 'host'}
                <NetworkGame host {id} />
            {:else if gameType === 'client'}
                <NetworkGame {id} />
            {/if}
            <Sidebar bind:theme={$themeSetting} bind:highContrast={$highContrast} on:exit={exit}>
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
    
    button {
        justify-content: center;
        font-size: 1.5em;
    }
    
    h2 {
        font-size: 2em;
        margin: 0.5em 0;
    }
    
    h1 {
        font-size: 2.5em;
        margin: 0.5em 0;
    }
</style>
