<script lang="ts">
    import DialogButton from "./lib/DialogButton.svelte";
    import MultiButton from './lib/MultiButton.svelte';
    import { ContrastIcon, DarkModeIcon, LightModeIcon, MonitorIcon, NoContrastIcon, ThemeIcon } from './lib/icons/icons';
    import type { ThemeSetting } from './lib/theme';

    export let theme: ThemeSetting;
    export let highContrast: boolean;
</script>

<DialogButton tooltip="Theme">
    <ThemeIcon slot="button" />
    
    <div class="container">
        
        <div class="column">
            <h2>Theme</h2>

            <div class="button-container">
                <MultiButton bind:group={theme} value='system' class="theme-multibutton">
                    <MonitorIcon />
                    System
                </MultiButton>
                <MultiButton bind:group={theme} value='light' class="theme-multibutton">
                    <LightModeIcon />
                    Light
                </MultiButton>
                <MultiButton bind:group={theme} value='dark' class="theme-multibutton">
                    <DarkModeIcon />
                    Dark
                </MultiButton>
            </div>
        </div>
        
        <div class="column">
            <h2>High Contrast</h2>
            
            <div class="button-container">
                <MultiButton bind:group={highContrast} value={false} class="theme-multibutton">
                    <NoContrastIcon />
                    Off
                </MultiButton>
                <MultiButton bind:group={highContrast} value={true} class="theme-multibutton">
                    <ContrastIcon />
                    On
                </MultiButton>
            </div>
        </div>
    </div>

</DialogButton>

<style>
    .container {
        display: flex;
        flex-direction: row;
        gap: 2em;
        margin: 0 2em;
    }

    .button-container {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-content: center;
        width: min-content;
        margin-left: auto;
        margin-right: auto;
    }
</style>
