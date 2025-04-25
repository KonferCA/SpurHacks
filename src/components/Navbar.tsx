import {
    Box,
    Flex,
    HStack,
    Button,
    Text,
    Spacer,
    Link,
} from "@chakra-ui/react";

export const Navbar = () => {
    return (
        <Box
            w="full"
            px={8}
            py={4}
            boxShadow="md"
            position="sticky"
            top={0}
            zIndex={1000}
        >
            <Flex
                align="center"
                justify="space-between"
                maxW="1200px"
                mx="auto"
            >
                {/* Left Nav Links */}
                <HStack gap={8}>
                    <Link href="#about">
                        <Text fontWeight="medium">About</Text>
                    </Link>
                    <Link href="#sponsors">
                        <Text fontWeight="medium">Sponsors</Text>
                    </Link>
                    <Link href="#faq">
                        <Text fontWeight="medium">FAQ</Text>
                    </Link>
                </HStack>

                {/* Center Logo */}
                <Spacer />
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    🌀 LOGO
                </Text>
                <Spacer />

                {/* Right Buttons */}
                <HStack gap={4}>
                    <Link href="#register">
                        <Button as="a" variant="outline" colorScheme="orange">
                            Register
                        </Button>
                    </Link>
                    <Link href="#portal">
                        <Button
                            bg="orange.400"
                            color="white"
                            _hover={{ bg: "orange.500" }}
                        >
                            Application Portal
                        </Button>
                    </Link>
                </HStack>
            </Flex>
        </Box>
    );
};
