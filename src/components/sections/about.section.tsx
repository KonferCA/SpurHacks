import { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Text,
    Button,
    Container,
    Link,
    Image,
    Flex,
    useBreakpointValue,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useInView } from 'react-intersection-observer';

import {
    Knot1,
    Knot2,
    Knot3,
    Knot4,
    Knot5,
    Knot6,
    Knot7,
    Knot8,
} from '@assets';

import { aboutStrings } from '@locales';

const rotateClockwise = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const rotateCounterClockwise = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
`;

interface Position {
    x: number;
    y: number;
}

interface SVGConfig {
    id: number;
    svg: string;
    size: number;
    position: Position;
    rotationSpeed: number;
    rotationDirection: 'clockwise' | 'counterclockwise';
}

const FloatingKnot = ({
    svg,
    size,
    position,
    rotationSpeed,
    rotationDirection,
}: {
    svg: string;
    size: number;
    position: Position;
    rotationSpeed: number;
    rotationDirection: 'clockwise' | 'counterclockwise';
}) => {
    const animation =
        rotationDirection === 'clockwise'
            ? `${rotateClockwise} infinite ${rotationSpeed}s linear`
            : `${rotateCounterClockwise} infinite ${rotationSpeed}s linear`;

    return (
        <Box
            position="absolute"
            left={`${position.x}%`}
            top={`${position.y}%`}
            width={`${size}px`}
            height={`${size}px`}
            opacity={0.7}
            zIndex={1}
            animation={animation}
            transformOrigin="center center"
        >
            <Image
                src={svg}
                alt="Knot"
                width={size}
                height={size}
                style={{ width: '100%', height: '100%' }}
            />
        </Box>
    );
};

export const About = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    const [svgConfigs, setSvgConfigs] = useState<SVGConfig[]>([]);
    const svgCount = useBreakpointValue({ base: 2, md: 4 }) || 4;

    useEffect(() => {
        const knotSvgs = [
            Knot1,
            Knot2,
            Knot3,
            Knot4,
            Knot5,
            Knot6,
            Knot7,
            Knot8,
        ];
        const configs: SVGConfig[] = [];

        const positions: Position[] = [
            { x: 5, y: 10 }, // top-left
            { x: 85, y: 15 }, // top-right
            { x: 10, y: 80 }, // bottom-left
            { x: 80, y: 85 }, // bottom-right
            { x: 50, y: 5 }, // top-center
            { x: 5, y: 50 }, // left-center
            { x: 95, y: 50 }, // right-center
            { x: 50, y: 95 }, // bottom-center
        ];

        // select random SVGs from the collection
        for (let i = 0; i < svgCount; i++) {
            const svgIndex = Math.floor(Math.random() * knotSvgs.length);
            const positionIndex = i % positions.length;

            configs.push({
                id: i,
                svg: knotSvgs[svgIndex],
                size: Math.random() * 100 + 160, // size between 160-260px
                position: positions[positionIndex],
                rotationSpeed: Math.random() * 20 + 10, // between 10-30 seconds
                rotationDirection:
                    Math.random() > 0.5 ? 'clockwise' : 'counterclockwise',
            });
        }

        setSvgConfigs(configs);
    }, [svgCount]);

    return (
        <Box
            className="bg-black min-h-screen"
            width="100%"
            position="relative"
            overflow="hidden"
        >
            {inView &&
                svgConfigs.map((config) => (
                    <FloatingKnot
                        key={config.id}
                        svg={config.svg}
                        size={config.size}
                        position={config.position}
                        rotationSpeed={config.rotationSpeed}
                        rotationDirection={config.rotationDirection}
                    />
                ))}

            <Container
                ref={ref}
                maxW="container.xl"
                h="100%"
                centerContent
                position="relative"
                zIndex={2}
            >
                <Flex
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    h="100%"
                    minH="100vh"
                    py={{ base: 16, md: 0 }}
                    px={{ base: 6, md: 0 }}
                    maxW={{ base: '90%', md: '600px' }}
                >
                    <Heading
                        fontFamily="Geist"
                        fontSize={['2xl', '5xl']}
                        color="white"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={2}
                        textAlign="left"
                    >
                        {aboutStrings.headings.first}
                    </Heading>

                    <Heading
                        fontFamily="Geist"
                        fontSize={['2xl', '5xl']}
                        color="white"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={8}
                        textAlign="left"
                    >
                        {aboutStrings.headings.second}
                    </Heading>

                    <Text
                        color="white"
                        fontFamily="Geist"
                        fontSize="lg"
                        mb={12}
                        opacity={0.9}
                        textAlign="left"
                    >
                        {aboutStrings.description}
                    </Text>

                    <Heading
                        fontFamily="Geist"
                        fontSize={['2xl', '4xl']}
                        color="white"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={8}
                        textAlign="left"
                    >
                        {aboutStrings.travel.heading}
                    </Heading>

                    <Text
                        color="white"
                        fontFamily="Geist"
                        fontSize={{ base: 'md', md: 'lg' }}
                        mb={12}
                        opacity={0.9}
                        textAlign="left"
                    >
                        {aboutStrings.travel.description}
                    </Text>
                </Flex>
            </Container>
        </Box>
    );
};
