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
} from '@chakra-ui/react';
import { NoIconLogo } from '@assets';
import { SplineTarget, SocialMediaBar } from '@components';
import {
    heroStrings,
    heroEventDetails,
    heroButtons,
    heroCountdown,
} from '@locales';
import { links } from '@data';

interface CountdownType {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

const CountdownDisplay = ({
    value,
    label,
}: { value: string; label: string }) => (
    <Box textAlign="center" px={2}>
        <Text color="offWhite" fontWeight="bold" fontSize="4xl" lineHeight="1">
            {value}
        </Text>
        <Text color="offWhite" fontSize="xs" textTransform="uppercase">
            {label}
        </Text>
    </Box>
);

const Separator = () => (
    <Text
        color="offWhite"
        fontWeight="bold"
        fontSize="4xl"
        lineHeight="1"
        mb={5}
    >
        :
    </Text>
);

const MobileCountdown = ({ countdown }: { countdown: CountdownType }) => (
    <Flex justify="center" w="100%" mt={4} mb={6} align="center">
        <Box textAlign="center" px={2}>
            <Text
                color="offWhite"
                fontWeight="bold"
                fontSize="xl"
                lineHeight="1"
            >
                {countdown.days}
            </Text>
            <Text color="offWhite" fontSize="xs" textTransform="uppercase">
                {heroCountdown.days}
            </Text>
        </Box>

        <Text
            color="offWhite"
            fontWeight="bold"
            fontSize="xl"
            lineHeight="1"
            mb={4}
        >
            :
        </Text>

        <Box textAlign="center" px={2}>
            <Text
                color="offWhite"
                fontWeight="bold"
                fontSize="xl"
                lineHeight="1"
            >
                {countdown.hours}
            </Text>
            <Text color="offWhite" fontSize="xs" textTransform="uppercase">
                {heroCountdown.hoursShort}
            </Text>
        </Box>

        <Text
            color="offWhite"
            fontWeight="bold"
            fontSize="xl"
            lineHeight="1"
            mb={4}
        >
            :
        </Text>

        <Box textAlign="center" px={2}>
            <Text
                color="offWhite"
                fontWeight="bold"
                fontSize="xl"
                lineHeight="1"
            >
                {countdown.minutes}
            </Text>
            <Text color="offWhite" fontSize="xs" textTransform="uppercase">
                {heroCountdown.minutesShort}
            </Text>
        </Box>

        <Text
            color="offWhite"
            fontWeight="bold"
            fontSize="xl"
            lineHeight="1"
            mb={4}
        >
            :
        </Text>

        <Box textAlign="center" px={2}>
            <Text
                color="offWhite"
                fontWeight="bold"
                fontSize="xl"
                lineHeight="1"
            >
                {countdown.seconds}
            </Text>
            <Text color="offWhite" fontSize="xs" textTransform="uppercase">
                {heroCountdown.secondsShort}
            </Text>
        </Box>
    </Flex>
);

export const Hero: React.FC = () => {
    const [countdown, setCountdown] = useState<CountdownType>({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    const showSocialIcons = useBreakpointValue({ base: false, md: true });
    const showDesktopCountdown = useBreakpointValue({ base: false, md: true });
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const eventDate = new Date(heroStrings.eventDate).getTime();
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

            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
                .toString()
                .padStart(2, '0');
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
                .toString()
                .padStart(2, '0');
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            )
                .toString()
                .padStart(2, '0');
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
                .toString()
                .padStart(2, '0');

            setCountdown({ days, hours, minutes, seconds });
        };

        calculateTimeRemaining();

        const interval = setInterval(calculateTimeRemaining, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
 
    return (
        <Box position="relative" h="100vh" overflow="hidden" pl={5}>
            <SplineTarget
                id="hero"
                zIndex={-1}
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bg="black"
            />

            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bgGradient="linear(to-b, rgba(0,0,0,0.5), rgba(0,0,0,0.7))"
                zIndex={0}
            />

            {isMobile ? (
                <Flex
                    direction="column"
                    align="center"
                    justify="space-between"
                    h="100%"
                    position="relative"
                    zIndex={1}
                    px={6}
                    pt={24}
                    pb={8}
                >
                    <VStack flex="1" justify="center" w="100%">
                        <Box maxW="350px" w="100%">
                            <Image
                                src={
                                    NoIconLogo ||
                                    '/src/assets/logos/logo_noicon.svg'
                                }
                                alt={heroStrings.alt}
                                width="100%"
                                height="auto"
                            />
                        </Box>

                        <VStack textAlign="center">
                            <Text
                                color="offWhite"
                                fontSize="sm"
                                fontWeight="medium"
                                letterSpacing="wide"
                            >
                                {heroEventDetails.date}
                            </Text>
                            <Text color="offWhite" fontSize="sm" opacity={0.8}>
                                {heroEventDetails.format} •{' '}
                                {heroEventDetails.location}
                            </Text>
                        </VStack>

                        <Text
                            fontSize="lg"
                            color="offWhite"
                            textAlign="center"
                            fontWeight="medium"
                            lineHeight="1.4"
                            maxW="300px"
                        >
                            {heroStrings.tagline}
                        </Text>

                        <VStack pt={20}>
                            <Text
                                color="offWhite"
                                fontSize="md"
                                fontWeight="semibold"
                            >
                                ACCELERATOR PROGRAM
                            </Text>
                            <Text
                                color="offWhite"
                                fontSize="xs"
                                opacity={0.8}
                                textAlign="center"
                            >
                                {heroEventDetails.accelerator.date} •{' '}
                                {heroEventDetails.accelerator.funding}
                            </Text>
                        </VStack>
                    </VStack>

                    <VStack w="100%">
                        <MobileCountdown countdown={countdown} />

                        <VStack w="100%">
                            <Button
                                size="md"
                                bg="orange.default"
                                color="black"
                                borderRadius="full"
                                px={8}
                                py={6}
                                w="100%"
                                maxW="280px"
                                fontWeight="bold"
                                letterSpacing="wide"
                                boxShadow="orangeGlow"
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: 'orange.hover',
                                    transform: 'translateY(-1px)',
                                }}
                            >
                                <a
                                    href={links.hackathon.dashboard}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full"
                                >
                                    {heroButtons.apply}
                                </a>
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                color="offWhite"
                                borderColor="white"
                                borderRadius="full"
                                px={6}
                                py={4}
                                w="100%"
                                maxW="280px"
                                fontWeight="medium"
                                letterSpacing="wide"
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: 'whiteAlpha.100',
                                }}
                            >
                                <a
                                    href={links.accelerator}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full"
                                >
                                    {heroButtons.accelerator}
                                </a>
                            </Button>
                        </VStack>
                    </VStack>
                </Flex>
            ) : (
                <Flex position="relative" zIndex={1} h="100%" pt={20}>
                    <Box w="70%" h="100%" px={12} py={8}>
                        <Flex direction="column" h="100%" justify="center">
                            <Box maxW="700px" mb={8}>
                                <Image
                                    src={
                                        NoIconLogo ||
                                        '/src/assets/logos/logo_noicon.svg'
                                    }
                                    alt={heroStrings.alt}
                                    width="100%"
                                    height="auto"
                                />
                            </Box>

                            <HStack mb={8}>
                                <Text
                                    color="offWhite"
                                    fontSize="lg"
                                    fontWeight="bold"
                                    letterSpacing="wider"
                                >
                                    {heroEventDetails.date}
                                </Text>
                                <Text
                                    color="offWhite"
                                    fontSize="lg"
                                    opacity={0.6}
                                >
                                    •
                                </Text>
                                <Text
                                    color="offWhite"
                                    fontSize="md"
                                    opacity={0.8}
                                >
                                    {heroEventDetails.format}
                                </Text>
                                <Text
                                    color="offWhite"
                                    fontSize="lg"
                                    opacity={0.6}
                                >
                                    •
                                </Text>
                                <Text
                                    color="offWhite"
                                    fontSize="md"
                                    opacity={0.8}
                                >
                                    {heroEventDetails.location}
                                </Text>
                            </HStack>

                            <Text
                                fontSize="4xl"
                                color="offWhite"
                                fontWeight="medium"
                                lineHeight="1.2"
                                letterSpacing="tight"
                                maxW="600px"
                                mb={10}
                            >
                                {heroStrings.tagline}
                            </Text>

                            <Box>
                                <Button
                                    asChild
                                    size="lg"
                                    bg="orange.default"
                                    color="black"
                                    borderRadius="full"
                                    px={12}
                                    py={8}
                                    fontSize="md"
                                    fontWeight="bold"
                                    letterSpacing="wide"
                                    boxShadow="orangeGlow"
                                    transition="all 0.2s ease"
                                    _hover={{
                                        bg: 'orange.hover',
                                        transform: 'translateY(-2px)',
                                    }}
                                >
                                    <a
                                        href={links.hackathon.dashboard}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {heroButtons.apply}
                                    </a>
                                </Button>
                            </Box>
                        </Flex>
                    </Box>

                    <Box
                        w="30%"
                        h="100%"
                        borderLeft="1px solid"
                        borderColor="whiteAlpha.200"
                        px={8}
                        py={8}
                    >
                        <Flex direction="column" h="100%" justify="center">
                            <VStack align="start">
                                <Text
                                    color="offWhite"
                                    fontSize="2xl"
                                    fontWeight="semibold"
                                    letterSpacing="widest"
                                >
                                    ACCELERATOR
                                </Text>

                                <Text
                                    color="offWhite"
                                    fontSize="xl"
                                    fontWeight="medium"
                                    letterSpacing="wide"
                                >
                                    PROGRAM
                                </Text>

                                <VStack align="start">
                                    <Text
                                        color="offWhite"
                                        fontSize="md"
                                        opacity={0.9}
                                    >
                                        {heroEventDetails.accelerator.date}
                                    </Text>
                                    <Text
                                        color="offWhite"
                                        fontSize="sm"
                                        opacity={0.8}
                                    >
                                        {heroEventDetails.accelerator.format}
                                    </Text>
                                    <Text
                                        color="offWhite"
                                        fontSize="sm"
                                        opacity={0.8}
                                    >
                                        {heroEventDetails.accelerator.location}
                                    </Text>
                                    <Text
                                        color="offWhite"
                                        fontSize="md"
                                        fontWeight="semibold"
                                        mt={2}
                                    >
                                        {heroEventDetails.accelerator.funding}
                                    </Text>
                                </VStack>

                                <Text
                                    fontSize="sm"
                                    color="offWhite"
                                    opacity={0.8}
                                    lineHeight="1.5"
                                    pb={4}
                                    maxW="250px"
                                >
                                    {heroStrings.acceleratorTagline}
                                </Text>

                                <Button
                                    asChild
                                    size="md"
                                    variant="outline"
                                    color="offWhite"
                                    borderColor="white"
                                    borderRadius="none"
                                    px={8}
                                    py={6}
                                    fontSize="sm"
                                    fontWeight="medium"
                                    letterSpacing="wide"
                                    transition="all 0.2s ease"
                                    _hover={{
                                        bg: 'whiteAlpha.100',
                                    }}
                                >
                                    <a
                                        href={links.accelerator}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {heroButtons.accelerator}
                                    </a>
                                </Button>
                            </VStack>
                        </Flex>
                    </Box>
                </Flex>
            )}

            {showDesktopCountdown && (
                <HStack position="absolute" bottom="40px" left="40px">
                    <CountdownDisplay value={countdown.days} label="DAYS" />
                    <Separator />
                    <CountdownDisplay
                        value={countdown.hours}
                        label={heroCountdown.hours}
                    />
                    <Separator />
                    <CountdownDisplay
                        value={countdown.minutes}
                        label={heroCountdown.minutes}
                    />
                    <Separator />
                    <CountdownDisplay
                        value={countdown.seconds}
                        label={heroCountdown.seconds}
                    />
                </HStack>
            )}

            {showSocialIcons && (
                <Box position="absolute" bottom={8} right={8}>
                    <SocialMediaBar spacing={4} />
                </Box>
            )}
        </Box>
    );
};
