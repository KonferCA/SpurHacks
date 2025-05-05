import {
    Flex,
    Text,
    Button,
    Heading,
    Link,
    Box,
    useBreakpointValue,
} from '@chakra-ui/react';
import { SplineTarget } from '@components';
import { updatesStrings } from '@locales';
import { links } from '@data';
import { NavbarMeta } from '@components';

// Export NavbarInfo for the Updates section
export const NavbarInfo: NavbarMeta = {
    id: "updates",
    navbarTitle: "Stay Updated"
};

export const UpdatesSection = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    
    return (
        <section
            id={NavbarInfo.id}
            className="relative bg-black min-h-screen overflow-hidden flex items-center justify-center"
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
            
            {isMobile ? (
                <Flex
                    direction="column"
                    gap={8}
                    w="90%"
                    position="relative"
                    zIndex={10}
                    px={6}
                    py={16}
                >
                    <Flex
                        direction="column"
                        gap={6}
                        fontWeight="extralight"
                        textAlign="center"
                        className="text-white"
                    >
                        <Heading
                            fontSize={['2xl', '2xl', '3xl', '4xl']}
                            fontFamily="Geist"
                            fontWeight="semibold"
                            lineHeight="1.2"
                        >
                            {updatesStrings.title}
                        </Heading>
                        <Text
                            color="white"
                            fontFamily="Geist"
                            fontSize="lg"
                            mb={8}
                        >
                            {updatesStrings.description}
                        </Text>
                        <Link href={updatesStrings.discordUrl} target="_blank">
                            <Button
                                size="md"
                                bg="#FFA75F"
                                color="black"
                                borderRadius="full"
                                px={6}
                                py={4}
                                mt={-8}
                                width="100%"
                                _hover={{ bg: '#FFA75F', opacity: 0.9 }}
                                rel="noopener noreferrer"
                            >
                                {updatesStrings.buttonText}
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            ) : (
                <Flex
                    direction="column"
                    gap={8}
                    w="40%"
                    justify="center"
                    align="flex-end"
                    ml="55%"
                    position="relative"
                    zIndex={10}
                    h="100vh"
                >
                    <Flex
                        direction="column"
                        maxW="480px"
                        gap={6}
                        fontWeight="extralight"
                        textAlign="left"
                        mr={4}
                        className="text-white"
                    >
                        <Heading
                            fontSize={['2xl', '2xl', '3xl', '4xl']}
                            fontFamily="Geist"
                            fontWeight="semibold"
                            lineHeight="1.2"
                        >
                            {updatesStrings.title}
                        </Heading>
                        <Text
                            color="white"
                            fontFamily="Geist"
                            fontSize="lg"
                            mb={8}
                        >
                            {updatesStrings.description}
                        </Text>
                        <Link href={links.hackathon.discord} target="_blank">
                            <Button
                                size="md"
                                bg="#FFA75F"
                                color="black"
                                borderRadius="full"
                                px={6}
                                py={4}
                                mt={-8}
                                _hover={{ bg: '#FFA75F', opacity: 0.9 }}
                                rel="noopener noreferrer"
                            >
                                {updatesStrings.buttonText}
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            )}
        </section>
    );
};