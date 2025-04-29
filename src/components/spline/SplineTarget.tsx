import type React from 'react';
import { useEffect, useRef, useCallback, useState } from 'react';
import { Box } from '@chakra-ui/react';
import type { SystemStyleObject } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { useSpline } from '@contexts/SplineContext';

interface SplineTargetProps {
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
    const { mountSpline, isSplineLoaded, splineError } = useSpline();
    const [isReadyToShow, setIsReadyToShow] = useState(false);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const { ref: inViewRef, inView } = useInView({
        threshold: 0.3, // guesstimating 30% of the target is in view is our target threshold
        triggerOnce: false, 
    });

    const setRefs = useCallback(
        (node: HTMLDivElement | null) => {
            (placeholderRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            inViewRef(node);
        },
        [inViewRef]
    );

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        if (inView) {
            mountSpline(placeholderRef.current);
            if (isSplineLoaded) {
                timeoutId = setTimeout(() => {
                    setIsReadyToShow(true);
                }, 0); 
            } else {
                setIsReadyToShow(false);
            }
        } else {
            setIsReadyToShow(false);
            mountSpline(null); 
        }

        return () => {
             if (timeoutId) clearTimeout(timeoutId);
            if (placeholderRef.current && !inView) {
                 mountSpline(null); 
             }
        };
    }, [inView, mountSpline, isSplineLoaded]);

    const showPlaceholderBg = !isReadyToShow && (!isSplineLoaded || splineError);

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
            opacity={isReadyToShow ? 1 : 0}
            transition="opacity 0.6s ease-in-out"
            {...rest}
        >
        </Box>
    );
}; 