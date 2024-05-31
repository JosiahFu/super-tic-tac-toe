import { derived, readonly, type Writable } from 'svelte/store'
import { localBoolean, localString } from './stores/localStore'

type ThemeSetting = 'light' | 'dark' | 'system'

const media = window.matchMedia('(prefers-color-scheme: dark)')

const themeSetting = localString<ThemeSetting>('theme', 'system')

const themeState = derived<Writable<ThemeSetting>, 'light' | 'dark'>(
    themeSetting,
    ($themeSetting, set) => {
        if ($themeSetting !== 'system') {
            set($themeSetting)
            return
        }

        const handler = () => {
            set(media.matches ? 'dark' : 'light')
        }

        media.addEventListener('change', handler)
        handler()

        return () => media.removeEventListener('change', handler)
    }
)

const themeStateReadonly = readonly(themeState)

const highContrast = localBoolean('highContrast', false)

export {
    highContrast,
    themeSetting,
    themeStateReadonly as themeState,
    type ThemeSetting,
}
