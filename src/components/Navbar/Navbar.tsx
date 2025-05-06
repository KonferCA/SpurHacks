import { IconWhite } from '@assets';
import {
    Box,
    Flex,
    HStack,
    Button,
    Text,
    Link as ChakraLink,
    Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons';
import { ExpandingMenu } from './ExpandingMenu';
import { navButtons, mlhStrings } from '@locales';
import { keyframes } from '@emotion/react';
import { Link as ScrollLink } from 'react-scroll';
import { links } from '@data';
import { loadNavbarSections } from './SectionInterpreter';

export interface NavbarMeta {
    id: string;
    navbarTitle: string;
    priority: number;
}

const rotateAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Navbar = () => {
    const navbarSections = loadNavbarSections();

    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [scrollY, setScrollY] = useState(0);
    const [scrollingUp, setScrollingUp] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    // Listen for window resizing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollingUp(currentScrollY < scrollY || currentScrollY < 10);
            setScrollY(currentScrollY);
            setScrolled(currentScrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollY]);

    return (
        <Box
            className={`transition-all duration-500 ${
                scrolled ? 'backdrop-blur-md bg-black/50' : 'bg-transparent'
            }`}
            w="full"
            px={8}
            py={4}
            position="fixed"
            top={scrollingUp ? 0 : '-150px'}
            left={0}
            zIndex={1002}
        >
            <Flex align="center" justify="space-between" maxW="2000" mx="auto">
                {/* Left Nav Links */}
                <Box>
                    {isMobile ? (
                        // Cross and Hamburger menu on Mobile
                        <Button
                            zIndex={1003}
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
                    ) : (
                        // Links on Desktop - dynamically generated from navbarSections
                        <HStack gap={8}>
                            {navbarSections.map((section: NavbarMeta) => (
                                <ScrollLink
                                    key={section.id}
                                    to={section.id}
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    offset={0}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Text
                                        fontWeight="medium"
                                        className="hover:scale-110"
                                        color="offWhite"
                                        fontSize={{ base: 'sm', md: 'md' }}
                                        opacity={0.9}
                                    >
                                        {section.navbarTitle}
                                    </Text>
                                </ScrollLink>
                            ))}
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
                    <ScrollLink
                        to="hero"
                        spy={true}
                        smooth={true}
                        duration={500}
                        style={{ cursor: 'pointer' }}
                    >
                        <Image
                            src={IconWhite}
                            alt="spurIcon"
                            objectFit="contain"
                            boxSize={{
                                base: '25px',
                                md: '40px',
                            }}
                            transition="transform 0.5s ease-in-out"
                            _hover={{
                                animation: `${rotateAnimation} 1s ease-in-out infinite`,
                            }}
                        />
                    </ScrollLink>
                </Box>

                {/* Right Buttons + MLH Banner */}
                <HStack gap={4} position="relative" minW="200px">
                    {/* Buttons (hidden on Mobile)*/}
                    {isMobile ? (
                        <></>
                    ) : (
                        <HStack gap={4}>
                            {/* <ScrollLink
                                to="register"
                                spy={true}
                                smooth={true}
                                duration={500}
                                offset={-70}
                                style={{ cursor: 'pointer' }}
                            >
                                <Button
                                    size="md"
                                    variant="outline"
                                    color="white"
                                    borderColor="white"
                                    borderRadius="full"
                                    px={6}
                                    py={2}
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                >
                                    {navButtons.register}
                                </Button>
                            </ScrollLink> */}

                            <ChakraLink
                                href={links.hackathon.dashboard}
                                target="_blank"
                                textDecoration="none"
                            >
                                <Button
                                    size="md"
                                    bg="orange.default"
                                    color="black"
                                    borderRadius="full"
                                    px={6}
                                    py={2}
                                    mr={32}
                                    boxShadow="orangeGlow"
                                    transition="all 0.3s ease"
                                    _hover={{
                                        bg: 'orange.hover',
                                        transform: 'translateY(-2px)',
                                        boxShadow:
                                            '0 6px 12px rgba(255, 167, 95, 0.5)',
                                    }}
                                >
                                    {navButtons.applicationPortal}
                                </Button>
                            </ChakraLink>
                        </HStack>
                    )}

                    {/* MLH Banner */}
                    <Box
                        position="absolute"
                        top={{ base: -10, xl: -4 }}
                        right={0}
                    >
                        <ChakraLink
                            id="mlh-trust-badge"
                            href={links.mlh.trust}
                            target="_blank"
                        >
                            <Image
                                src={links.mlh.trustImage}
                                alt={mlhStrings.altText}
                                h={[100, 150]}
                            />
                        </ChakraLink>
                    </Box>
                </HStack>
            </Flex>
            {/* Expanded Menu on Mobile */}
            {isMobile ? (
                <ExpandingMenu
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    navbarSections={navbarSections}
                />
            ) : (
                <></>
            )}
        </Box>
    );
};
