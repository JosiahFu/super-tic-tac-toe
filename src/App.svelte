<script lang="ts">
    import { fade } from 'svelte/transition'
    import Game from './Game.svelte'
    import IdDialog from './IdDialog.svelte'
    import NetworkGame from './NetworkGame.svelte'
    import { highContrast, themeSetting, themeState } from './lib/theme'
    import Sidebar from './Sidebar.svelte'
    import ConnectionButton from './ConnectionButton.svelte'

    const joinId = new URLSearchParams(window.location.search).get('join')

    let gameType: 'single' | 'host' | 'client' | undefined = joinId
        ? 'client'
        : undefined
    let id = joinId || ''

    let inviteDialog: ConnectionButton | undefined
    let idDialog: IdDialog | undefined
    let connected: boolean = false

    function genBaseId() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return [...new Array(4).keys()]
            .map(() => letters[Math.floor(letters.length * Math.random())])
            .join('')
    }

    function createLink(id: string) {
        return `${window.location.origin}${window.location.pathname}?join=${id}`
    }

    function host() {
        gameType = 'host'
        id = genBaseId()
    }

    function exit() {
        gameType = undefined
        id = ''
        connected = false
        window.history.replaceState(
            {},
            '',
            `${window.location.origin}${window.location.pathname}`
        )
    }

    $: document.body.classList.toggle('light', $themeState === 'light')
    $: document.body.classList.toggle('high-contrast', $highContrast)
</script>

<main>
    {#if gameType === 'client' && !id}
        <section
            class="screen"
            in:fade={{ delay: 401 }}
            out:fade
            on:introend={() => idDialog?.focus()}>
            <IdDialog
                on:submit={event => (id = event.detail)}
                on:cancel={() => (gameType = undefined)}
                bind:this={idDialog} />
        </section>
    {:else if gameType === undefined}
        <section class="screen menu" in:fade={{ delay: 401 }} out:fade>
            <h1>Super Tic Tac Toe</h1>
            <h2>Start Game</h2>
            <button on:click={() => (gameType = 'single')}
                >Single Device</button>
            <button on:click={host}>Host</button>
            <button on:click={() => (gameType = 'client')}>Join</button>

            <Sidebar noExit />
        </section>
    {:else}
        <section
            class="screen"
            in:fade={{ delay: 401 }}
            out:fade
            on:introend={() => {
                if (gameType === 'host') inviteDialog?.open()
            }}>
            {#if gameType === 'single'}
                <Game />
            {:else if gameType === 'host'}
                <NetworkGame host {id} bind:connected />
            {:else if gameType === 'client'}
                <NetworkGame {id} bind:connected />
            {/if}
            <Sidebar on:exit={exit}>
                {#if gameType !== 'single'}
                    <ConnectionButton
                        {id}
                        link={createLink(id)}
                        {connected}
                        host={gameType === 'host'}
                        bind:this={inviteDialog} />
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
