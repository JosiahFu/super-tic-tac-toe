import { derived, type Writable } from 'svelte/store'

export function derivedWritable<T, U>(
    source: Writable<T>,
    to: (value: T) => U,
    from: (value: U) => T
): Writable<U> {
    const store = derived(source, to)

    return {
        ...store,
        set(value) {
            source.set(from(value))
        },
        update(updater) {
            source.update(value => from(updater(to(value))))
        },
    }
}
