import type React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    HStack,
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
        <Text color="white" fontWeight="bold" fontSize="4xl" lineHeight="1">
            {value}
        </Text>
        <Text color="whiteAlpha.700" fontSize="xs" textTransform="uppercase">
            {label}
        </Text>
    </Box>
);

const Separator = () => (
    <Text color="white" fontWeight="bold" fontSize="4xl" lineHeight="1" mb={5}>
        :
    </Text>
);

const MobileCountdown = ({ countdown }: { countdown: CountdownType }) => (
    <Flex justify="center" w="100%" mt={4} mb={6} align="center">
        <Box textAlign="center" px={2}>
            <Text color="white" fontWeight="bold" fontSize="xl" lineHeight="1">
                {countdown.days}
            </Text>
            <Text
                color="whiteAlpha.700"
                fontSize="xs"
                textTransform="uppercase"
            >
                {heroCountdown.days}
            </Text>
        </Box>

        <Text
            color="white"
            fontWeight="bold"
            fontSize="xl"
            lineHeight="1"
            mb={4}
        >
            :
        </Text>

        <Box textAlign="center" px={2}>
            <Text color="white" fontWeight="bold" fontSize="xl" lineHeight="1">
                {countdown.hours}
            </Text>
            <Text
                color="whiteAlpha.700"
                fontSize="xs"
                textTransform="uppercase"
            >
                {heroCountdown.hoursShort}
            </Text>
        </Box>

        <Text
            color="white"
            fontWeight="bold"
            fontSize="xl"
            lineHeight="1"
            mb={4}
        >
            :
        </Text>

        <Box textAlign="center" px={2}>
            <Text color="white" fontWeight="bold" fontSize="xl" lineHeight="1">
                {countdown.minutes}
            </Text>
            <Text
                color="whiteAlpha.700"
                fontSize="xs"
                textTransform="uppercase"
            >
                {heroCountdown.minutesShort}
            </Text>
        </Box>

        <Text
            color="white"
            fontWeight="bold"
            fontSize="xl"
            lineHeight="1"
            mb={4}
        >
            :
        </Text>

        <Box textAlign="center" px={2}>
            <Text color="white" fontWeight="bold" fontSize="xl" lineHeight="1">
                {countdown.seconds}
            </Text>
            <Text
                color="whiteAlpha.700"
                fontSize="xs"
                textTransform="uppercase"
            >
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
    const isMobile = useBreakpointValue({ base: true, sm: false });

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
        <Box position="relative" h="100vh" overflow="hidden">
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

            <Flex
                direction="column"
                align="center"
                justify={{ base: 'space-between', sm: 'center' }}
                h="100%"
                position="relative"
                zIndex={1}
                pb={{ base: 8, sm: 0 }}
            >
                {isMobile ? (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        flex="1"
                        w="100%"
                    >
                        <Box mb={6} maxW="300px" px={4}>
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

                        <HStack
                            color="white"
                            mb={6}
                            pt={-2}
                            pb={2}
                            px={2}
                            flexWrap="wrap"
                            justify="center"
                        >
                            <Text>{heroEventDetails.date}</Text>
                            <Text>|</Text>
                            <Text>{heroEventDetails.format}</Text>
                            <Text>|</Text>
                            <Text>{heroEventDetails.location}</Text>
                        </HStack>

                        <Text
                            fontSize="md"
                            flexWrap="wrap"
                            color="white"
                            textAlign="center"
                            px="10"
                            mb={4}
                            maxW="container.md"
                            fontWeight="semibold"
                        >
                            {heroStrings.tagline}
                        </Text>
                    </Flex>
                ) : (
                    <>
                        <Box mb={6} maxW="600px" px={4}>
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

                        <HStack
                            color="white"
                            mb={6}
                            pt={4}
                            pb={4}
                            px={4}
                            flexWrap="wrap"
                            justify="flex-start"
                        >
                            <Text>{heroEventDetails.date}</Text>
                            <Text>|</Text>
                            <Text>{heroEventDetails.format}</Text>
                            <Text>|</Text>
                            <Text>{heroEventDetails.location}</Text>
                        </HStack>

                        <Text
                            fontSize="2xl"
                            flexWrap="wrap"
                            color="white"
                            textAlign="center"
                            px="10"
                            mb={10}
                            maxW="container.md"
                            fontWeight="semibold"
                        >
                            {heroStrings.tagline}
                        </Text>

                        <HStack flexDir="row" w="auto" mb={4}>
                            <Button
                                asChild
                                size="lg"
                                bg="#FFA75F"
                                color="black"
                                borderRadius="full"
                                px={8}
                                py={6}
                                _hover={{ bg: '#FFA75F', opacity: 0.9 }}
                            >
                                <a
                                    href={links.hackathon.dashboard}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {heroButtons.apply}
                                </a>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                color="white"
                                borderColor="white"
                                borderRadius="full"
                                px={8}
                                py={6}
                                _hover={{ bg: 'whiteAlpha.200' }}
                            >
                                <a
                                    href={links.hackathon.sponsorship}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {heroButtons.sponsor}
                                </a>
                            </Button>
                        </HStack>
                    </>
                )}

                {isMobile && (
                    <Flex direction="column" w="100%" align="center" mt="auto">
                        <MobileCountdown countdown={countdown} />
                        <HStack flexDir="column" w="100%" px={6} maxW="100%">
                            <Button
                                size="md"
                                bg="#FFA75F"
                                color="black"
                                borderRadius="full"
                                px={4}
                                py={5}
                                w="100%"
                                _hover={{ bg: '#FFA75F', opacity: 0.9 }}
                            >
                                {heroButtons.apply}
                            </Button>
                            <Button
                                size="md"
                                variant="outline"
                                color="white"
                                borderColor="white"
                                borderRadius="full"
                                px={4}
                                py={5}
                                w="100%"
                                _hover={{ bg: 'whiteAlpha.200' }}
                            >
                                {heroButtons.sponsor}
                            </Button>
                        </HStack>
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
            </Flex>
        </Box>
    );
};
