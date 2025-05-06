import { Provider } from '@components';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Router } from '@utils';
import { SplineProvider } from '@contexts';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

import '@fontsource/geist-sans/100.css';
import '@fontsource/geist-sans/200.css';
import '@fontsource/geist-sans/300.css';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/800.css';
import '@fontsource/geist-sans/900.css';

createRoot(rootElement).render(
    <StrictMode>
        <Provider>
            <SplineProvider initialTargetId="hero">
                <Router />
            </SplineProvider>
        </Provider>
    </StrictMode>
);
