<script lang="ts">
    import MultiButton from './lib/MultiButton.svelte';

    export let theme: 'light' | 'dark' | 'system';
</script>

<h2>Theme</h2>
<MultiButton bind:group={theme} value='light'>Light</MultiButton>
<MultiButton bind:group={theme} value='dark'>Dark</MultiButton>
<MultiButton bind:group={theme} value='system'>System</MultiButton>
