import { Box, Flex, Text, Button, Heading, Link } from '@chakra-ui/react';
import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const UpdatesSection = () => {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [splineError, setSplineError] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '500px 0px 500px 0px',
    });

    function onSplineLoad() {
        setIsSplineLoaded(true);
    }

    // biome-ignore lint: unsure of error type
    function onSplineError(error: any) {
        console.error('Spline loading error:', error);
        setSplineError(true);
    }

    const splineSceneUrl =
        'https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode';

    return (
        <Flex ref={ref} className="relative bg-black min-h-screen">
            <Box w="50%" h="full" maxH="100%">
                {inView && (
                    <Spline
                        scene={splineSceneUrl}
                        onLoad={onSplineLoad}
                        onError={onSplineError}
                        className="w-1/2 max-h-screen absolute top-0 left-0 z-0"
                    />
                )}

                {(!isSplineLoaded || splineError || !inView) && (
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="50%"
                        height="100%"
                        bg="black"
                        zIndex="-1"
                    />
                )}
            </Box>

            <Flex
                direction="column"
                gap={8}
                w="70%"
                justify="center"
                align="flex-end"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:bg-gradient-to-l from-black from-70% to-black/0 focus:outline-none z-10"
            >
                <Flex
                    direction="column"
                    maxW="480px"
                    gap={6}
                    fontWeight="extralight"
                    mr={{ base: 0, md: 12 }}
                    className="text-white"
                >
                    <Heading fontSize={['xl', '2xl', '3xl', '4xl']}>
                        Stay in the know
                    </Heading>

                    <Text
                        color="white"
                        fontFamily="Geist"
                        fontSize={{ base: 'sm', md: 'md' }}
                        mb={8}
                    >
                        Get the latest updates from our Discord server accusamus
                        et iusto odio dignissimos ducimus qui blanditiis
                        praesentium voluptatum deleniti.
                    </Text>

                    <Link href="https://discord.gg/spurhacks" target="_blank">
                        <Button
                            size={{ base: 'sm', md: 'md' }}
                            bg="#FFA75F"
                            color="black"
                            borderRadius="full"
                            px={6}
                            py={4}
                            mt={-8}
                            width={{ base: '100%', md: 'auto' }}
                            _hover={{ bg: '#FFA75F', opacity: 0.9 }}
                            rel="noopener noreferrer"
                        >
                            TAKE ME THERE
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
};
