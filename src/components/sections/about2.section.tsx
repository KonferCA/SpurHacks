import type React from 'react';
import { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Heading,
    useBreakpointValue,
    Image,
} from '@chakra-ui/react';
import Spline from '@splinetool/react-spline';
import { useInView } from 'react-intersection-observer';

const splineSceneUrl =
    'https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode';

export const About2: React.FC = () => {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [splineError, setSplineError] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const containerHeight = useBreakpointValue({ base: 'auto', md: '100vh' });

    function onSplineLoad() {
        setIsSplineLoaded(true);
    }
    function onSplineError(error: unknown) {
        console.error('spline loading error:', error);
        setSplineError(true);
    }

    return (
        <Flex
            ref={ref}
            direction="column"
            justify="center"
            align="center"
            position="relative"
            minH={containerHeight}
            overflow="hidden"
            bg="black"
        >
            <Box
                position="absolute"
                top="0"
                left="50%"
                width="50%"
                height="100%"
                zIndex={0}
                style={{
                    maskImage:
                        'linear-gradient(to left, black 60%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.02) 100%)',
                    WebkitMaskImage:
                        'linear-gradient(to left, black 60%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.02) 100%)',
                }}
            >
                {!splineError && (
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        opacity={isSplineLoaded ? 1 : 0}
                        transition="opacity 0.5s ease-in"
                    >
                        {inView && (
                            <Spline
                                scene={splineSceneUrl}
                                onLoad={onSplineLoad}
                                onError={onSplineError}
                                style={{ width: '100%', height: '100%' }}
                            />
                        )}
                    </Box>
                )}
                {(!inView || !isSplineLoaded || splineError) && (
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        bg="black"
                    />
                )}
            </Box>

            <Box
                width={{ base: '90vw', md: '30vw' }}
                minWidth="300px"
                maxW="container.md"
                p={{ base: 4, md: 8 }}
                position="relative"
                zIndex={1}
                color="white"
                textAlign="left"
            >
                <Image
                    src="/src/assets/animations/knot_1.svg"
                    alt="Knot decorative element 1"
                    position="absolute"
                    top="-90%"
                    left="-85%"
                    zIndex={-1}
                    boxSize="490px"
                />
                <Image
                    src="/src/assets/animations/knot_8.svg"
                    alt="Knot decorative element 4"
                    position="absolute"
                    bottom="-120%"
                    right="60%"
                    zIndex={-1}
                    boxSize="290px"
                />

                <Heading
                    as="h2"
                    fontFamily="Geist"
                    fontSize={['6xl', '7xl']}
                    fontWeight="semibold"
                    color="inherit"
                    mb={16}
                    textAlign="left"
                >
                    Quantum. Web3. AI.
                </Heading>
                <Text
                    fontFamily="Geist"
                    fontSize="xl"
                    color="inherit"
                    mb={4}
                    textAlign="left"
                >
                    Placerat maecenas aliquam primis duis viverra integer.
                    Vehicula nulla bibendum facilisis per quis vehicula risus
                    donec euismod. Curabitur aliquet sem vel fermentum lacinia.
                    Aliquam sodales neque lorem, aliquam luctus tellus viverra
                    ut. Curabitur aliquet sem vel fermentum lacinia. Aliquam
                    sodales neque lorem, aliquam luctus tellus viverra ut.
                </Text>
            </Box>
        </Flex>
    );
};
