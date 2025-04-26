import { Flex, Button, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

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

const links = ['About', 'Sponsors', 'FAQ'];

type ExpandingMenuProps = {
    isOpen: boolean;
};

export function ExpandingMenu({ isOpen }: ExpandingMenuProps) {
    // Stop user from scrolling when the menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            className="absolute inset-0 w-full h-screen z-50 pointer-events-none"
        >
            {/* Expanding Circle Background */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full bg-[#181C2B]"
                variants={sidebarVariants}
            />

            {/* Menu Items */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-8 pointer-events-auto">
                {links.map((link, i) => (
                    <motion.a
                        key={link}
                        custom={i}
                        variants={navItemVariants}
                        className="text-white text-3xl font-semibold hover:scale-105"
                        href={`#${link.toLowerCase()}`}
                    >
                        {link}
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
                                size="lg"
                                variant="outline"
                                color="white"
                                borderColor="white"
                                borderRadius="full"
                                px={8}
                                py={4}
                                _hover={{
                                    bg: 'whiteAlpha.200',
                                }}
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
                                _hover={{
                                    bg: '#FFA75F',
                                    opacity: 0.9,
                                }}
                            >
                                Application Portal
                            </Button>
                        </Link>
                    </Flex>
                </motion.div>
            </div>
        </motion.nav>
    );
}
