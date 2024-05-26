<script lang="ts">
    export let shown = false;
    let hovered = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container" on:mouseenter={() => hovered = true} on:mouseleave={() => hovered = false} on:click|stopPropagation={() => {}}>
    <div class="popup-container">
        {#if shown || hovered}
            <div class="popup">
                <slot />
            </div>
        {/if}
    </div>

    <button on:click={() => shown = true}>
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
        right: 0;
        top: 0;
    }
</style>
