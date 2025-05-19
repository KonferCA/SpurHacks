import type React from 'react';
import {
    Box,
    Flex,
    Text,
    Heading,
    Link,
    Button,
    Image,
    Container,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import { about2Strings } from '@locales';
import { links } from '@data';
import type { NavbarMeta } from '@components';
import { SplineTarget } from '@components';
import { Knot1, Knot8 } from '@assets';

export const NavbarInfo: NavbarMeta = {
    id: 'spur',
    navbarTitle: 'About SPUR',
    priority: 2,
};

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

export const Spur: React.FC = () => {
    const { ref } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section
            id={NavbarInfo.id}
            className="bg-black min-h-screen overflow-hidden"
            style={{
                width: '100%',
                position: 'relative',
            }}
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
                <SplineTarget
                    id="spur-spline"
                    minHeight="100%"
                    height="100%"
                    width="100%"
                    position="absolute"
                    top={0}
                    left={0}
                    bg="black"
                />
            </Box>

            <Container
                ref={ref}
                maxW="container.xl"
                h="100%"
                centerContent
                position="relative"
                zIndex={2}
            >
                <Flex
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    h="100%"
                    minH="100vh"
                    py={{ base: 16, md: 0 }}
                    px={{ base: 6, md: 0 }}
                    maxW={{ base: '90%', md: '600px' }}
                >
                    <Box
                        position="relative"
                        zIndex={1}
                        color="white"
                        textAlign="left"
                    >
                        <Box
                            position="absolute"
                            top="-180px"
                            left="-180px"
                            width="200px"
                            height="200px"
                            zIndex={-1}
                            transform="none"
                            transformOrigin="center center"
                        >
                            <Image
                                src={Knot1}
                                alt={about2Strings.images.knot1.alt}
                                boxSize="200px"
                                animation={`${spin} infinite 15s linear`}
                                transformOrigin="center center"
                            />
                        </Box>

                        <Box
                            position="absolute"
                            bottom="-180px"
                            right="-150px"
                            width="300px"
                            height="300px"
                            zIndex={-1}
                            transform="none"
                            transformOrigin="center center"
                        >
                            <Image
                                src={Knot8}
                                alt={about2Strings.images.knot8.alt}
                                boxSize="300px"
                                animation={`${spin} infinite 18s linear reverse`}
                                transformOrigin="center center"
                            />
                        </Box>

                        <Heading
                            as="h2"
                            fontSize={['2xl', '5xl']}
                            fontWeight="bold"
                            color="inherit"
                            mb={14}
                            lineHeight="1.2"
                            textAlign="left"
                        >
                            {about2Strings.heading}
                        </Heading>

                        <Text
                            color="offWhite"
                            fontSize={{ base: 'md', md: 'lg' }}
                            mb={4}
                            opacity={0.9}
                            textAlign="left"
                        >
                            {about2Strings.description}
                        </Text>

                        <Link
                            href={links.spur}
                            target="_blank"
                            textDecoration="none"
                            _hover={{ textDecoration: 'none' }}
                        >
                            <Button
                                size={{ base: 'sm', md: 'md' }}
                                bg="orange.default"
                                color="black"
                                borderRadius="full"
                                px={5}
                                py={5}
                                mt={4}
                                boxShadow="orangeGlow"
                                transition="all 0.3s ease"
                                _hover={{
                                    bg: 'orange.hover',
                                    transform: 'translateY(-2px)',
                                    boxShadow:
                                        '0 6px 12px rgba(255, 167, 95, 0.5)',
                                }}
                                rel="noopener noreferrer"
                            >
                                {about2Strings.buttons.companySite}
                            </Button>
                        </Link>
                    </Box>
                </Flex>
            </Container>
        </section>
    );
};
