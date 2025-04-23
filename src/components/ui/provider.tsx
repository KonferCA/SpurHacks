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
                    hover: { value: '#e6f2ff' },
                },
                offWhite: { value: '#DEEBFF' },
            },
        },
        semanticTokens: {
            colors: {
                danger: { value: '{colors.red}' },
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
