<script lang="ts">
    import Dialog from './Dialog.svelte';
    import TooltipButton from './TooltipButton.svelte';

    export let tooltip: string;
    export let open = false;
</script>

<TooltipButton
    on:click={() => open = true}
    {tooltip}>
    <slot name="button" />
</TooltipButton>

<Dialog bind:open>
    <slot />
</Dialog>
