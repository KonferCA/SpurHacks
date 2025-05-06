import { Box, Flex, Text, HStack, Link, Image } from '@chakra-ui/react';
import { NoIconLogo, SpurNoIcon, KonferNoIcon } from '@assets';
import { footerStrings } from '@locales';
import { links } from '@data';
import { SocialMediaBar } from './common/SocialMediaBar';

export const Footer = () => {
    return (
        <Box
            as="footer"
            bg="black"
            py={2}
            pb={12}
            pt={8}
            px={{ base: 4, md: 10 }}
            color="offWhite"
        >
            <Flex
                direction="column"
                width="100%"
                gap={{ base: 4, md: 1 }}
                position="relative"
            >
                <Flex
                    width="100%"
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align={{ base: 'center', md: 'center' }}
                    mb={{ base: 6, md: 4 }}
                    position="relative"
                    gap={{ base: 8, md: 0 }}
                >
                    <Box display={{ base: 'none', md: 'block' }}>
                        <Image
                            src={NoIconLogo}
                            alt={footerStrings.alts.spurhacks}
                            height="24px"
                        />
                    </Box>

                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        position={{ md: 'absolute' }}
                        left={{ md: '50%' }}
                        transform={{ md: 'translateX(-50%)' }}
                        width="100%"
                        zIndex="1"
                        mb={{ base: 6, md: 0 }}
                    >
                        <Text
                            fontSize="sm"
                            textAlign="center"
                            color="offWhite"
                            opacity={0.9}
                        >
                            {footerStrings.madeWith}{' '}
                            <Box as="span" display="inline-block" mx={1}>
                                &#129293;
                            </Box>{' '}
                            {footerStrings.byTeam}
                        </Text>
                    </Flex>

                    <Flex
                        direction="column"
                        align={{ base: 'center', md: 'flex-end' }}
                        zIndex="2"
                    >
                        <Text
                            fontSize="sm"
                            mb={1}
                            color="offWhite"
                            opacity={0.9}
                        >
                            {footerStrings.poweredBy}
                        </Text>

                        <HStack align="center">
                            <Image
                                src={SpurNoIcon}
                                alt={footerStrings.alts.spur}
                                height="16px"
                                pr={1}
                            />

                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-labelledby="xIconTitle"
                            >
                                <title id="xIconTitle">Separator</title>
                                <path
                                    d="M2 2L14 14M2 14L14 2"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <Image
                                src={KonferNoIcon}
                                alt={footerStrings.alts.konfer}
                                height="16px"
                                pl={1}
                            />
                        </HStack>
                    </Flex>
                </Flex>

                <Flex
                    width="100%"
                    justify="center"
                    align="center"
                    mb={1}
                    display={{ base: 'none', md: 'flex' }}
                >
                    <Text color="offWhite" fontSize="sm" opacity={0.9}>
                        &copy; {footerStrings.copyright}
                    </Text>
                </Flex>

                <Flex
                    width="100%"
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align={{ base: 'center', md: 'center' }}
                    mb={{ base: 6, md: 1 }}
                >
                    <Box ml={-1} mb={{ base: 4, md: 0 }}>
                        <SocialMediaBar isFooter={true} />
                    </Box>

                    <Box display={{ base: 'none', md: 'block' }} />

                    <HStack mb={{ base: 4, md: 0 }}>
                        <Link
                            href={links.mlh.codeOfConduct}
                            fontSize="sm"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="offWhite"
                            opacity={0.9}
                            _hover={{ opacity: 1 }}
                        >
                            {footerStrings.mlh.codeOfConduct}
                        </Link>

                        <Link
                            href={links.mlh.privacy}
                            fontSize="sm"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="offWhite"
                            opacity={0.9}
                            _hover={{ opacity: 1 }}
                        >
                            {footerStrings.mlh.privacy}
                        </Link>
                    </HStack>
                </Flex>

                <Flex
                    width="100%"
                    justify="center"
                    align="center"
                    mt={{ base: 6, md: 0 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <Text
                        textAlign="center"
                        color="offWhite"
                        fontSize="sm"
                        opacity={0.9}
                    >
                        &copy; {footerStrings.copyright}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};
