'use client';
import {
    ChakraProvider,
    defineConfig,
    defaultConfig,
    createSystem,
} from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const spurhacksDesignConfig = defineConfig({
    strictTokens: false,
    theme: {
        breakpoints: {
            tablet: '992px',
            desktop: '1200px',
            wide: '1400px',
        },
        tokens: {
            colors: {
                orange: {
                    default: { value: '#FFA75F' },
                    hover: { value: '#FF8C2B' },
                },
                offWhite: { value: '#DEEBFF' },
            },
            shadows: {
                button: {
                    value: '0 4px 8px rgba(255, 167, 95, 0.4)',
                },
            },
        },
        semanticTokens: {
            colors: {
                danger: { value: '{colors.red}' },
            },
            shadows: {
                orangeGlow: { value: '{shadows.button}' },
            },
        },
        keyframes: {
            spin: {
                from: { transform: 'rotate(0deg)' },
                to: { transform: 'rotate(360deg)' },
            },
        },
    },
});

const spurhacksSystem = createSystem(defaultConfig, spurhacksDesignConfig);

export function Provider(props: ColorModeProviderProps) {
    return (
        <ChakraProvider value={spurhacksSystem}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    );
}
