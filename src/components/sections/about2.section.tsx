import type React from 'react';
import { useState } from 'react';
import { Box, Flex, Text, Heading, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import Spline from '@splinetool/react-spline';
import { useInView } from 'react-intersection-observer';

const splineSceneUrl =
    'https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const About2: React.FC = () => {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [splineError, setSplineError] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

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
            minH="100vh"
            overflow="hidden"
            bg="black"
        >
            <Box
                position="absolute"
                top="0"
                left={{ base: '0', md: '50%' }}
                width={{ base: '100%', md: '50%' }}
                height="100%"
                zIndex={0}
                maskImage={{
                    base: 'none',
                    md: 'linear-gradient(to left, black 60%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.02) 100%)',
                }}
                WebkitMaskImage={{
                    base: 'none',
                    md: 'linear-gradient(to left, black 60%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.02) 100%)',
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
                width={{ base: '10vw', sm: '70vw', md: '60vw', lg: '50vw' }}
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
                    top={{ base: '-40%', md: '-60%' }}
                    left="-15%"
                    zIndex={-1}
                    boxSize="200px"
                    animation={`${spin} infinite 15s linear`}
                />
                <Image
                    src="/src/assets/animations/knot_8.svg"
                    alt="Knot decorative element 4"
                    position="absolute"
                    bottom="-60%"
                    right="-10%"
                    zIndex={-1}
                    boxSize="300px"
                    animation={`${spin} infinite 18s linear reverse`}
                />

                <Heading
                    as="h2"
                    fontFamily="Geist"
                    fontSize={['2xl', '5xl']}
                    fontWeight="semibold"
                    color="inherit"
                    mb={{ base: 8, sm: 16, md: 20 }}
                    lineHeight="1.2"
                    textAlign="left"
                >
                    Quantum. Web3. AI.
                </Heading>
                <Text
                    fontFamily="Geist"
                    fontSize="lg"
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
