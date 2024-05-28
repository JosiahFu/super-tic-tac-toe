<script lang="ts">
    import { scale } from 'svelte/transition';
    import { CloseIcon } from './icons/icons';

    export let open = false;
    
    let dialog: HTMLDialogElement
    
    $: if(open) {
        dialog?.showModal();
    }    

    function exit() {
        open = false;
    }
</script>

{#if open}
    <dialog bind:this={dialog} on:close|preventDefault transition:scale>
        <button on:click={exit}>
            <CloseIcon class="close-icon" />
        </button>
        <slot />
    </dialog>
{/if}

<style>
    dialog {
        position: relative;
        padding: 2em;
        border-radius: 2em;
        background-color: var(--dialog-color);
        border: none;
        color: inherit;
    }
    
    button {
        position: absolute;
        top: 1.4em;
        right: 1.4em;
        padding: 0.3em;
        border-radius: 50%;
    }
    
    :global(.close-icon) {
        height: 1.2em;
        width: 1.2em;
    }
</style>
