export function getAssetUrl(path: string) {
    const isProd = import.meta.env.PROD;
    
    // production
    if (isProd) {
        return `/sponsors/${path}`;
    }

    // development
    return `/sponsors/${path}`;
}
