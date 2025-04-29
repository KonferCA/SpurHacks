import { Provider } from '@components';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Router } from '@utils';
import { SplineProvider } from '@contexts';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
    <StrictMode>
        <Provider>
            <SplineProvider>
                <Router />
            </SplineProvider>
        </Provider>
    </StrictMode>
);
