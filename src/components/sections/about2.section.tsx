import type React from 'react';
import { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Heading,
    Image,
    Link,
    Button,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import Spline from '@splinetool/react-spline';
import { useInView } from 'react-intersection-observer';

import { about2Strings } from '@locales';
import { links } from '@data';

const splineSceneUrl = links.spline;
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
                    alt={about2Strings.images.knot1.alt}
                    position="absolute"
                    top={{ base: '-40%', md: '-60%' }}
                    left="-15%"
                    zIndex={-1}
                    boxSize="200px"
                    animation={`${spin} infinite 15s linear`}
                />
                <Image
                    src="/src/assets/animations/knot_8.svg"
                    alt={about2Strings.images.knot8.alt}
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
                    {about2Strings.heading}
                </Heading>
                <Text
                    fontFamily="Geist"
                    fontSize="lg"
                    color="inherit"
                    mb={10}
                    textAlign="left"
                >
                    {about2Strings.description}
                </Text>

                <Link href={links.spur} target="_blank">
                    <Button
                        size={{ base: 'sm', md: 'md' }}
                        bg="#FFA75F"
                        color="black"
                        borderRadius="full"
                        px={5}
                        py={5}
                        mt={-6}
                        _hover={{ bg: '#FFA75F', opacity: 0.9 }}
                        rel="noopener noreferrer"
                    >
                        {about2Strings.buttons.companySite}
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
};
