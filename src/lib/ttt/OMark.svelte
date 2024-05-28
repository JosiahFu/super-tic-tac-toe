<script lang="ts">
    export let delay = false;
    export let hoverable = false;
    export let active: boolean;
</script>

<div class="circle" class:active class:hoverable class:delay />

<style>
    .circle {
        position: absolute;
        inset: 10%;
        border: var(--border-width) var(--o-color) solid;
        border-radius: 50%;
        box-sizing: border-box;
        opacity: 0;
        transition: 0.3s;
        display: none;
    }
    
    .circle.active, .circle.hoverable {
        display: block
    }
    
    :global(.mark):hover .circle.hoverable {
        opacity: 0.5;
        transition: 0.1s;
    }
    
    .circle.active {
        opacity: 1;
        animation: wipe-radial 0.4s linear both;
    }
    
    .circle.delay {
        animation-delay: 0.4s;
    }
    
    @keyframes wipe-radial {
        0%   { clip-path: polygon(50% 50%, 50% -50%, 50% -50%, 50% -50%, 50% -50%, 50% -50%); }
        25%  { clip-path: polygon(50% 50%, 50% -50%, 150% 50%, 150% 50%, 150% 50%, 150% 50%); }
        50%  { clip-path: polygon(50% 50%, 50% -50%, 150% 50%, 50% 150%, 50% 150%, 50% 150%); }
        75%  { clip-path: polygon(50% 50%, 50% -50%, 150% 50%, 50% 150%, -50% 50%, -50% 50%); }
        100% { clip-path: polygon(50% 50%, 50% -50%, 150% 50%, 50% 150%, -50% 50%, 50% -50%); }
    }
</style>
