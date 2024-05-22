<script lang="ts">
    import { radialWipeCw, radialWipeCcw } from './radialWipe';
</script>

<div class="circle" in:radialWipeCw out:radialWipeCcw />

<style>
    .circle {
        width: 100px;
        height: 100px;
        border: var(--border-width) blue solid;
        border-radius: 50%;
        box-sizing: border-box;
    }
</style>
