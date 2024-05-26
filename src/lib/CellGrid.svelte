<script>
    export let fade = false;
</script>

<div class="grid" class:fade>
    <slot index={0} /> <div class="vert" /> <slot index={1} /> <div class="vert" /> <slot index={2} />
    <div class="hor" />
    <slot index={3} /> <div class="vert" /> <slot index={4} /> <div class="vert" /> <slot index={5} />
    <div class="hor" />
    <slot index={6} /> <div class="vert" /> <slot index={7} /> <div class="vert" /> <slot index={8} />
</div>

<style>
    .grid {
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr;
        grid-template-rows: 1fr auto 1fr auto 1fr;
        transition: opacity 0.4s 0.4s;
        padding: inherit;
    }
    
    .fade {
        opacity: 0.3;
    }
    
    .vert, .hor {
        background-color: var(--fg-color);
    }
    
    .vert {
        width: var(--border-width);
    }
    
    .hor {
        grid-column: span 5;
        height: var(--border-width);
    }
</style>
