<script lang="ts">
    export let delay = false;
    export let hoverable = false;
    export let active: boolean;

</script>

<div class="container" class:active class:hoverable class:delay>
    <div class="xmark a" />
    <div class="xmark b" />
</div>

<style>
    .container {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: 0.3s;
        display: none;
    }

    .container.active, .container.hoverable {
        display: block
    }
    
    .container.hoverable:hover {
        opacity: 0.5;
        transition: 0.1s;
    }
    
    .container.active {
        opacity: 1;
    }

    .xmark {
        position: absolute;
        height: 100%;
        width: var(--border-width);
        left: calc(50% - var(--border-width) / 2);
        top: 0;
        background-color: var(--x-color);
    }
    
    .active .xmark {
        animation: wipe-down 0.2s linear both;
    }
    
    .xmark.a {
        animation-delay: 0.2s;
    }
    
    .delay .xmark {
        animation-delay: 0.4s;
    }
    
    .delay .xmark.a {
        animation-delay: 0.6s;
    }
    
    .a {
        rotate: -45deg;
    }

    .b {
        rotate: 45deg;
    }
    
    @keyframes wipe-down {
        0% { clip-path: inset(0 0 100% 0) }
        100% { clip-path: inset(0 0 0 0) }
    }
</style>
