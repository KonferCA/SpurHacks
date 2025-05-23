import type React from 'react';
import { useEffect, useRef, useCallback, useState } from 'react';
import { Box, type SystemStyleObject, Image } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { useSpline } from '@contexts';
import { getGPUTier } from 'detect-gpu';

interface SplineTargetProps {
    id?: string;
    minHeight?: string | number | SystemStyleObject;
    height?: string | number | SystemStyleObject;
    width?: string | number | SystemStyleObject;
    position?: string | SystemStyleObject;
    top?: string | number | SystemStyleObject;
    left?: string | number | SystemStyleObject;
    right?: string | number | SystemStyleObject;
    bottom?: string | number | SystemStyleObject;
    zIndex?: number;
    bg?: string | SystemStyleObject;
    maskImage?: string | SystemStyleObject;
    WebkitMaskImage?: string | SystemStyleObject;
    maxH?: string | number | SystemStyleObject;
}

export const SplineTarget: React.FC<SplineTargetProps> = ({
    id,
    minHeight = '100%',
    height = '100%',
    width = '100%',
    position = 'absolute',
    top = 0,
    left = 0,
    zIndex = 0,
    bg = 'black',
    maskImage,
    WebkitMaskImage,
    maxH,
    ...rest
}) => {
    const {
        mountSpline,
        isSplineLoaded,
        splineError,
        initialTargetId,
        currentTargetId,
    } = useSpline();
    const [isReadyToShow, setIsReadyToShow] = useState(false);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const isInitialTarget = id && id === initialTargetId;
    const [hasInitiallyMounted, setHasInitiallyMounted] = useState(false);
    const [allowSplineRendering, setAllowSplineRendering] = useState(false);
    const [performanceCheckComplete, setPerformanceCheckComplete] =
        useState(false);

    useEffect(() => {
        (async () => {
            try {
                const gpuTier = await getGPUTier();
                if (gpuTier.tier >= 2) {
                    setAllowSplineRendering(true);
                } else {
                    setAllowSplineRendering(false);
                    console.log(`Spline disabled (gpuTier: ${gpuTier.tier})`);
                }
            } catch (e) {
                console.error('detect-gpu error:', e);
                setAllowSplineRendering(false);
            } finally {
                setPerformanceCheckComplete(true);
            }
        })();
    }, []);

    const { ref: inViewRef, inView } = useInView({
        threshold: 0.3,
        triggerOnce: false,
        skip: !!(isInitialTarget && !hasInitiallyMounted),
    });

    const setRefs = useCallback(
        (node: HTMLDivElement | null) => {
            (
                placeholderRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = node;
            inViewRef(node);
        },
        [inViewRef]
    );

    useEffect(() => {
        if (!performanceCheckComplete || !allowSplineRendering) {
            if (
                performanceCheckComplete &&
                !allowSplineRendering &&
                currentTargetId === id
            ) {
                mountSpline(null, undefined);
            }
            return;
        }

        if (isInitialTarget && !hasInitiallyMounted && placeholderRef.current) {
            mountSpline(placeholderRef.current, id);
            setHasInitiallyMounted(true);
        }
    }, [
        isInitialTarget,
        hasInitiallyMounted,
        mountSpline,
        id,
        allowSplineRendering,
        performanceCheckComplete,
        currentTargetId,
    ]);

    useEffect(() => {
        if (!performanceCheckComplete || !allowSplineRendering) {
            setIsReadyToShow(false);
            if (
                performanceCheckComplete &&
                !allowSplineRendering &&
                currentTargetId === id
            ) {
                mountSpline(null, undefined);
            }
            return;
        }

        if (isInitialTarget && !hasInitiallyMounted) return;

        let timeoutId: NodeJS.Timeout | null = null;
        if (inView) {
            mountSpline(placeholderRef.current, id ?? undefined);
            if (isSplineLoaded) {
                timeoutId = setTimeout(() => {
                    setIsReadyToShow(true);
                }, 0);
            } else {
                setIsReadyToShow(false);
            }
        } else {
            setIsReadyToShow(false);
            if (!isInitialTarget && currentTargetId === id) {
                mountSpline(null, undefined);
            }
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (
                placeholderRef.current &&
                !isInitialTarget &&
                currentTargetId === id
            ) {
                mountSpline(null, undefined);
            }
        };
    }, [
        inView,
        mountSpline,
        isSplineLoaded,
        id,
        isInitialTarget,
        hasInitiallyMounted,
        currentTargetId,
        allowSplineRendering,
        performanceCheckComplete,
    ]);

    if (!performanceCheckComplete) {
        return (
            <Box
                position={position}
                top={top}
                left={left}
                width={width}
                height={height}
                minHeight={minHeight}
                maxH={maxH}
                bg={bg}
                zIndex={zIndex}
                {...rest}
            />
        );
    }

    if (!allowSplineRendering) {
        return (
            <Image
                src="/background.png"
                alt="Interactive background disabled for performance"
                position={position}
                top={top}
                left={left}
                width={width}
                height={height}
                minHeight={minHeight}
                maxH={maxH}
                zIndex={zIndex}
                objectFit="cover"
            />
        );
    }

    const isVisible = isReadyToShow;
    const showPlaceholderBg = !isVisible && (!isSplineLoaded || splineError);

    return (
        <Box
            ref={setRefs}
            position={position}
            top={top}
            left={left}
            width={width}
            height={height}
            minHeight={minHeight}
            maxH={maxH}
            zIndex={zIndex}
            bg={showPlaceholderBg ? bg : 'transparent'}
            maskImage={maskImage}
            WebkitMaskImage={WebkitMaskImage}
            opacity={isVisible ? 1 : 0}
            transition="opacity 0.6s ease-in-out"
            {...rest}
        />
    );
};
