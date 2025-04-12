"use client";
import {
	ChakraProvider,
	defineConfig,
	defaultConfig,
	createSystem,
} from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
// import { PrimitiveTokenValue }
const spurhacksDesignConfig = defineConfig({
	strictTokens: false,
	theme: {
		breakpoints: {
			tablet: "992px",
			desktop: "1200px",
			wide: "1400px",
		},
		tokens: {
			colors: {
				brand: {
					orange: { value: "#FFA75F" },
					100: { value: "#e6f2ff" },
					200: { value: "#bfdeff" },
					300: { value: "#99caff" },
				},
			},
		},
		semanticTokens: {
			colors: {
				danger: { value: "{colors.red}" },
			},
		},
		keyframes: {
			spin: {
				from: { transform: "rotate(0deg)" },
				to: { transform: "rotate(360deg)" },
			},
		},
	},
});

const spurhacksSystem = createSystem(defaultConfig, spurhacksDesignConfig);

export function Provider(props: ColorModeProviderProps) {
	return (
		// <CacheProvider value={emotionCache}>
		<ChakraProvider value={spurhacksSystem}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
		// </CacheProvider>
	);
}
