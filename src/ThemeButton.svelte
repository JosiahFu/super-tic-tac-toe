<script lang="ts">
    import DialogButton from "./lib/DialogButton.svelte";
    import MultiButton from './lib/MultiButton.svelte';
    import { DarkModeIcon, LightModeIcon, MonitorIcon, ThemeIcon } from './lib/icons/icons';

    export let theme: 'light' | 'dark' | 'system';
</script>

<DialogButton tooltip="Theme">
    <ThemeIcon slot="button" />
    
    <h2>Theme</h2>
    
    <div class="multibutton-container">
        <MultiButton bind:group={theme} value='light' class="theme-multibutton">
            <LightModeIcon />
            Light
        </MultiButton>
        <MultiButton bind:group={theme} value='dark' class="theme-multibutton">
            <DarkModeIcon />
            Dark
        </MultiButton>
        <MultiButton bind:group={theme} value='system' class="theme-multibutton">
            <MonitorIcon />
            System
        </MultiButton>
    </div>

</DialogButton>

<style>
    .multibutton-container {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        margin: 0 4em;
    }
    
    .multibutton-container > :global(.theme-multibutton) {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5em;
    }
</style>
