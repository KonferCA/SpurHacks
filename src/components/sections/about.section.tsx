import { useEffect, useState, useRef } from 'react';
import {
    Flex,
    Heading,
    Text,
    Box,
    Button,
    Container,
    Link,
    Image,
    useBreakpointValue,
} from '@chakra-ui/react';

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

const knotSvgs = [Knot1, Knot2, Knot3, Knot4, Knot5, Knot6, Knot7, Knot8];

interface Position {
    x: number;
    y: number;
}

interface SVGConfig {
    id: number;
    svg: string;
    size: number;
    initialPosition: Position;
    speed: number;
    rotationRange: number;
}

const FloatingSVG = ({
    svg,
    size,
    initialPosition,
    speed = 1,
    rotationRange = 20,
    contentBounds,
}: {
    svg: string;
    size: number;
    initialPosition: Position;
    speed?: number;
    rotationRange?: number;
    contentBounds: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}) => {
    const [position, setPosition] = useState({ ...initialPosition });
    const [rotation, setRotation] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const svgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // generate random movement parameters
        const xAmplitude = Math.random() * 10 + 10;
        const yAmplitude = Math.random() * 10 + 10;
        const xFrequency = (Math.random() * 0.0005 + 0.0002) * speed;
        const yFrequency = (Math.random() * 0.0005 + 0.0002) * speed;
        const rotationSpeed = (Math.random() * 0.01 + 0.005) * speed;
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;

        const xPhase = Math.random() * Math.PI * 2;
        const yPhase = Math.random() * Math.PI * 2;

        let frame: number;
        const startTime = Date.now();

        // define padded boundaries to avoid content area
        const padding = size * 0.5; // add padding equal to half the size of the SVG

        // define the safe area
        const margin = 20; // keep SVGs at least 20px from edge of screen
        const safeLeft = margin;
        const safeRight = window.innerWidth - size - margin;
        const safeTop = margin;
        const safeBottom = window.innerHeight - size - margin;

        const animate = () => {
            const elapsed = Date.now() - startTime;

            // calculate raw new position based on sine/cosine waves
            let newX =
                initialPosition.x +
                Math.sin(elapsed * xFrequency + xPhase) * xAmplitude;
            let newY =
                initialPosition.y +
                Math.cos(elapsed * yFrequency + yPhase) * yAmplitude;

            // strict boundary checks to keep SVGs fully within viewport
            newX = Math.max(safeLeft, Math.min(safeRight, newX));
            newY = Math.max(safeTop, Math.min(safeBottom, newY));

            // content collision avoidance
            // check if SVG would overlap with content and adjust position
            const svgBounds = {
                left: newX - padding,
                right: newX + size + padding,
                top: newY - padding,
                bottom: newY + size + padding,
            };

            // check for collision with content
            const collisionWithContent = !(
                svgBounds.right < contentBounds.left ||
                svgBounds.left > contentBounds.right ||
                svgBounds.bottom < contentBounds.top ||
                svgBounds.top > contentBounds.bottom
            );

            // if collision detected, adjust position to stay outside content bounds
            if (collisionWithContent) {
                const distToLeft = Math.abs(
                    svgBounds.right - contentBounds.left
                );
                const distToRight = Math.abs(
                    svgBounds.left - contentBounds.right
                );
                const distToTop = Math.abs(
                    svgBounds.bottom - contentBounds.top
                );
                const distToBottom = Math.abs(
                    svgBounds.top - contentBounds.bottom
                );

                const minDist = Math.min(
                    distToLeft,
                    distToRight,
                    distToTop,
                    distToBottom
                );

                // apply adjustment & ensure within viewport bounds
                if (
                    minDist === distToLeft &&
                    contentBounds.left > size + padding + safeLeft
                ) {
                    newX = contentBounds.left - size - padding;
                    newX = Math.max(safeLeft, newX);
                } else if (
                    minDist === distToRight &&
                    contentBounds.right + padding + size < safeRight
                ) {
                    newX = contentBounds.right + padding;
                    newX = Math.min(safeRight, newX);
                } else if (
                    minDist === distToTop &&
                    contentBounds.top > size + padding + safeTop
                ) {
                    newY = contentBounds.top - size - padding;
                    newY = Math.max(safeTop, newY);
                } else if (
                    minDist === distToBottom &&
                    contentBounds.bottom + padding + size < safeBottom
                ) {
                    newY = contentBounds.bottom + padding;
                    newY = Math.min(safeBottom, newY);
                } else {
                    newX = Math.max(safeLeft, Math.min(safeRight, newX));
                    newY = Math.max(safeTop, Math.min(safeBottom, newY));
                }
            }

            const newRotation =
                rotationDirection *
                Math.sin(elapsed * rotationSpeed) *
                rotationRange;

            setPosition({ x: newX, y: newY });
            setRotation(newRotation);

            frame = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(frame);
    }, [initialPosition, speed, rotationRange, size, contentBounds]);

    // ensure SVG is visible - check at render time
    useEffect(() => {
        const checkVisibility = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const isInViewport =
                position.x >= 0 &&
                position.x <= viewportWidth - size &&
                position.y >= 0 &&
                position.y <= viewportHeight - size;

            setIsVisible(isInViewport);
        };

        checkVisibility();

        window.addEventListener('resize', checkVisibility);
        return () => window.removeEventListener('resize', checkVisibility);
    }, [position, size]);

    return isVisible ? (
        <Box
            ref={svgRef}
            position="absolute"
            style={{
                transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
                transition: 'transform 0.5s ease',
                width: `${size}px`,
                height: `${size}px`,
            }}
            opacity={0.7}
            zIndex={1}
        >
            <Image
                src={svg}
                alt="Floating SVG"
                width={size}
                height={size}
                style={{ width: '100%', height: '100%' }}
            />
        </Box>
    ) : null;
};

