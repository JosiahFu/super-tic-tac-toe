import { onDestroy } from 'svelte';
import { readonly, writable, type Readable, type Writable } from 'svelte/store';

function localString<S extends string = string>(key: string, defaultValue: S, sync = false): Writable<S> {
    const store = writable(localStorage.getItem(key) as S ?? defaultValue);
    
    const unsubscribe = store.subscribe(value => {
        localStorage.setItem(key, value);
    })
    
    if (sync) {
        const handler = (event: StorageEvent) => {
            if (event.storageArea !== localStorage) return
            if (event.key !== key) return
            const value = localStorage.getItem(key)
            if (value !== null) store.set(value as S)
        }
        window.addEventListener('storage', handler)
        
        onDestroy(() => window.removeEventListener('storage', handler))
    }
    
    onDestroy(unsubscribe)
    
    return store;
}

export function theme(defaultSetting: 'light' | 'dark' | 'system' = 'system'): [setting: Writable<'light' | 'dark' | 'system'>, state: Readable<'light' | 'dark'>] {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    
    function value($setting: 'light' | 'dark' | 'system') {
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
