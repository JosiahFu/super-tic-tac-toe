<script lang="ts">
    import { fade } from 'svelte/transition';
    import Game from './Game.svelte';
    import IdDialog from './IdDialog.svelte';
    import NetworkGame from './NetworkGame.svelte';
    import { theme } from './lib/theme';
    import MultiButton from './lib/MultiButton.svelte';
    import ThemePicker from './ThemePicker.svelte';
    import AppSidebar from './AppSidebar.svelte';
    
    const joinId = new URLSearchParams(window.location.search).get('join')
    
    let gameType: 'single' | 'host' | 'client' | undefined = joinId ? 'client' : undefined;
    let id = joinId || '';

    const [themeSetting, themeValue] = theme()

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
    
    $: if ($themeValue === 'light') {
        document.body.classList.add('light')
    } else {
        document.body.classList.remove('light')
    }
</script>

<script lang="ts" context="module">
    export function createLink(id: string) {
        return `${window.location.origin}${window.location.pathname}?join=${id}`
    }
</script>

<main>
    {#if gameType === undefined}
        <section class="menu" in:fade={{delay: 401}} out:fade>
            <div class="column">
                <h2>Start Game</h2>
                <button on:click={() => gameType = 'single'}>Single Device</button>
                <button on:click={host}>Host</button>
                <button on:click={() => gameType = 'client'}>Join</button>
            </div>
            
            <div class="column">
                <ThemePicker bind:theme={$themeSetting} />
            </div>
        </section>
    {:else}
        <section class="game" in:fade={{delay: 401}} out:fade>
            {#if gameType === 'single'}
                <Game>
                    <AppSidebar slot="sidebar" bind:theme={$themeSetting} on:exit={exit} />
                </Game>
            {:else if gameType === 'host'}
                <NetworkGame host {id}>
                    <AppSidebar slot="sidebar" bind:theme={$themeSetting} on:exit={exit} />
                </NetworkGame>
            {:else if gameType === 'client'}
                {#if !id}
                    <IdDialog on:submit={event => id = event.detail}/>
                {:else}
                    <NetworkGame {id}>
                        <AppSidebar slot="sidebar" bind:theme={$themeSetting} on:exit={exit} />
                    </NetworkGame>
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
    
    .menu {
        height: 100vh;
        display: grid;
        place-content: center;
        grid-auto-flow: column;
        gap: 2em;
    }
    
    .column {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
</style>
