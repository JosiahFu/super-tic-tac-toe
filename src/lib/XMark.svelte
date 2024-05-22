<script lang="ts">
    import type { TransitionConfig } from 'svelte/transition';

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
    <div class="xmark a" in:wipeDown={{delay: 200}} out:wipeUp={{delay: 200}} />
    <div class="xmark b" in:wipeDown out:wipeUp />
</div>

<style>
    .container {
        height: 100px;
        width: 100px;
        position: relative;
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
