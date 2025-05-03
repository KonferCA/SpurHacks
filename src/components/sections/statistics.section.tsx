import { Flex, Heading, Text } from '@chakra-ui/react';
import { CountUp } from '@components';
import { SplineTarget } from '@components';
import { statisticsItems } from '@locales';

export const Statistics = () => {
    return (
        <Flex className="relative bg-black min-h-screen">
            <SplineTarget
                width="50%"
                height="full"
                maxH="100%"
                position="absolute"
                top={0}
                left={0}
                zIndex={0}
                bg="black"
            />
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
                    {statisticsItems.items.map((item) => (
                        <Flex
                            key={`stat-${item.label}`}
                            direction="column"
                            gap={6}
                        >
                            <Text fontFamily="Geist">{item.label}</Text>
                            <Heading
                                fontFamily="Geist"
                                fontSize={['5xl', '7xl']}
                                color="white"
                                fontWeight="light"
                            >
                                <CountUp
                                    to={item.value}
                                    prefix={item.prefix}
                                    suffix={item.suffix}
                                    allowDecimal={item.allowDecimal}
                                />
                            </Heading>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};
