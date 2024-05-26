<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let value = ''
    
    export let optional = false;
    
    const dispatch = createEventDispatcher<{submit: string}>();
    
    function click() {
        if (optional || value) {
            dispatch('submit', value)
        }
    }
</script>

<div>
    <label>
        Id
        {#if optional}
            (optional)
        {/if}
        <input bind:value />
        <button on:click={click}>Enter</button>
    </label>
</div>
