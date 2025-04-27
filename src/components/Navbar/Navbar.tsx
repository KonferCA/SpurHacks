import { IconWhite, MLHBanner } from '@assets';
import {
    Box,
    Flex,
    HStack,
    Button,
    Text,
    Link,
    Image,
    Drawer,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons';
import { ExpandingMenu } from './ExpandingMenu';

export const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Listen for window resizing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Box
            bg="transparent"
            w="full"
            px={8}
            py={4}
            position="absolute"
            top={0}
            left={0}
            zIndex={1000}
        >
            {/* Expanded Menu on Mobile */}
            {isMobile ? (
                <ExpandingMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
                <></>
            )}
            <Flex align="center" justify="space-between" maxW="2000" mx="auto">
                {/* Left Nav Links */}
                <Box>
                    {isMobile ? (
                        // Cross and Hamburger menu on Mobile
                        <Drawer.Root size="full" placement="top">
                            <Button
                                zIndex={1000}
                                size="md"
                                variant="ghost"
                                bg="transparent"
                                _hover={{ bg: 'transparent' }}
                                _active={{ bg: 'transparent' }}
                                onClick={() => setIsOpen(!isOpen)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setIsOpen(!isOpen);
                                    }
                                }}
                            >
                                {isOpen ? (
                                    <Cross2Icon
                                        width={25}
                                        height={25}
                                        color="white"
                                    />
                                ) : (
                                    <HamburgerMenuIcon
                                        width={25}
                                        height={25}
                                        color="white"
                                    />
                                )}
                            </Button>
                        </Drawer.Root>
                    ) : (
                        // Links on Desktop
                        <HStack gap={8}>
                            <Link href="#about" textDecoration="none">
                                <Text
                                    fontWeight="medium"
                                    fontFamily="Geist"
                                    color="white"
                                    className="hover:scale-110"
                                >
                                    About
                                </Text>
                            </Link>
                            <Link href="#sponsors" textDecoration="none">
                                <Text
                                    fontWeight="medium"
                                    fontFamily="Geist"
                                    color="white"
                                    className="hover:scale-110"
                                >
                                    Sponsors
                                </Text>
                            </Link>
                            <Link href="#faq" textDecoration="none">
                                <Text
                                    fontWeight="medium"
                                    fontFamily="Geist"
                                    color="white"
                                    className="hover:scale-110"
                                >
                                    FAQ
                                </Text>
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
                        src={IconWhite}
                        alt="spurIcon"
                        objectFit="contain"
                        boxSize={{
                            base: '25px',
                            md: '40px',
                        }}
                    />
                </Box>

                {/* Right Buttons + MLH Banner */}
                <HStack gap={4} position="relative" minW="200px">
                    {/* Buttons (hidden on Mobile)*/}
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
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                >
                                    REGISTER
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
                                    _hover={{
                                        bg: '#FFA75F',
                                        opacity: 0.9,
                                    }}
                                >
                                    APPLICATION PORTAL
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
                        <Image
                            src={MLHBanner}
                            alt="MLH Banner"
                            h={[150, 200]}
                        />
                    </Box>
                </HStack>
            </Flex>
        </Box>
    );
};
