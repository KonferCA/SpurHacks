import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/*
 *
 * @description Vite configuration
 *
 */
export default defineConfig({
    plugins: [react(), tailwindcss(), tsconfigPaths()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@contexts': path.resolve(__dirname, './src/contexts'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@locales': path.resolve(__dirname, './src/locales'),
            '@data': path.resolve(__dirname, './src/data'),
        },
    },
});
