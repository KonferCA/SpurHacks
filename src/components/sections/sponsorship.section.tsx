import { Heading, Text, Button, Flex } from "@chakra-ui/react";

export const Sponsorship = () => {
    const quantaSponsors = [
        {
            name: "Company",
            image: "image here",
        },
    ];

    const quarkSponsors = [
        {
            name: "Company",
            image: "image here",
        },
    ];

    const entanglementSponsors = [
        {
            name: "Company",
            image: "image here",
        },
    ];

    const singularitySponsors = [
        {
            name: "Company",
            image: "image here",
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
                className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:60px_60px]"
            >
                {/* Header and Text */}
                <Flex className="flex flex-col items-center justify-center gap-8 max-w-3xl">
                    <Heading fontSize={{ base: "sm", desktop: "5xl" }}>
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
                    >
                        BECOME A SPONSOR
                    </Button>
                </Flex>
                <Flex></Flex>
            </Flex>
        </div>
    );
};
