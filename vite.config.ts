import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', ],
            manifest: {
                name: 'Super Tic Tac Toe',
                short_name: 'Super TTT',
                description: 'Multiplayer Super Tic Tac Toe',
                theme_color: '#1c1c1c',
                icons: [
                    {
                        src: 'icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ]
            }
        }),
    ],
    base: '/super-tic-tac-toe',
})
