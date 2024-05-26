<script lang="ts">
    type T = $$Generic

    export let group: T;
    export let value: NoInfer<T>;
</script>

<button on:click={() => group = value} class:selected={group === value}>
    <slot />
</button>

<style>
    button {
        opacity: 0.6;
        border: 1px solid transparent;
    }

    .selected {
        opacity: 1;
        border-color: var(--fg-color);
    }
</style>
