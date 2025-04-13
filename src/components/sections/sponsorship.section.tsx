import { Quanta, Quark, Entang, Sing } from "@assets";
import {
    Heading,
    Text,
    Button,
    Flex,
    Container,
    Box,
    Image,
    Grid,
    Stack,
} from "@chakra-ui/react";

export const Sponsorship = () => {
    const singularitySponsors = [
        {
            name: "Snglrty Co.",
            image: Sing,
            slogan: "Which came first, the chicken or chicken jockey?",
        },
        {
            name: "Snglrty Co.",
            image: Sing,
            slogan: "Which came first, the chicken or chicken jockey?",
        },
    ];

    const entanglementSponsors = [
        {
            name: "Company",
            image: Entang,
        },
        {
            name: "Company",
            image: Entang,
        },
    ];

    const quarkSponsors = [
        {
            name: "Company",
            image: Quark,
        },
        {
            name: "Company",
            image: Quark,
        },
    ];

    const quantaSponsors = [
        {
            name: "This Company",
            image: Quanta,
        },
    ];

    // Reusable width for all tiers
    const MAX_WIDTH = "1000px";

    return (
        <div className="bg-black text-white min-h-screen grid place-items-center">
            <Flex
                direction="column"
                gap={20}
                align="center"
                justify="center"
                textAlign="center"
                className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:90px_90px]"
            >
                {/* Header and Text */}
                <Flex
                    direction="column"
                    gap={8}
                    align="center"
                    justify="center"
                    textAlign="center"
                    className="max-w-3xl"
                >
                    <Heading fontSize={["2xl", "3xl", "4xl", "5xl"]}>
                        Sponsor a Special Weekend
                    </Heading>
                    <Text>
                        Placerat maecenas aliquam primis duis viverra integer.
                        Vehicula nulla bibendum facilisis per quis vehicula
                        risus donec euismod. Curabitur aliquet sem vel fermentum
                        lacinia. Aliquam sodales neque lorem, aliquam luctus
                        tellus viverra ut. Curabitur.
                    </Text>
                    <Text>
                        Vehicula nulla bibendum facilisis per
                        <strong> sponsors@spurhacks.com.</strong>
                    </Text>
                    <Button
                        color="black"
                        background="orange.default"
                        rounded="full"
                        p={5}
                        _hover={{ bg: "orange.hover" }}
                        transition="all 0.3s ease-in-out"
                    >
                        BECOME A SPONSOR
                    </Button>
                </Flex>

                <Stack gap={20} align="center">
                    {/* SINGULARITY SPONSORS (1RST) */}
                    <Box w="full" maxW={MAX_WIDTH} mx="auto">
                        <Grid templateColumns="1fr" gap={10}>
                            {singularitySponsors.map((sponsor, index) => (
                                <Box
                                    key={index}
                                    bg="offWhite"
                                    rounded="3xl"
                                    w={{
                                        base: "300px",
                                        sm: "600px",
                                        md: "700px",
                                        lg: "900px",
                                        xl: "1000px",
                                    }}
                                    h={{ base: "auto", md: "200px" }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Image
                                        src={sponsor.image}
                                        alt={sponsor.name}
                                        boxSize={{ base: "150px", md: "200px" }}
                                        objectFit="contain"
                                        py={5}
                                    />
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                    {/* ENTANGLEMENT SPONSORS (2ND) */}
                    <Box w="full" maxW={MAX_WIDTH} mx="auto">
                        <Grid templateColumns="repeat(2, 1fr)" gap={10}>
                            {entanglementSponsors.map((sponsor, index) => (
                                <Box
                                    key={index}
                                    bg="offWhite"
                                    rounded="3xl"
                                    w="full"
                                    h={{ base: "auto", md: "150px" }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Image
                                        src={sponsor.image}
                                        alt={sponsor.name}
                                        boxSize={{ base: "100px", md: "150px" }}
                                        objectFit="contain"
                                        py={5}
                                    />
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                </Stack>
                <Flex direction="column">
                    <Heading fontSize={["2xl", "3xl", "4xl", "5xl"]}>
                        Our Partners
                    </Heading>
                </Flex>
            </Flex>
        </div>
    );
};
