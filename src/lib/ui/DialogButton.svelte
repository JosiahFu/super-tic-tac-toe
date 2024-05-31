<script lang="ts">
    import Dialog from './Dialog.svelte'
    import TooltipButton from './TooltipButton.svelte'

    export let tooltip: string
    export let tooltipShown = false
    export let open = false
    export let disabled = false
</script>

<TooltipButton
    on:click={() => (open = true)}
    {tooltip}
    shown={tooltipShown}
    {disabled}>
    <slot name="button" />
</TooltipButton>

<Dialog bind:open>
    <slot />
</Dialog>
