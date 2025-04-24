import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import Spline from '@splinetool/react-spline';
import { CountUp } from '@components';

export const Statistics = () => {
    return (
        <Flex className="relative bg-black min-h-screen">
            <Box w="50%" h="full" maxH="100%">
                <Spline
                    scene="https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode"
                    className="w-1/2 max-h-screen absolute top-0 left-0 z-0"
                />
            </Box>
            <Flex
                direction="column"
                gap={8}
                w="70%"
                justify="center"
                align="center"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:bg-gradient-to-l from-black from-70% to-black/0 focus:outline-none z-10"
            >
                <Flex
                    gap={[10, 20]}
                    direction="column"
                    fontWeight="extralight"
                    className="text-white"
                >
                    <Flex direction="column" gap={6}>
                        <Text fontFamily="Geist">Prize Value</Text>
                        <Heading
                            fontFamily="Geist"
                            fontSize={['5xl', '7xl']}
                            color="white"
                            fontWeight="light"
                        >
                            <CountUp to={100} prefix="$" suffix="k+" />
                        </Heading>
                    </Flex>
                    <Flex direction="column" gap={6}>
                        <Text fontFamily="Geist">Participants</Text>
                        <Heading
                            fontFamily="Geist"
                            fontSize={['5xl', '7xl']}
                            color="white"
                            fontWeight="light"
                        >
                            <CountUp to={2000} />
                        </Heading>
                    </Flex>
                    <Flex direction="column" gap={6}>
                        <Text fontFamily="Geist">Valuation</Text>
                        <Heading
                            fontFamily="Geist"
                            fontSize={['5xl', '7xl']}
                            color="white"
                            fontWeight="light"
                        >
                            <CountUp to={23.4} suffix="B" allowDecimal />
                        </Heading>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
