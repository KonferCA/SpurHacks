import { Flex, Heading, Text, useBreakpointValue, Box } from '@chakra-ui/react';
import { CountUp } from '@components';
import { SplineTarget } from '@components';
import { statisticsItems } from '@locales';

export const Statistics = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Flex className="relative bg-black min-h-screen overflow-hidden">
            <SplineTarget
                width={isMobile ? '100%' : '60%'}
                height="full"
                maxH="100%"
                position="absolute"
                top={0}
                left={0}
                zIndex={0}
                bg="transparent"
                maskImage={
                    !isMobile
                        ? 'linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))'
                        : undefined
                }
                WebkitMaskImage={
                    !isMobile
                        ? 'linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))'
                        : undefined
                }
            />

            {!isMobile && (
                <Box
                    position="absolute"
                    top={0}
                    left="30%"
                    width="40%"
                    height="full"
                    zIndex={1}
                    bg="linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))"
                />
            )}

            <Flex
                direction="column"
                gap={8}
                w={isMobile ? '100%' : '40%'}
                justify="center"
                align={isMobile ? 'center' : 'flex-start'}
                pl={isMobile ? 0 : 8}
                ml={isMobile ? 0 : '60%'}
                className={`
                    ${isMobile ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
                    focus:outline-none z-20
                `}
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
