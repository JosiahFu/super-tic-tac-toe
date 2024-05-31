import { onDestroy } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import { derivedWritable } from './derivedWritable'

export function localString<S extends string = string>(
    key: string,
    defaultValue: S,
    sync = false,
    component = false
): Writable<S> {
    const store = writable((localStorage.getItem(key) as S) ?? defaultValue)

    const unsubscribe = store.subscribe(value => {
        localStorage.setItem(key, value)
    })

    if (sync) {
        const handler = (event: StorageEvent) => {
            if (event.storageArea !== localStorage) return
            if (event.key !== key) return
            const value = localStorage.getItem(key)
            if (value !== null) store.set(value as S)
        }
        window.addEventListener('storage', handler)

        if (component) {
            onDestroy(() => window.removeEventListener('storage', handler))
        }
    }

    if (component) {
        onDestroy(unsubscribe)
    }

    return store
}

export function localBoolean(
    key: string,
    defaultValue: boolean = false,
    sync = false,
    component = false
): Writable<boolean> {
    const store = localString<'true' | 'false'>(
        key,
        defaultValue ? 'true' : 'false',
        sync,
        component
    )

    return derivedWritable(
        store,
        value => value === 'true',
        value => (value ? 'true' : 'false')
    )
}
