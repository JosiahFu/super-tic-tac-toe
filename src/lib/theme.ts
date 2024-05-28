import { onDestroy } from 'svelte';
import { readonly, writable, type Readable, type Writable } from 'svelte/store';
import { localString } from './localStore';

export type ThemeSetting = 'light' | 'dark' | 'system';

export function theme(defaultSetting: ThemeSetting = 'system'): [setting: Writable<ThemeSetting>, state: Readable<'light' | 'dark'>] {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    
    function value($setting: ThemeSetting) {
        return $setting === 'system' ? media.matches ? 'dark' : 'light' : $setting
    }

    const setting = localString('theme', defaultSetting);
    const state = writable(value(defaultSetting));
    
    const handler = () => {
        state.set(media.matches ? 'dark' : 'light')
    }

    const unsubscribe = setting.subscribe($setting => {
        media.removeEventListener('change', handler)
        state.set(value($setting))
        if ($setting === 'system') {
            media.addEventListener('change', handler)
        }
    })

    onDestroy(() => {
        unsubscribe()
        media.removeEventListener('change', handler)
    })
    
    return [setting, readonly(state)]
}
