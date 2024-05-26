<script lang="ts">
    export let shown = false;
    export let width = '';
    export let offset = '0.5em';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container" on:click|stopPropagation={() => shown = true}>
    <div class="popup-container">
        <div class="popup" style:width style:right={offset} class:hover={true} class:shown>
            <slot />
        </div>
    </div>

    <button>
        <slot name="icon" />
    </button>
</div>

<svelte:window on:click={() => shown = false} />

<style>
    .popup-container {
        position: relative;
        height: 0;
        width: 0;
    }
    
    .popup {
        position: absolute;
        top: 0;
        background-color: var(--dialog-color);
        padding: 1em;
        border-radius: 1.5em;
        visibility: hidden;
        transition: step-start 0s 0.1s;
    }
    
    .container:hover .popup.hover, .popup.shown {
        visibility: visible;
        transition-delay: 0s;
    }
</style>
