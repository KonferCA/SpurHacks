import type React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    HStack,
    VStack,
    Button,
    Image,
    useBreakpointValue,
    LinkOverlay,
} from '@chakra-ui/react';
import { VerticalLogo } from '@assets';
import Spline from '@splinetool/react-spline';

interface CountdownItemProps {
    value: string;
    label: string;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ value, label }) => (
    <VStack align="flex-start">
        <Text color="whiteAlpha.700" fontSize="xs" textTransform="uppercase">
            {label}
        </Text>

        <Text color="white" fontWeight="bold" fontSize="4xl" lineHeight="1">
            {value}
        </Text>
    </VStack>
);

export const Hero: React.FC = () => {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [splineError, setSplineError] = useState(false);
    const [countdown, setCountdown] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    const showSocialIcons = useBreakpointValue({ base: false, md: true });
    const showCountdown = useBreakpointValue({ base: false, md: true });

    function onSplineLoad() {
        setIsSplineLoaded(true);
    }

    function onSplineError(error: any) {
        console.error('Spline loading error:', error);
        setSplineError(true);
    }

    const splineSceneUrl =
        'https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode';

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const eventDate = new Date('June 20, 2025 00:00:00').getTime();
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                setCountdown({
                    days: '00',
                    hours: '00',
                    minutes: '00',
                    seconds: '00',
                });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({
                days: days.toString().padStart(2, '0'),
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0'),
            });
        };

        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const removeWatermark = () => {
            const watermarks = document.querySelectorAll(
                'a[href*="spline.design"]'
            );
            watermarks.forEach((watermark) => {
                if (watermark.parentNode) {
                    watermark.parentNode.removeChild(watermark);
                }
            });
        };

        removeWatermark();
        const interval = setInterval(removeWatermark, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box position="relative" h="100vh" overflow="hidden">
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
                    <Spline
                        scene={splineSceneUrl}
                        onLoad={onSplineLoad}
                        onError={onSplineError}
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box>
            )}

            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bgGradient="linear(to-b, rgba(0,0,0,0.5), rgba(0,0,0,0.7))"
                zIndex={0}
            />

            <Flex
                direction="column"
                align="center"
                justify="center"
                h="100%"
                position="relative"
                zIndex={1}
            >
                <Box mb={6} maxW={{ base: '300px', md: '600px' }} px={4}>
                    <Image
                        src={
                            VerticalLogo ||
                            '/src/assets/spurhacks-logo-white.png' ||
                            '/placeholder.svg'
                        }
                        alt="SPURHACKS"
                        width="100%"
                        height="auto"
                    />
                </Box>

                <HStack
                    color="white"
                    mb={6}
                    flexDir={{ base: 'column', sm: 'row' }}
                    textAlign={{ base: 'center', sm: 'left' }}
                >
                    <Text>June 20-22, 2025</Text>
                    <Text display={{ base: 'none', sm: 'block' }}>|</Text>
                    <Text>In-person</Text>
                    <Text display={{ base: 'none', sm: 'block' }}>|</Text>
                    <Text>Waterloo, ON</Text>
                </HStack>

                <Text
                    fontSize={{ base: 'xl', md: '2xl' }}
                    color="white"
                    textAlign="center"
                    mb={10}
                    maxW="container.md"
                >
                    Largest tech x business hackathon in Canada.
                </Text>

                <HStack
                    flexDir={{ base: 'column', sm: 'row' }}
                    w={{ base: '100%', sm: 'auto' }}
                >
                    <Button
                        size={{ base: 'md', md: 'lg' }}
                        bg="#FFA75F"
                        color="black"
                        borderRadius="full"
                        px={{ base: 4, md: 8 }}
                        py={{ base: 5, md: 6 }}
                        w={{ base: '100%', sm: 'auto' }}
                        _hover={{ bg: '#FFA75F', opacity: 0.9 }}
                    >
                        APPLY NOW
                    </Button>
                    <Button
                        size={{ base: 'md', md: 'lg' }}
                        variant="outline"
                        color="white"
                        borderColor="white"
                        borderRadius="full"
                        px={{ base: 4, md: 8 }}
                        py={{ base: 5, md: 6 }}
                        w={{ base: '100%', sm: 'auto' }}
                        _hover={{ bg: 'whiteAlpha.200' }}
                    >
                        BECOME A SPONSOR
                    </Button>
                </HStack>

                {showCountdown && (
                    <HStack position="absolute" bottom="40px" left="40px">
                        <CountdownItem value={countdown.days} label="Days" />
                        <Flex height="100%" alignItems="flex-end" pb={1}>
                            <Text
                                color="white"
                                fontWeight="bold"
                                fontSize="4xl"
                                lineHeight="1"
                            >
                                :
                            </Text>
                        </Flex>
                        <CountdownItem value={countdown.hours} label="Hours" />
                        <Flex height="100%" alignItems="flex-end" pb={1}>
                            <Text
                                color="white"
                                fontWeight="bold"
                                fontSize="4xl"
                                lineHeight="1"
                            >
                                :
                            </Text>
                        </Flex>
                        <CountdownItem
                            value={countdown.minutes}
                            label="Minutes"
                        />
                        <Flex height="100%" alignItems="flex-end" pb={1}>
                            <Text
                                color="white"
                                fontWeight="bold"
                                fontSize="4xl"
                                lineHeight="1"
                            >
                                :
                            </Text>
                        </Flex>
                        <CountdownItem
                            value={countdown.seconds}
                            label="Seconds"
                        />
                    </HStack>
                )}

                {showSocialIcons && (
                    <HStack position="absolute" bottom={8} right={8}>
                        <LinkOverlay
                            as="a"
                            aria-label="Discord"
                            color="white"
                            href="https://discord.gg/spurhacks"
                            _hover={{ color: 'whiteAlpha.800' }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                        </LinkOverlay>

                        <LinkOverlay
                            as="a"
                            aria-label="LinkedIn"
                            color="white"
                            href="https://linkedin.com/company/spurhacks"
                            _hover={{ color: 'whiteAlpha.800' }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </LinkOverlay>

                        <LinkOverlay
                            as="a"
                            aria-label="Instagram"
                            color="white"
                            href="https://instagram.com/spurhacks"
                            _hover={{ color: 'whiteAlpha.800' }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                            </svg>
                        </LinkOverlay>

                        <LinkOverlay
                            as="a"
                            aria-label="Twitter"
                            color="white"
                            href="https://twitter.com/spurhacks"
                            _hover={{ color: 'whiteAlpha.800' }}
                        >
                            <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.5875 1.90393H21.961L14.5909 10.3274L23.2612 21.7899H16.4725L11.1553 14.838L5.07118 21.7899H1.69566L9.57866 12.78L1.26123 1.90393H8.22234L13.0286 8.25826L18.5875 1.90393ZM17.4035 19.7707H19.2728L7.20662 3.81706H5.20069L17.4035 19.7707Z"
                                    fill="#DEEBFF"
                                />
                            </svg>
                        </LinkOverlay>
                    </HStack>
                )}

                {!showCountdown && (
                    <VStack position="absolute" bottom="20px" w="100%" px={4}>
                        <HStack justify="center" w="100%">
                            <VStack>
                                <Text
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="xl"
                                >
                                    {countdown.days}
                                </Text>
                                <Text color="whiteAlpha.700" fontSize="xs">
                                    DAYS
                                </Text>
                            </VStack>
                            <Flex height="100%" alignItems="flex-start" pt={1}>
                                <Text
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="xl"
                                >
                                    :
                                </Text>
                            </Flex>
                            <VStack>
                                <Text
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="xl"
                                >
                                    {countdown.hours}
                                </Text>
                                <Text color="whiteAlpha.700" fontSize="xs">
                                    HRS
                                </Text>
                            </VStack>
                            <Flex height="100%" alignItems="flex-start" pt={1}>
                                <Text
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="xl"
                                >
                                    :
                                </Text>
                            </Flex>
                            <VStack>
                                <Text
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="xl"
                                >
                                    {countdown.minutes}
                                </Text>
                                <Text color="whiteAlpha.700" fontSize="xs">
                                    MIN
                                </Text>
                            </VStack>
                            <Flex height="100%" alignItems="flex-start" pt={1}>
                                <Text
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="xl"
                                >
                                    :
                                </Text>
                            </Flex>
                            <VStack>
                                <Text
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="xl"
                                >
                                    {countdown.seconds}
                                </Text>
                                <Text color="whiteAlpha.700" fontSize="xs">
                                    SEC
                                </Text>
                            </VStack>
                        </HStack>
                    </VStack>
                )}

                {!showSocialIcons && (
                    <HStack
                        position="absolute"
                        bottom={4}
                        justify="center"
                        w="100%"
                    >
                        <LinkOverlay
                            as="a"
                            aria-label="Discord"
                            color="white"
                            href="https://discord.gg/spurhacks"
                            _hover={{ color: 'whiteAlpha.800' }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                        </LinkOverlay>

                        <LinkOverlay
                            as="a"
                            aria-label="LinkedIn"
                            color="white"
                            href="https://linkedin.com/company/spurhacks"
                            _hover={{ color: 'whiteAlpha.800' }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </LinkOverlay>

                        <LinkOverlay
                            as="a"
                            aria-label="Instagram"
                            color="white"
                            href="https://instagram.com/spurhacks"
                            _hover={{ color: 'whiteAlpha.800' }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                            </svg>
                        </LinkOverlay>

                        <LinkOverlay
                            as="a"
                            aria-label="Twitter"
                            color="white"
                            href="https://twitter.com/spurhacks"
                            _hover={{ color: 'whiteAlpha.800' }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.5875 1.90393H21.961L14.5909 10.3274L23.2612 21.7899H16.4725L11.1553 14.838L5.07118 21.7899H1.69566L9.57866 12.78L1.26123 1.90393H8.22234L13.0286 8.25826L18.5875 1.90393ZM17.4035 19.7707H19.2728L7.20662 3.81706H5.20069L17.4035 19.7707Z"
                                    fill="#DEEBFF"
                                />
                            </svg>
                        </LinkOverlay>
                    </HStack>
                )}
            </Flex>

            {(!isSplineLoaded || splineError) && (
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
    );
};
