import { useState, useEffect } from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { GradientIcon } from '@assets';

export const LoadingScreen = ({ minLoadTime = 2500 }) => {
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);
    const [knotsLoaded, setKnotsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [splineError] = useState(false);
    const [aboutAssetsLoaded, setAboutAssetsLoaded] = useState(false);

    useEffect(() => {
        const handleAboutAssetsLoaded = () => {
            setAboutAssetsLoaded(true);
        };

        window.addEventListener('aboutAssetsLoaded', handleAboutAssetsLoaded);

        const fallbackTimer = setTimeout(() => {
            setAboutAssetsLoaded(true);
        }, 8000); // 8 secs

        return () => {
            window.removeEventListener(
                'aboutAssetsLoaded',
                handleAboutAssetsLoaded
            );
            clearTimeout(fallbackTimer);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplineLoaded(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const knotSvgs = Array(8).fill('');
        let loadedCount = 0;

        const simulateKnotLoading = () => {
            const interval = setInterval(() => {
                loadedCount++;
                setLoadingProgress((prev) => Math.min(prev + 12, 95)); // up to 95%

                if (loadedCount === knotSvgs.length) {
                    setKnotsLoaded(true);
                    clearInterval(interval);
                }
            }, 300);

            return () => clearInterval(interval);
        };

        const loadingSimulation = simulateKnotLoading();

        const fallbackTimer = setTimeout(() => {
            setKnotsLoaded(true);
            setLoadingProgress(95);
        }, 3000);

        return () => {
            clearTimeout(fallbackTimer);
            if (loadingSimulation) loadingSimulation();
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
            setLoadingProgress(100);
        }, minLoadTime);

        return () => clearTimeout(timer);
    }, [minLoadTime]);

    useEffect(() => {
        if (
            (isSplineLoaded || splineError) &&
            knotsLoaded &&
            minTimeElapsed &&
            aboutAssetsLoaded
        ) {
            const hideTimer = setTimeout(() => {
                setLoading(false);
            }, 300);

            return () => clearTimeout(hideTimer);
        }
    }, [
        isSplineLoaded,
        splineError,
        knotsLoaded,
        minTimeElapsed,
        aboutAssetsLoaded,
    ]);

    const pulse = keyframes`
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
    `;

    const rotate = keyframes`
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    `;

    if (!loading) {
        return null;
    }

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100vh"
            bg="black"
            zIndex="9999"
            display="flex"
            justifyContent="center"
            alignItems="center"
            opacity={loading ? 1 : 0}
            transition="opacity 0.6s ease-out"
        >
            <Flex
                direction="column"
                align="center"
                justify="center"
                maxWidth="300px"
                textAlign="center"
            >
                <Box
                    animation={`${pulse} 2s infinite ease-in-out`}
                    position="relative"
                    mb={6}
                >
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        width="100px"
                        height="100px"
                        borderRadius="full"
                        bg="rgba(255, 255, 255, 0.05)"
                        filter="blur(20px)"
                    />
                    <Box animation={`${rotate} 8s linear infinite`}>
                        <Image
                            src={GradientIcon}
                            alt=""
                            role="presentation"
                            aria-hidden="true"
                            width="100px"
                            height="100px"
                        />
                    </Box>
                </Box>

                <Text
                    color="white"
                    fontSize="xl"
                    fontWeight="500"
                    mb={4}
                    letterSpacing="wider"
                >
                    Loading Experience
                </Text>

                <Box
                    width="200px"
                    height="2px"
                    bg="rgba(255, 255, 255, 0.1)"
                    borderRadius="full"
                    overflow="hidden"
                    position="relative"
                >
                    <Box
                        height="100%"
                        width={`${loadingProgress}%`}
                        bg="linear-gradient(90deg, #FFA75F, #FF8C66, #FF7E79)"
                        transition="width 0.4s ease-out"
                        borderRadius="full"
                    />
                </Box>

                <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm" mt={3}>
                    {loadingProgress < 50
                        ? 'Initializing...'
                        : loadingProgress < 90
                          ? 'Preparing...'
                          : 'Almost ready...'}
                </Text>
            </Flex>
        </Box>
    );
};
