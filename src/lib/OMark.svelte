<script lang="ts">
    import { radialWipeCw, radialWipeCcw } from './radialWipe';
    
    export let delay = 0;
    
    $: params = {delay}
</script>

<div class="circle" in:radialWipeCw={params} out:radialWipeCcw={params} />

<style>
    .circle {
        position: absolute;
        inset: 10%;
        border: var(--border-width) blue solid;
        border-radius: 50%;
        box-sizing: border-box;
    }
</style>
