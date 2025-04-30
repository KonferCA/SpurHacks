import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import { Suspense, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { lazy } from 'react';
import { CountUp } from '@components';

const LazySpline = lazy(() => import('@splinetool/react-spline'));

export const Statistics = () => {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [splineError, setSplineError] = useState(false);
    const componentRef = useRef(null);
    const isInView = useInView(componentRef, {
        once: true,
        margin: '-10% 0px',
    });

    const splineSceneUrl =
        'https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode';

    function onSplineLoad() {
        setIsSplineLoaded(true);
    }

    // biome-ignore lint: unsure of error type
    function onSplineError(error: any) {
        console.error('Spline loading error:', error);
        setSplineError(true);
    }

    return (
        <Flex className="relative bg-black min-h-screen" ref={componentRef}>
            {isInView && !splineError && (
                <Box w="50%" h="full" maxH="100%">
                    <Suspense fallback={<Box w="100%" h="100%" bg="black" />}>
                        <LazySpline
                            scene={splineSceneUrl}
                            onLoad={onSplineLoad}
                            onError={onSplineError}
                            className="w-1/2 max-h-screen absolute top-0 left-0 z-0"
                        />
                    </Suspense>
                </Box>
            )}

            {!isInView || !isSplineLoaded || splineError ? (
                <Box
                    w="50%"
                    h="full"
                    bg="black"
                    position="absolute"
                    left="0"
                    top="0"
                />
            ) : null}

            <Flex
                direction="column"
                gap={8}
                w="70%"
                justify="center"
                align="center"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:bg-gradient-to-l from-black from-70% to-black/0 focus:outline-none z-10"
            >
                <Flex
                    gap={[10, 20]}
                    direction="column"
                    fontWeight="extralight"
                    className="text-white"
                >
                    <Flex direction="column" gap={6}>
                        <Text fontFamily="Geist">Prize Value</Text>
                        <Heading
                            fontFamily="Geist"
                            fontSize={['5xl', '7xl']}
                            color="white"
                            fontWeight="light"
                        >
                            <CountUp to={100} prefix="$" suffix="k+" />
                        </Heading>
                    </Flex>
                    <Flex direction="column" gap={6}>
                        <Text fontFamily="Geist">Participants</Text>
                        <Heading
                            fontFamily="Geist"
                            fontSize={['5xl', '7xl']}
                            color="white"
                            fontWeight="light"
                        >
                            <CountUp to={2000} />
                        </Heading>
                    </Flex>
                    <Flex direction="column" gap={6}>
                        <Text fontFamily="Geist">Valuation</Text>
                        <Heading
                            fontFamily="Geist"
                            fontSize={['5xl', '7xl']}
                            color="white"
                            fontWeight="light"
                        >
                            <CountUp to={23.4} suffix="B" allowDecimal />
                        </Heading>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
