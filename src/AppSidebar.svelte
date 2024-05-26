<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import PopupButton from './lib/PopupButton.svelte';
    import ThemePicker from './ThemePicker.svelte';
    
    export let theme: 'light' | 'dark' | 'system';

    const dispatch = createEventDispatcher<{exit: undefined}>()
</script>

<PopupButton width=20em>
    <svelte:fragment slot="icon">Theme</svelte:fragment>
    <ThemePicker bind:theme />
</PopupButton>
<button on:click={() => dispatch('exit')}>Exit</button>
