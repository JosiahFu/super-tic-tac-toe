<script lang="ts">
    type T = $$Generic

    export let group: T
    export let value: NoInfer<T>
    let clazz: string = ''

    export { clazz as class }
</script>

<button
    on:click={() => (group = value)}
    class:selected={group === value}
    class={clazz}>
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
