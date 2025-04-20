import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import Spline from '@splinetool/react-spline';

export const Statistics = () => {
    return (
        <Flex className="bg-black min-h-screen">
            <Box w="50%">
                <Spline
                    scene="https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode"
                    className="w-1/2 h-screen absolute top-0 left-0 z-0"
                />
            </Box>
            <Flex
                direction="column"
                gap={8}
                w="70%"
                justify="center"
                align="center"
                className="bg-gradient-to-l from-black from-70% to-black/0 focus:outline-none z-10"
            >
                <Flex
                    gap={20}
                    direction="column"
                    fontFamily="Geist"
                    fontWeight="extralight"
                >
                    <Flex direction="column" gap={6}>
                        <Text>Prize Value</Text>
                        <Heading
                            fontSize={['4xl', '7xl']}
                            color="white"
                            fontWeight="light"
                        >
                            $100k+
                        </Heading>
                    </Flex>
                    <Flex direction="column" gap={6}>
                        <Text>Participants</Text>
                        <Heading
                            fontSize={['4xl', '7xl']}
                            color="white"
                            fontWeight="light"
                        >
                            2000
                        </Heading>
                    </Flex>
                    <Flex direction="column" gap={6}>
                        <Text>Valuation</Text>
                        <Heading
                            fontSize={['4xl', '7xl']}
                            color="white"
                            fontWeight="light"
                        >
                            23.4B
                        </Heading>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
