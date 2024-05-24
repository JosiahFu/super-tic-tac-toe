<script lang="ts">
    export let index: number;
    
    const left = index % 3 > 0
    const top = index >= 3
    
    export let fade = false;
</script>

<div class="gridcell" class:left class:top class:fade>
    <slot />
</div>

<style>
    .gridcell {
        transition: opacity 0.4s 0.4s;
        border: 0 solid white;
        display: grid;
        place-items: stretch;
    }
    
    .left {
        border-left-width: var(--border-width);
    }
    
    .top {
        border-top-width: var(--border-width);
    }
    
    .fade {
        opacity: 0.5;
    }
</style>
