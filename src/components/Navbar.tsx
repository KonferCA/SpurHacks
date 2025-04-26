import { Icon, MLHBanner } from "@assets";
import {
    Box,
    Flex,
    HStack,
    Button,
    Text,
    Link,
    Image,
    useBreakpointValue,
    useDisclosure,
    IconButton,
    Drawer,
    Portal,
    Kbd,
    CloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";

export const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Box
            bg="transparent"
            backdropFilter="blur(10px)"
            w="full"
            px={8}
            py={4}
            boxShadow="md"
            position="sticky"
            top={0}
            left={0}
            zIndex={1000}
        >
            <Flex align="center" justify="space-between" maxW="2000" mx="auto">
                {/* Left Nav Links */}
                <Box>
                    {isMobile ? (
                        <Drawer.Root size="full" placement="top">
                            <Drawer.Trigger asChild>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    bg="transparent"
                                    _hover={{ bg: "transparent" }}
                                    _active={{ bg: "transparent" }}
                                >
                                    <RxHamburgerMenu />
                                </Button>
                            </Drawer.Trigger>
                            <Portal>
                                <Drawer.Backdrop />
                                <Drawer.Positioner>
                                    <motion.div
                                        initial={{
                                            scale: 0,
                                            opacity: 0,
                                            originX: 1,
                                            originY: 0,
                                        }}
                                        animate={{
                                            scale: 1,
                                            opacity: 1,
                                            originX: 1,
                                            originY: 0,
                                        }}
                                        exit={{
                                            scale: 0,
                                            opacity: 0,
                                            originX: 1,
                                            originY: 0,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeInOut",
                                        }}
                                        className="w-full"
                                    >
                                        <Drawer.Content>
                                            <Drawer.CloseTrigger asChild>
                                                <CloseButton size="sm" />
                                            </Drawer.CloseTrigger>
                                            <Drawer.Body>
                                                <Flex
                                                    gap={8}
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    pt={10}
                                                >
                                                    <Link
                                                        href="#about"
                                                        outline="none"
                                                    >
                                                        <Text fontWeight="medium">
                                                            About
                                                        </Text>
                                                    </Link>
                                                    <Link href="#sponsors">
                                                        <Text fontWeight="medium">
                                                            Sponsors
                                                        </Text>
                                                    </Link>
                                                    <Link href="#faq">
                                                        <Text fontWeight="medium">
                                                            FAQ
                                                        </Text>
                                                    </Link>
                                                    <Flex
                                                        gap="2"
                                                        direction="column"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                    >
                                                        <Link
                                                            href="#register"
                                                            textDecoration="none"
                                                        >
                                                            <Button
                                                                size="lg"
                                                                variant="outline"
                                                                color="white"
                                                                borderColor="white"
                                                                borderRadius="full"
                                                                px={8}
                                                                py={4}
                                                                _hover={{
                                                                    bg: "whiteAlpha.200",
                                                                }}
                                                            >
                                                                Register
                                                            </Button>
                                                        </Link>
                                                        <Link
                                                            href="#portal"
                                                            textDecoration="none"
                                                        >
                                                            <Button
                                                                size="lg"
                                                                bg="#FFA75F"
                                                                color="black"
                                                                borderRadius="full"
                                                                px={8}
                                                                py={4}
                                                                _hover={{
                                                                    bg: "#FFA75F",
                                                                    opacity: 0.9,
                                                                }}
                                                            >
                                                                Application
                                                                Portal
                                                            </Button>
                                                        </Link>
                                                    </Flex>
                                                </Flex>
                                            </Drawer.Body>
                                        </Drawer.Content>
                                    </motion.div>
                                </Drawer.Positioner>
                            </Portal>
                        </Drawer.Root>
                    ) : (
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
                    )}
                </Box>

                {/* Center Logo */}
                <Box
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"
                    textAlign="center"
                >
                    <Image
                        src={Icon}
                        alt="spurIcon"
                        objectFit="contain"
                        boxSize={{
                            base: "25px",
                            md: "40px",
                        }}
                    />
                </Box>

                {/* Right Buttons + MLH Banner */}
                <HStack gap={4} position="relative" minW="200px">
                    {/* Buttons */}
                    {isMobile ? (
                        <></>
                    ) : (
                        <HStack gap={4}>
                            <Link href="#register" textDecoration="none">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    color="white"
                                    borderColor="white"
                                    borderRadius="full"
                                    px={8}
                                    py={4}
                                    _hover={{ bg: "whiteAlpha.200" }}
                                >
                                    Register
                                </Button>
                            </Link>
                            <Link href="#portal" textDecoration="none">
                                <Button
                                    size="lg"
                                    bg="#FFA75F"
                                    color="black"
                                    borderRadius="full"
                                    px={8}
                                    py={4}
                                    mr={32}
                                    _hover={{ bg: "#FFA75F", opacity: 0.9 }}
                                >
                                    Application Portal
                                </Button>
                            </Link>
                        </HStack>
                    )}

                    {/* MLH Banner */}
                    <Box
                        position="absolute"
                        top={{ base: -10, xl: -4 }}
                        right={0}
                    >
                        <Image src={MLHBanner} alt="MLH Banner" h={200} />
                    </Box>
                </HStack>
            </Flex>
        </Box>
    );
};
