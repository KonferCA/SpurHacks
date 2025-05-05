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
            color="white"
        >
            <Flex
                direction="column"
                width="100%"
                gap={{ base: 4, md: 1 }}
                position="relative"
            >
                <Flex
                    width="100%"
                    justify="center"
                    align="center"
                    mb={1}
                    display={{ base: 'none', md: 'flex' }}
                >
                    <Text fontSize="sm" textAlign="center">
                        &copy; {footerStrings.copyright}
                    </Text>
                </Flex>

                <Flex
                    width="100%"
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align={{ base: 'center', md: 'flex-start' }}
                    mb={{ base: 6, md: 1 }}
                >
                    <Box display={{ base: 'none', md: 'block' }}>
                        <Image
                            src={NoIconLogo}
                            alt={footerStrings.alts.spurhacks}
                            height="24px"
                        />
                    </Box>

                    <Flex direction="column" align="center" justify="center">
                        <Text fontSize="sm" textAlign="center">
                            {footerStrings.madeWith}{' '}
                            <Box as="span" display="inline-block" mx={1}>
                                &#x2661;
                            </Box>{' '}
                            {footerStrings.byTeam}
                        </Text>
                    </Flex>

                    <Flex
                        direction="column"
                        align={{ base: 'center', md: 'flex-end' }}
                    >
                        <Text fontSize="sm" mb={1}>
                            {footerStrings.poweredBy}
                        </Text>
                        <HStack align="center">
                            <Image
                                src={SpurNoIcon}
                                alt={footerStrings.alts.spur}
                                height="16px"
                            />
                            <Box as="span" fontSize="sm" mx={1}>
                                {footerStrings.brandX}
                            </Box>
                            <Image
                                src={KonferNoIcon}
                                alt={footerStrings.alts.konfer}
                                height="16px"
                            />
                        </HStack>
                    </Flex>
                </Flex>

                <Flex
                    width="100%"
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align={{ base: 'center', md: 'center' }}
                    mb={{ base: 6, md: 1 }}
                >
                    <Box ml={-1} mb={{ base: 4, md: 0 }}>
                        <SocialMediaBar />
                    </Box>

                    <Box display={{ base: 'none', md: 'block' }} />

                    <HStack mb={{ base: 4, md: 0 }}>
                        <Link
                            href={links.mlh.codeOfConduct}
                            fontSize="sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {footerStrings.mlh.codeOfConduct}
                        </Link>

                        <Link
                            href={links.mlh.privacy}
                            fontSize="sm"
                            target="_blank"
                            rel="noopener noreferrer"
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
                    <Text fontSize="sm" textAlign="center">
                        &copy; {footerStrings.copyright}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};
