<script lang="ts">
    import type { TransitionConfig } from 'svelte/transition';
    
    export let delay = 0

    function wipeDown(_node: HTMLElement, {duration = 200, delay = 0} = {}): TransitionConfig {
        return {
            duration,
            delay,
            css: (_, u) => `clip-path: inset(0 0 ${Math.floor(u*100)}% 0);`
        }
    }

    function wipeUp(_node: HTMLElement, {duration = 200, delay = 0} = {}): TransitionConfig {
        return {
            duration,
            delay,
            css: (_, u) => `clip-path: inset(${Math.floor(u*100)}% 0 0 0);`
        }
    }
</script>

<div class="container">
    <div class="xmark a" in:wipeDown={{delay: 200 + delay}} out:wipeUp={{delay: 200 + delay}} />
    <div class="xmark b" in:wipeDown={{delay}} out:wipeUp={{delay}} />
</div>

<style>
    .container {
        position: absolute;
        inset: 0;
    }

    .xmark {
        position: absolute;
        height: 100%;
        width: var(--border-width);
        left: calc(50% - var(--border-width) / 2);
        top: 0;
        background-color: red;
    }
    
    .a {
        rotate: -45deg;
    }

    .b {
        rotate: 45deg;
    }
</style>
