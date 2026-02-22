import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'CalTracker',
        short_name: 'CalTracker',
        description: 'Ton tracker de calories professionnel et minimaliste',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon?size=192x192',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon?size=512x512',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon?size=180x180',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}
