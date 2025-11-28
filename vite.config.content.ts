import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
        modulePreload: { polyfill: false },
        emptyOutDir: false, // Don't delete dist/ populated by main build
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, 'src/content/index.tsx'),
            name: 'ContentScript',
            fileName: () => 'content.js',
            formats: ['iife'],
        },
        rollupOptions: {
            output: {
                extend: true,
            },
        },
    },
})
