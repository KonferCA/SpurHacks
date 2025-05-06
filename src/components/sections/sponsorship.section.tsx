import {
    Heading,
    Text,
    Button,
    Flex,
    Box,
    Image,
    Grid,
    Stack,
    Link,
} from '@chakra-ui/react';
import { sponsorshipStrings } from '@locales';
import type { NavbarMeta } from '@components';
import {
    singularitySponsors,
    entanglementSponsors,
    quarkSponsors,
    quantaSponsors,
    partners,
} from '@data';
import { getAssetUrl } from '@utils';

export const NavbarInfo: NavbarMeta = {
    id: 'sponsors',
    navbarTitle: 'Sponsors',
    priority: 3,
};

interface Sponsor {
    name: string;
    image: string;
    link: string;
}

// Reusable width for all tiers
const MAX_WIDTH = '1200px';

const SingularitySponsors = () =>
    singularitySponsors && singularitySponsors.length > 0 ? (
        <Grid
            templateColumns="1fr"
            gap={{ base: 6, lg: 10 }}
            justifyItems="center"
        >
            {singularitySponsors.map((sponsor: Sponsor) => (
                <Link
                    key={sponsor.name}
                    bg="offWhite"
                    rounded="3xl"
                    w="full"
                    h={{ base: '200px', md: '180px' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    href={sponsor.link}
                    target="_blank"
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                >
                    <Image
                        src={getAssetUrl(sponsor.image)}
                        alt={sponsor.name}
                        boxSize={{ base: '200px', md: '180px' }}
                        objectFit="contain"
                        py={6}
                    />
                </Link>
            ))}
        </Grid>
    ) : null;

const EntanglementSponsors = () =>
    entanglementSponsors && entanglementSponsors.length > 0 ? (
        <Grid
            templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
            }}
            gap={{ base: 6, lg: 10 }}
            justifyItems="center"
        >
            {entanglementSponsors.map((sponsor: Sponsor, index) => {
                const isLastItem = index === entanglementSponsors.length - 1;
                const isOdd = entanglementSponsors.length % 2 === 1;

                return (
                    <Link
                        key={sponsor.name}
                        bg="offWhite"
                        rounded="3xl"
                        w="full"
                        h={{ base: '150px', md: '150px' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gridColumn={{
                            base: 'auto',
                            md: isLastItem && isOdd ? '1 / span 2' : 'auto',
                        }}
                        justifySelf={{
                            base: 'stretch',
                            md: isLastItem && isOdd ? 'center' : 'stretch',
                        }}
                        maxWidth={{
                            base: '100%',
                            md: isLastItem && isOdd ? '50%' : '100%',
                        }}
                        href={sponsor.link}
                        target="_blank"
                        textDecoration="none"
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Image
                            src={getAssetUrl(sponsor.image)}
                            alt={sponsor.name}
                            boxSize={{
                                base: '100px',
                                md: '150px',
                            }}
                            objectFit="contain"
                            py={5}
                        />
                    </Link>
                );
            })}
        </Grid>
    ) : null;

const QuarkSponsors = () =>
    quarkSponsors && quarkSponsors.length > 0 ? (
        <Grid
            templateColumns={{
                base: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
            }}
            gap={{ base: 6, lg: 10 }}
            justifyItems="center"
        >
            {quarkSponsors.map((sponsor: Sponsor, index) => {
                const isLastItem = index === quarkSponsors.length - 1;
                const isOdd = quarkSponsors.length % 2 === 1;

                return (
                    <Link
                        key={sponsor.name}
                        bg="offWhite"
                        rounded="3xl"
                        w="full"
                        h={{ base: 'auto', md: '150px' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gridColumn={{
                            base: isLastItem && isOdd ? '1 / span 2' : 'auto',
                            md: 'auto',
                        }}
                        justifySelf={{
                            base: isLastItem && isOdd ? 'center' : 'stretch',
                            md: 'stretch',
                        }}
                        maxWidth={{
                            base: isLastItem && isOdd ? '50%' : '100%',
                            md: '100%',
                        }}
                        href={sponsor.link}
                        target="_blank"
                        textDecoration="none"
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Image
                            src={getAssetUrl(sponsor.image)}
                            alt={sponsor.name}
                            boxSize={{
                                base: '100px',
                                md: '150px',
                            }}
                            objectFit="contain"
                            py={5}
                        />
                    </Link>
                );
            })}
        </Grid>
    ) : null;

const QuantaSponsors = () =>
    quantaSponsors && quantaSponsors.length > 0 ? (
        <Flex
            wrap="wrap"
            justify="center"
            gap={6}
            maxW={MAX_WIDTH}
            mx="auto"
            w="full"
        >
            {quantaSponsors.map((sponsor: Sponsor) => (
                <Link
                    key={sponsor.name}
                    bg="offWhite"
                    rounded="3xl"
                    flex={{ base: '1 1 45%', md: '1 1 21%' }}
                    maxW={{ base: '45%', md: '22%' }}
                    minW="150px"
                    h={{ base: '100px', md: '125px' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    href={sponsor.link}
                    target="_blank"
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                >
                    <Image
                        src={getAssetUrl(sponsor.image)}
                        alt={sponsor.name}
                        boxSize={{ base: '100px', md: '125px' }}
                        objectFit="contain"
                        py={5}
                    />
                </Link>
            ))}
        </Flex>
    ) : null;

const Partners = () =>
    partners && partners.length > 0 ? (
        <Flex wrap="wrap" justify="center" gap={{ base: 6, lg: 10 }} w="full">
            {partners.map((sponsor: Sponsor) => (
                <Link
                    key={sponsor.name}
                    bg="offWhite"
                    rounded="3xl"
                    flex={{ base: '1 1 45%', md: '1 1 30%' }}
                    maxW={{ base: '45%', md: '30%' }}
                    minW="150px"
                    h={{ base: '125px', md: '125px' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    href={sponsor.link}
                    target="_blank"
                    p={{ base: 4, md: 5 }}
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                >
                    <Box
                        w="100%"
                        h="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image
                            w={{ base: '180px', md: '200px' }}
                            maxH={{ base: '80px', md: '105px' }}
                            src={getAssetUrl(sponsor.image)}
                            alt={sponsor.name}
                            objectFit="contain"
                        />
                    </Box>
                </Link>
            ))}
        </Flex>
    ) : null;

export const Sponsorship = () => {
    const hasSponsors =
        (singularitySponsors && singularitySponsors.length > 0) ||
        (entanglementSponsors && entanglementSponsors.length > 0) ||
        (quarkSponsors && quarkSponsors.length > 0) ||
        (quantaSponsors && quantaSponsors.length > 0);

    const hasPartners = partners && partners.length > 0;

    return (
        <section
            id="sponsors"
            className="bg-black text-white min-h-screen grid place-items-center"
        >
            <Flex
                direction="column"
                gap={20}
                py={20}
                align="center"
                justify="center"
                textAlign="center"
                className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:90px_90px]"
            >
                <Flex
                    direction="column"
                    gap={8}
                    align="center"
                    justify="center"
                    textAlign="center"
                    className="max-w-3xl"
                    px={5}
                >
                    <Heading
                        fontSize={['2xl', '5xl']}
                        color="offWhite"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={12}
                        textAlign="left"
                    >
                        {sponsorshipStrings.title}
                    </Heading>

                    <Text
                        color="offWhite"
                        fontSize={{ base: 'md', md: 'lg' }}
                        opacity={0.9}
                    >
                        {sponsorshipStrings.description}
                    </Text>

                    <Text
                        color="offWhite"
                        fontSize={{ base: 'md', md: 'lg' }}
                        opacity={0.9}
                    >
                        {sponsorshipStrings.contactText}
                        <strong> {sponsorshipStrings.contactEmail}</strong>
                    </Text>

                    <Link
                        href={sponsorshipStrings.resourcePaths.sponsorshipPdf}
                        target="_blank"
                        textDecoration="none"
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Button
                            color="black"
                            background="orange.default"
                            rounded="full"
                            p={5}
                            boxShadow="orangeGlow"
                            transition="all 0.3s ease"
                            _hover={{
                                bg: 'orange.hover',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 12px rgba(255, 167, 95, 0.5)',
                            }}
                        >
                            {sponsorshipStrings.buttonText}
                        </Button>
                    </Link>
                </Flex>

                {hasSponsors && (
                    <Stack gap={{ base: 10, lg: 20 }} align="center" w="90%">
                        {/* SINGULARITY SPONSORS (1RST) */}
                        {singularitySponsors &&
                            singularitySponsors.length > 0 && (
                                <Box w="full" maxW={MAX_WIDTH} mx="auto">
                                    <SingularitySponsors />
                                </Box>
                            )}

                        {/* ENTANGLEMENT SPONSORS (2ND) */}
                        {entanglementSponsors &&
                            entanglementSponsors.length > 0 && (
                                <Box w="full" maxW={MAX_WIDTH} mx="auto">
                                    <EntanglementSponsors />
                                </Box>
                            )}

                        {/* QUARK SPONSORS (3RD) */}
                        {quarkSponsors && quarkSponsors.length > 0 && (
                            <Box w="full" maxW={MAX_WIDTH} mx="auto">
                                <QuarkSponsors />
                            </Box>
                        )}

                        {/* QUANTA SPONSORS (4TH) */}
                        {quantaSponsors && quantaSponsors.length > 0 && (
                            <Box w="full" maxW={MAX_WIDTH} mx="auto">
                                <QuantaSponsors />
                            </Box>
                        )}
                    </Stack>
                )}

                {hasPartners && (
                    <Stack gap={{ base: 10, lg: 20 }} align="center" w="90%">
                        <Heading
                            fontSize={['2xl', '5xl']}
                            color="offWhite"
                            fontWeight="bold"
                        >
                            {sponsorshipStrings.partnersTitle}
                        </Heading>

                        <Box w="full" maxW={MAX_WIDTH} mx="auto">
                            <Partners />
                        </Box>
                    </Stack>
                )}
            </Flex>
        </section>
    );
};
