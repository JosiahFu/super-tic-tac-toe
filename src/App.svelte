<script lang="ts">
    import Game from './Game.svelte';

    let host = false;
    let id = '';
    let started = false;

    $: canStart = host || id !== '';

    function start() {
        if (!canStart) return;
        started = true;
    }

    function genBaseId() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return [...new Array(4).keys()].map(() => letters[Math.floor(letters.length * Math.random())]).join('')
    }
</script>

<main>
    {#if started}
        <Game {host} id={id || genBaseId()} />
    {:else}
        <p>
            <label>
                <input type="checkbox" bind:checked={host} />
                Host
            </label>
        </p>

        <p>
            <label>
                Id
                {#if host}
                    (leave blank to autogen)
                {/if}
                <input type="text" bind:value={id} />
            </label>
        </p>

        <p><button disabled={!canStart} on:click={start}>Start</button></p>
    {/if}
</main>
