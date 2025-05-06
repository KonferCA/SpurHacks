import { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Text,
    Container,
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
import type { NavbarMeta } from '@components';

export const NavbarInfo: NavbarMeta = {
    id: 'about',
    navbarTitle: 'About Us',
    priority: 1,
};

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
                alt=""
                role="presentation"
                aria-hidden="true"
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
    const [knotsLoaded, setKnotsLoaded] = useState(false);
    const svgCount = useBreakpointValue({ base: 2, md: 4 }) || 4;

    useEffect(() => {
        const notifyLoading = () => {
            if (knotsLoaded) {
                const event = new CustomEvent('aboutAssetsLoaded');
                window.dispatchEvent(event);
            }
        };

        notifyLoading();
    }, [knotsLoaded]);

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

        const preloadImages = async () => {
            const imagePromises = knotSvgs.map((svg) => {
                return new Promise((resolve, reject) => {
                    const img = document.createElement(
                        'img'
                    ) as HTMLImageElement;
                    img.src = svg;
                    img.onload = () => resolve(svg);
                    img.onerror = () =>
                        reject(new Error(`Failed to load ${svg}`));
                });
            });

            try {
                await Promise.all(imagePromises);
                setKnotsLoaded(true);
            } catch (error) {
                console.error('Error preloading knot images:', error);
                setKnotsLoaded(true);
            }
        };

        const positions: Position[] = [
            { x: 5, y: 10 }, // top-left
            { x: 85, y: 15 }, // top-right
            { x: 5, y: 58 }, // bottom-left
            { x: 80, y: 45 }, // bottom-right
            { x: 50, y: 5 }, // top-center
            { x: 5, y: 50 }, // left-center
            { x: 95, y: 50 }, // right-center
            { x: 50, y: 95 }, // bottom-center
        ];

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
        preloadImages();
    }, [svgCount]);

    return (
        <section
            id={NavbarInfo.id}
            className="about-section bg-black min-h-screen"
            style={{
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {inView &&
                knotsLoaded &&
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
                        fontSize={['2xl', '5xl']}
                        color="offWhite"
                        lineHeight="1.1"
                        fontWeight="bold"
                        mb={2}
                        textAlign="left"
                    >
                        {aboutStrings.headings.first}
                    </Heading>

                    <Heading
                        fontSize={['2xl', '5xl']}
                        color="offWhite"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={14}
                        textAlign="left"
                    >
                        {aboutStrings.headings.second}
                    </Heading>

                    <Text
                        color="offWhite"
                        fontSize={{ base: 'md', md: 'lg' }}
                        mb={12}
                        opacity={0.9}
                        textAlign="left"
                    >
                        {aboutStrings.description}
                    </Text>

                    <Heading
                        fontSize={['1.5xl', '3xl']}
                        color="offWhite"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={6}
                        textAlign="left"
                    >
                        {aboutStrings.travel.heading}
                    </Heading>

                    <Text
                        color="offWhite"
                        fontSize={{ base: 'md', md: 'lg' }}
                        mb={12}
                        opacity={0.9}
                        textAlign="left"
                    >
                        {aboutStrings.travel.description}
                    </Text>
                </Flex>
            </Container>
        </section>
    );
};
