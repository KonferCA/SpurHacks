import {
    Flex,
    Text,
    Button,
    Heading,
    Link,
    Box,
    useBreakpointValue,
    Container,
} from '@chakra-ui/react';
import { SplineTarget } from '@components';
import { updatesStrings } from '@locales';
import { links } from '@data';
import type { NavbarMeta } from '@components';

export const NavbarInfo: NavbarMeta = {
    id: 'updates',
    navbarTitle: 'Stay Updated',
    priority: 5,
};

export const UpdatesSection = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <section
            id={NavbarInfo.id}
            className="bg-black min-h-screen overflow-hidden"
            style={{
                width: '100%',
                position: 'relative',
            }}
        >
            <SplineTarget
                width={isMobile ? '100%' : '60%'}
                height="full"
                maxH="100%"
                position="absolute"
                top={0}
                left={0}
                zIndex={0}
                bg="transparent"
                maskImage={
                    !isMobile
                        ? 'linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))'
                        : undefined
                }
                WebkitMaskImage={
                    !isMobile
                        ? 'linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))'
                        : undefined
                }
            />

            {!isMobile && (
                <Box
                    position="absolute"
                    top={0}
                    left="30%"
                    width="40%"
                    height="full"
                    zIndex={1}
                    bg="linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))"
                />
            )}

            <Container
                maxW="container.xl"
                h="100%"
                position="relative"
                zIndex={2}
                px={0}
            >
                <Flex
                    direction="column"
                    gap={8}
                    w={isMobile ? '100%' : '40%'}
                    justify="center"
                    align={isMobile ? 'center' : 'flex-end'}
                    mx={isMobile ? 'auto' : '0'}
                    ml={isMobile ? 'auto' : '55%'}
                    mr={isMobile ? 'auto' : '0'}
                    px={{ base: 6, md: 0 }}
                    py={{ base: 16, md: 0 }}
                    minH="100vh"
                    className="focus:outline-none z-20"
                >
                    <Flex
                        direction="column"
                        maxW={isMobile ? '100%' : '480px'}
                        gap={6}
                        fontWeight="extralight"
                        textAlign={isMobile ? 'center' : 'left'}
                        mr={{ base: 0, md: 4 }}
                        className="text-white"
                    >
                        <Heading
                            fontSize={['2xl', '5xl']}
                            color="offWhite"
                            fontWeight="bold"
                            lineHeight="1.1"
                            mb={12}
                            textAlign={isMobile ? 'center' : 'left'}
                        >
                            {updatesStrings.title}
                        </Heading>

                        <Text
                            color="offWhite"
                            fontSize={{ base: 'md', md: 'lg' }}
                            mb={12}
                            opacity={0.9}
                            textAlign={isMobile ? 'center' : 'left'}
                        >
                            {updatesStrings.description}
                        </Text>

                        <Link
                            href={links.socials.linktree}
                            target="_blank"
                            alignSelf={isMobile ? 'center' : 'flex-start'}
                            width={isMobile ? '100%' : 'auto'}
                            textDecoration="none"
                            _hover={{ textDecoration: 'none' }}
                        >
                            <Button
                                size={{ base: 'md', md: 'md' }}
                                bg="orange.default"
                                color="black"
                                borderRadius="full"
                                px={6}
                                py={4}
                                mt={-8}
                                width={{ base: '100%', md: 'auto' }}
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
                                {updatesStrings.buttonText}
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Container>
        </section>
    );
};
