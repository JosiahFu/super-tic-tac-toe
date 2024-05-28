<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { KeyboardEventHandler } from 'svelte/elements';

    export let value = ''
    
    export let optional = false;
    
    const dispatch = createEventDispatcher<{submit: string, cancel: undefined}>();
    
    function submit() {
        if (optional || value) {
            dispatch('submit', value)
        }
    }
    
    const keydown: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.key === 'Enter') {
            submit();
        }
    }
</script>

<div class="container">
    <label>
        <h2>
            Game Id
            {#if optional}
                (optional)
            {/if}
        </h2>
        <input bind:value on:keydown={keydown} />
    </label>

    <div class="button-container">
        <button on:click={() => dispatch('cancel')}>Cancel</button>
        {' '}
        <button on:click={submit}>Submit</button>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .button-container {
        text-align: center;
    }

    label {
        display: contents;
    }
</style>
