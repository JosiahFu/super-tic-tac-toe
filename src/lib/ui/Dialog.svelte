<script lang="ts">
    import { scale } from 'svelte/transition';
    import { CloseIcon } from '../icons/icons';

    export let open = false;
    
    let dialog: HTMLDialogElement
    
    $: if(open) {
        dialog?.showModal();
    }    

    function exit() {
        open = false;
    }
    
    function keyDown(event: KeyboardEvent) {
        if (!open) return;
        if (event.key === 'Escape') {
            exit();
        }
    }

    function click({clientX, clientY}: MouseEvent) {
        const {top, bottom, left, right} = dialog.getBoundingClientRect()
        if (clientX < right && clientX > left && clientY < bottom && clientY > top) return
        exit()
    }

    // // WIP
    // function scaleWithBackdropFade(node: HTMLDialogElement, {duration = 400, delay = 0} = {}):  TransitionConfig {
    //     const scaleConfig = scale(node, {duration, delay})

    //     return {
    //         duration,
    //         delay,
    //         css: (t, u) => `${scaleConfig.css?.(t, u)} &::backdrop { opacity: ${t}; }`
    //     }
    // }
</script>

{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <dialog bind:this={dialog} on:cancel|preventDefault transition:scale={{start: 0.7}} on:click={click}>
        <button on:click={exit}>
            <CloseIcon class="close-icon" />
        </button>
        <slot />
    </dialog>
{/if}

<svelte:window on:keydown={keyDown} />

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
