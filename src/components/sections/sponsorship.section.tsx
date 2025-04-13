import { Quanta, Quark, Entang, Sing } from "@assets";
import {
    Heading,
    Text,
    Button,
    Flex,
    Container,
    Box,
    Image,
} from "@chakra-ui/react";

export const Sponsorship = () => {
    const singularitySponsors = [
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
    ];

    const quarkSponsors = [
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
                <Flex
                    direction="column"
                    gap={8}
                    align="center"
                    justify="center"
                    textAlign="center"
                >
                    {singularitySponsors.map((sponsor, index) => (
                        <Flex
                            key={index}
                            bg="blue.50"
                            w={{
                                base: "90%",
                                sm: "600px",
                                md: "700px",
                                lg: "1000px",
                            }}
                            h={{ base: "auto", md: "200px" }}
                            justify="center"
                            align="center"
                            textAlign="left"
                            rounded="3xl"
                            px={8}
                            gap={2}
                        >
                            <Image
                                src={sponsor.image}
                                alt={sponsor.name}
                                boxSize={{ base: "150px", md: "200px" }}
                                objectFit="contain"
                                py={5}
                            />
                            <Flex
                                direction="column"
                                align="flex-start"
                                justify="center"
                            >
                                <Text
                                    fontSize={["lg", "2xl", "3xl", "4xl"]}
                                    fontWeight="semibold"
                                    color="black"
                                >
                                    {sponsor.name}
                                </Text>
                                <Box h="1px" w="full" bg="blue.700" my={1} />
                                <Text fontSize="sm" color="black">
                                    {sponsor.slogan}
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
                <Flex direction="column">
                    <Heading fontSize={["2xl", "3xl", "4xl", "5xl"]}>
                        Our Partners
                    </Heading>
                </Flex>
            </Flex>
        </div>
    );
};
