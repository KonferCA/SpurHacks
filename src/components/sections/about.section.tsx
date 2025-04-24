import {
    Flex,
    Heading,
    Text,
    Box,
    Button,
    Container,
    Link,
} from '@chakra-ui/react';

export const About = () => {
    return (
        <Box className="bg-black min-h-screen" width="100%">
            <Container maxW="container.xl" h="100%" centerContent>
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
                    <Heading
                        fontFamily="Geist"
                        fontSize={['2xl', '4xl']}
                        color="white"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={2}
                        textAlign="left"
                    >
                        Hack the Uncertainty.
                    </Heading>

                    <Heading
                        fontFamily="Geist"
                        fontSize={['2xl', '4xl']}
                        color="white"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={8}
                        textAlign="left"
                    >
                        Build the Future.
                    </Heading>

                    <Text
                        color="white"
                        fontFamily="Geist"
                        fontSize={{ base: 'md', md: 'lg' }}
                        mb={12}
                        opacity={0.9}
                        textAlign="left"
                    >
                        Placerat maecenas aliquam primis duis viverra integer.
                        Vehicula nulla bibendum facilisis per quis vehicula
                        risus donec euismod. Curabitur aliquet sem vel fermentum
                        lacinia. Aliquam sodales neque lorem, aliquam luctus
                        tellus viverra ut. Curabitur aliquet sem vel fermentum
                        lacinia. Aliquam sodales neque lorem, aliquam luctus
                        tellus viverra ut.
                    </Text>

                    <Link href="https://spuric.com" target="_blank">
                        <Button
                            size={{ base: 'sm', md: 'md' }}
                            bg="#FFA75F"
                            color="black"
                            borderRadius="full"
                            px={5}
                            py={5}
                            mt={-6}
                            _hover={{ bg: '#FFA75F', opacity: 0.9 }}
                            as="a"
                            rel="noopener noreferrer"
                        >
                            COMPANY SITE
                        </Button>
                    </Link>
                </Flex>
            </Container>
        </Box>
    );
};
