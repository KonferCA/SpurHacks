import type React from 'react';
import { createContext, useState, useContext, useMemo, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import Spline from '@splinetool/react-spline';

const SPLINE_SCENE_URL = 'https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode';

interface SplineContextType {
    isSplineLoaded: boolean;
    splineError: boolean;
    mountSpline: (container: HTMLDivElement | null, targetId?: string) => void;
    initialTargetId?: string | null;
    currentTargetId?: string | null;
}

const SplineContext = createContext<SplineContextType | undefined>(undefined);

export const useSpline = (): SplineContextType => {
    const context = useContext(SplineContext);
    if (!context) {
        throw new Error('useSpline must be used within a SplineProvider');
    }
    return context;
};

interface SplineProviderProps {
    children: React.ReactNode;
    initialTargetId?: string | null;
}

export const SplineProvider: React.FC<SplineProviderProps> = ({ children, initialTargetId = null }) => {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [splineError, setSplineError] = useState(false);
    const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(null);
    const [currentTargetId, setCurrentTargetId] = useState<string | null>(initialTargetId);

    // ref for the actual spline component instance if needed later
    // biome-ignore lint/suspicious/noExplicitAny: spline ref type complex
    const splineRef = useRef<any>(null); 

    const handleSplineLoad = useCallback(() => {
        setIsSplineLoaded(true);
        setSplineError(false);
    }, []);

    // biome-ignore lint/suspicious/noExplicitAny: spline error type unknown
    const handleSplineError = useCallback((error: any) => {
        console.error('central spline loading error:', error);
        setSplineError(true);
        setIsSplineLoaded(false); 
    }, []);

    const mountSpline = useCallback((container: HTMLDivElement | null, targetId: string | null = null) => {
        if (container !== targetElement || targetId !== currentTargetId) {
            setTargetElement(container);
            setCurrentTargetId(targetId);
        }
    }, [targetElement, currentTargetId]);

    const splineComponent = useMemo(() => (
        <Spline
            ref={splineRef}
            scene={SPLINE_SCENE_URL}
            onLoad={handleSplineLoad}
            onError={handleSplineError}
            style={{ width: '100%', height: '100%' }}
        />
    ), [handleSplineLoad, handleSplineError]);

    const contextValue = useMemo(() => ({
        isSplineLoaded,
        splineError,
        mountSpline,
        initialTargetId,
        currentTargetId,
    }), [isSplineLoaded, splineError, mountSpline, initialTargetId, currentTargetId]);

    return (
        <SplineContext.Provider value={contextValue}>
            {children}
            {targetElement && ReactDOM.createPortal(splineComponent, targetElement)}
            {!targetElement && !initialTargetId && (
                 <div style={{ position: 'fixed', top: -9999, left: -9999, width: 1, height: 1, overflow: 'hidden', pointerEvents: 'none' }}>
                    {splineComponent}
                 </div>
            )}
            {initialTargetId && !targetElement && (
                <div style={{ position: 'fixed', top: -9999, left: -9999, width: 1, height: 1, overflow: 'hidden', pointerEvents: 'none' }}>
                    {splineComponent}
                </div>
            )}
        </SplineContext.Provider>
    );
}; 