import { Flex, Button, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { navButtons } from '@locales';
import { Link as ScrollLink } from 'react-scroll';
import { NavbarMeta } from './Navbar';

const sidebarVariants = {
    open: {
        clipPath: 'circle(2000px at 40px 40px)',
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    },
    closed: {
        clipPath: 'circle(30px at -30px -30px)',
        transition: {
            delay: 0.3,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const navItemVariants = {
    open: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: i * 0.1 + 0.3,
            type: 'spring',
            stiffness: 300,
        },
    }),
    closed: {
        y: 20,
        opacity: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

const navButtonAnimation = {
    open: () => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.6,
            type: 'spring',
            stiffness: 300,
        },
    }),
    closed: {
        y: 20,
        opacity: 0,
    },
};

interface ExpandingMenuProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    navbarSections: NavbarMeta[];
}

export function ExpandingMenu({ isOpen, setIsOpen, navbarSections }: ExpandingMenuProps) {
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            className={`absolute inset-0 w-full h-screen ${
                isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
        >
            {/* Expanding Circle Background */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full bg-black/97"
                variants={sidebarVariants}
            />

            {/* Menu Items */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-8">
                {navbarSections.map((section, i) => (
                    <motion.div
                        key={section.id}
                        custom={i}
                        variants={navItemVariants}
                        style={{ cursor: 'pointer' }}
                    >
                        <ScrollLink
                            to={section.id}
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            onClick={handleLinkClick}
                        >
                            <Text
                                fontFamily="Geist"
                                color="white"
                                className="hover:scale-110"
                                fontSize="xl"
                            >
                                {section.navbarTitle}
                            </Text>
                        </ScrollLink>
                    </motion.div>
                ))}
                <motion.div
                    variants={navButtonAnimation}
                    className="text-white text-3xl font-semibold"
                >
                    <Flex
                        gap="2"
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ScrollLink
                            to="register"
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            onClick={handleLinkClick}
                            style={{ cursor: 'pointer', width: '100%' }}
                        >
                            <Button
                                size="md"
                                variant="outline"
                                color="white"
                                borderColor="white"
                                borderRadius="full"
                                px={6}
                                py={2}
                                _hover={{
                                    bg: 'whiteAlpha.200',
                                }}
                            >
                                {navButtons.register}
                            </Button>
                        </ScrollLink>
                        <ScrollLink
                            to="portal"
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            onClick={handleLinkClick}
                            style={{ cursor: 'pointer', width: '100%' }}
                        >
                            <Button
                                size="md"
                                bg="#FFA75F"
                                color="black"
                                borderRadius="full"
                                px={6}
                                py={2}
                                _hover={{
                                    bg: '#FFA75F',
                                    opacity: 0.9,
                                }}
                            >
                                {navButtons.applicationPortal}
                            </Button>
                        </ScrollLink>
                    </Flex>
                </motion.div>
            </div>
        </motion.nav>
    );
}