export function getAssetUrl(path: string) {
    try {
        if (path.endsWith('.svg')) {
            return `/src/assets/sponsors/${path}`;
        }

        const assetModule = `/src/assets/sponsors/${path}`;

        return assetModule;
    } catch (error) {
        console.error(`Failed to load asset: ${path}`, error);

        return `/failed-to-load/${path}`;
    }
}
