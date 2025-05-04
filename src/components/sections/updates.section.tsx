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

export const UpdatesSection = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Flex className="relative bg-black min-h-screen overflow-hidden">
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

            <Flex
                direction="column"
                gap={8}
                w={isMobile ? '90%' : '40%'}
                justify="center"
                align={isMobile ? 'center' : 'flex-end'}
                ml={isMobile ? 0 : '55%'}
                px={{ base: 6, md: 0 }}
                py={{ base: 16, md: 0 }}
                className={`
                    ${isMobile ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
                    focus:outline-none z-20
                `}
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
                        fontSize={{ base: 'lg', md: 'lg' }}
                        mb={8}
                    >
                        {updatesStrings.description}
                    </Text>
                    <Link href={updatesStrings.discordUrl} target="_blank">
                        <Button
                            size={{ base: 'md', md: 'md' }}
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
                            {updatesStrings.buttonText}
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
};
