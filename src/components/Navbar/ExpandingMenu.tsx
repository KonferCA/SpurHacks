import { Flex, Button, Link, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { navLinks, navButtons } from '@locales';

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

const links = Object.values(navLinks);

type ExpandingMenuProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ExpandingMenu({ isOpen, setIsOpen }: ExpandingMenuProps) {
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
                {links.map((link, i) => (
                    <motion.a
                        key={link}
                        custom={i}
                        variants={navItemVariants}
                        href={`#${link.toLowerCase()}`}
                    >
                        <Text
                            fontFamily="Geist"
                            color="white"
                            className="hover:scale-110"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            {link}
                        </Text>
                    </motion.a>
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
                        <Link href="#register" textDecoration="none">
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
                        </Link>
                        <Link href="#portal" textDecoration="none">
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
                        </Link>
                    </Flex>
                </motion.div>
            </div>
        </motion.nav>
    );
}