export const About = () => {
    const [contentBounds, setContentBounds] = useState({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    });
    const contentRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    const svgCount = useBreakpointValue({ base: 2, md: 5 }) || 5;

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const [svgConfigs, setSvgConfigs] = useState<SVGConfig[]>([]);

    // update content bounds on resize and ever so often
    useEffect(() => {
        const updateContentBounds = () => {
            if (contentRef.current) {
                const rect = contentRef.current.getBoundingClientRect();
                const bufferMargin = 30;

                setContentBounds({
                    left: rect.left - bufferMargin,
                    right: rect.right + bufferMargin,
                    top: rect.top - bufferMargin,
                    bottom: rect.bottom + bufferMargin,
                });
            }
        };

        updateContentBounds();

        window.addEventListener('resize', updateContentBounds);

        const generateSvgConfigs = () => {
            const configs: SVGConfig[] = [];
            const usedIndices = new Set<number>();

            // select random SVGs from the collection
            for (let i = 0; i < svgCount; i++) {
                let svgIndex: number;

                do {
                    svgIndex = Math.floor(Math.random() * knotSvgs.length);
                } while (
                    usedIndices.has(svgIndex) &&
                    usedIndices.size < knotSvgs.length
                );

                usedIndices.add(svgIndex);

                // generate positions based on screen quadrants
                const quadrant = i % 4; // 0: top-left, 1: top-right, 2: bottom-left, 3: bottom-right

                const size = Math.random() * 80 + 120; // size between 120-200px

                let x = 0;
                let y = 0;
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const margin = 40;

                switch (quadrant) {
                    case 0: // top-left
                        x = margin + Math.random() * (viewportWidth * 0.2);
                        y = margin + Math.random() * (viewportHeight * 0.2);
                        break;
                    case 1: // top-right
                        x =
                            viewportWidth -
                            (Math.random() * (viewportWidth * 0.2) +
                                size +
                                margin);
                        y = margin + Math.random() * (viewportHeight * 0.2);
                        break;
                    case 2: // bottom-left
                        x = margin + Math.random() * (viewportWidth * 0.2);
                        y =
                            viewportHeight -
                            (Math.random() * (viewportHeight * 0.2) +
                                size +
                                margin);
                        break;
                    case 3: // bottom-right
                        x =
                            viewportWidth -
                            (Math.random() * (viewportWidth * 0.2) +
                                size +
                                margin);
                        y =
                            viewportHeight -
                            (Math.random() * (viewportHeight * 0.2) +
                                size +
                                margin);
                        break;
                    default:
                        if (Math.random() > 0.5) {
                            x =
                                Math.random() > 0.5
                                    ? margin +
                                      Math.random() * (viewportWidth * 0.2)
                                    : // left side
                                      viewportWidth -
                                      (Math.random() * (viewportWidth * 0.2) +
                                          size +
                                          margin); // right side
                        } else {
                            // either top/bottom side
                            y =
                                Math.random() > 0.5
                                    ? margin +
                                      Math.random() * (viewportHeight * 0.2)
                                    : // top
                                      viewportHeight -
                                      (Math.random() * (viewportHeight * 0.2) +
                                          size +
                                          margin); // bottom
                            x =
                                margin +
                                Math.random() *
                                    (viewportWidth - size - margin * 2);
                        }
                }

                configs.push({
                    id: i,
                    svg: knotSvgs[svgIndex],
                    size,
                    initialPosition: { x: x ?? 0, y: y ?? 0 },
                    speed: Math.random() * 0.5 + 0.5, // speed between 0.5-1
                    rotationRange: Math.random() * 180 + 90, // rotation between 90-270 degrees
                });
            }

            setSvgConfigs(configs);
        };

        generateSvgConfigs();

        return () => {
            window.removeEventListener('resize', updateContentBounds);
        };
    }, [svgCount]);

    return (
        <Box
            className="bg-black min-h-screen"
            width="100%"
            position="relative"
            overflow="hidden"
        >
            {isMounted &&
                svgConfigs.map((config) => (
                    <FloatingSVG
                        key={config.id}
                        svg={config.svg}
                        size={config.size}
                        initialPosition={config.initialPosition}
                        speed={config.speed}
                        rotationRange={config.rotationRange}
                        contentBounds={contentBounds}
                    />
                ))}

            <Container
                ref={contentRef}
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
                        fontSize={['2xl', '4xl']}
                        color="white"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={2}
                        textAlign="left"
                    >
                        Hack the Uncertainty.
                    </Heading>

                    <Heading
                        fontFamily="Geist"
                        fontSize={['2xl', '4xl']}
                        color="white"
                        fontWeight="bold"
                        lineHeight="1.1"
                        mb={8}
                        textAlign="left"
                    >
                        Build the Future.
                    </Heading>

                    <Text
                        color="white"
                        fontFamily="Geist"
                        fontSize={{ base: 'md', md: 'lg' }}
                        mb={12}
                        opacity={0.9}
                        textAlign="left"
                    >
                        Placerat maecenas aliquam primis duis viverra integer.
                        Vehicula nulla bibendum facilisis per quis vehicula
                        risus donec euismod. Curabitur aliquet sem vel fermentum
                        lacinia. Aliquam sodales neque lorem, aliquam luctus
                        tellus viverra ut. Curabitur aliquet sem vel fermentum
                        lacinia. Aliquam sodales neque lorem, aliquam luctus
                        tellus viverra ut.
                    </Text>

                    <Link href="https://spuric.com" target="_blank">
                        <Button
                            size={{ base: 'sm', md: 'md' }}
                            bg="#FFA75F"
                            color="black"
                            borderRadius="full"
                            px={5}
                            py={5}
                            mt={-6}
                            _hover={{ bg: '#FFA75F', opacity: 0.9 }}
                            as="a"
                            rel="noopener noreferrer"
                        >
                            COMPANY SITE
                        </Button>
                    </Link>
                </Flex>
            </Container>
        </Box>
    );
};
