import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import Spline from '@splinetool/react-spline';
import { CountUp } from '@components';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const Statistics = () => {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [splineError, setSplineError] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
        rootMargin: '200px 0px 200px 0px',
    });

    const splineSceneUrl =
        'https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode';

    function onSplineLoad() {
        setIsSplineLoaded(true);
    }

    function onSplineError(error: unknown) {
        console.error('Spline loading error:', error);
        setSplineError(true);
    }

    return (
        <Flex ref={ref} className="relative bg-black min-h-screen">
            <Box 
                w="50%" 
                h="full" 
                maxH="100%" 
                position="relative"
            >
                {inView && !splineError && (
                    <Spline
                        scene={splineSceneUrl}
                        onLoad={onSplineLoad}
                        onError={onSplineError}
                        style={{ 
                            width: '100%',
                            height: '100vh',
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            zIndex: 0 
                        }}
                    />
                )}
                {(!inView || !isSplineLoaded || splineError) && (
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%" 
                        height="100%"
                        bg="black"
                        zIndex={-1}
                    />
                )}
            </Box>
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
