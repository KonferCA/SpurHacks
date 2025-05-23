import { useState, useRef, useEffect } from 'react';
import { Box, Flex, Text, Heading, Container } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'motion/react';
import { faqStrings, faqItems } from '@locales';
import type { NavbarMeta } from '@components';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export const NavbarInfo: NavbarMeta = {
    id: 'faq',
    navbarTitle: 'FAQ',
    priority: 4,
};

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({
    question,
    answer,
    isOpen,
    onToggle,
    index,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        } else {
            setContentHeight(0);
        }
    }, [isOpen]);

    return (
        <MotionBox
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            borderBottom="1px solid rgba(0, 0, 0, 1)"
            py={6}
            mt={2}
        >
            <Flex
                align="center"
                justify="space-between"
                cursor="pointer"
                onClick={onToggle}
            >
                <Text
                    color="black"
                    fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                    opacity={0.9}
                    fontWeight="600"
                    fontFamily="inherit"
                    mr={16}
                >
                    {question}
                </Text>

                <MotionBox transition={{ duration: 0.2 }}>
                    {isOpen ? (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="minusTitleId"
                            role="img"
                        >
                            <title id="minusTitleId">
                                {faqStrings.accessibility.collapseTitle}
                            </title>
                            <path
                                d="M21.375 12.5C21.375 12.7984 21.2565 13.0845 21.0455 13.2955C20.8345 13.5065 20.5484 13.625 20.25 13.625H3.75C3.45163 13.625 3.16548 13.5065 2.9545 13.2955C2.74353 13.0845 2.625 12.7984 2.625 12.5C2.625 12.2016 2.74353 11.9155 2.9545 11.7045C3.16548 11.4935 3.45163 11.375 3.75 11.375H20.25C20.5484 11.375 20.8345 11.4935 21.0455 11.7045C21.2565 11.9155 21.375 12.2016 21.375 12.5Z"
                                fill="black"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="plusTitleId"
                            role="img"
                        >
                            <title id="plusTitleId">
                                {faqStrings.accessibility.expandTitle}
                            </title>
                            <path
                                d="M21.375 12.5C21.375 12.7984 21.2565 13.0845 21.0455 13.2955C20.8345 13.5065 20.5484 13.625 20.25 13.625H13.125V20.75C13.125 21.0484 13.0065 21.3345 12.7955 21.5455C12.5845 21.7565 12.2984 21.875 12 21.875C11.7016 21.875 11.4155 21.7565 11.2045 21.5455C10.9935 21.3345 10.875 21.0484 10.875 20.75V13.625H3.75C3.45163 13.625 3.16548 13.5065 2.9545 13.2955C2.74353 13.0845 2.625 12.7984 2.625 12.5C2.625 12.2016 2.74353 11.9155 2.9545 11.7045C3.16548 11.4935 3.45163 11.375 3.75 11.375H10.875V4.25C10.875 3.95163 10.9935 3.66548 11.2045 3.4545C11.4155 3.24353 11.7016 3.125 12 3.125C12.2984 3.125 12.5845 3.24353 12.7955 3.4545C13.0065 3.66548 13.125 3.95163 13.125 4.25V11.375H20.25C20.5484 11.375 20.8345 11.4935 21.0455 11.7045C21.2565 11.9155 21.375 12.2016 21.375 12.5Z"
                                fill="black"
                            />
                        </svg>
                    )}
                </MotionBox>
            </Flex>

            <AnimatePresence>
                {isOpen && (
                    <MotionBox
                        ref={contentRef}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: contentHeight, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        overflow="hidden"
                        pr={{ base: 0, md: 4 }}
                    >
                        <Text
                            color="black"
                            pt={3}
                            fontSize={{ base: 'sm', sm: 'md', md: 'md' }}
                            opacity={0.9}
                            fontFamily="inherit"
                            lineHeight="1.6"
                        >
                            {answer}
                        </Text>
                    </MotionBox>
                )}
            </AnimatePresence>
        </MotionBox>
    );
};

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const handleToggle = (index: number): void => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section
            id={NavbarInfo.id}
            style={{
                position: 'relative',
                padding: '5rem 0',
                overflow: 'hidden',
                minHeight: '100vh',
                background: 'rgba(222, 235, 255, 0.65)',
            }}
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bgGradient="linear(to-b, rgba(0,0,0,0.2), rgba(0,0,0,0.4))"
                zIndex={1}
            />

            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bg="rgba(222, 235, 255, 0.65)"
                backdropFilter="blur(2px)"
                zIndex={2}
            />

            <Container
                maxW={{ base: '95%', sm: '90%', md: '75%', lg: '65%' }}
                position="relative"
                zIndex={3}
                mt={8}
                mx="auto"
                px={{ base: 4, sm: 6, md: 8, lg: 12 }}
            >
                <MotionHeading
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    textAlign="center"
                    mb={10}
                    color="black"
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
                    fontWeight="bold"
                    lineHeight="1.1"
                    fontFamily="inherit"
                >
                    {faqStrings.title}
                </MotionHeading>

                <MotionText
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    textAlign="center"
                    mb={8}
                    color="black"
                    fontSize={{ base: 'md', sm: 'md', md: 'lg' }}
                    opacity={0.9}
                    fontFamily="inherit"
                >
                    {faqStrings.contactText}{' '}
                    <Text
                        as="span"
                        fontWeight="bold"
                        color="black"
                        fontSize={{ base: 'md', sm: 'md', md: 'lg' }}
                        opacity={0.9}
                        fontFamily="inherit"
                    >
                        {faqStrings.contactEmail}
                    </Text>
                    .
                </MotionText>

                <MotionFlex
                    layout
                    direction="column"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    px={{ base: 2, sm: 4, md: 10, lg: 16 }}
                    width="100%"
                    mx="auto"
                >
                    {faqItems.map((item, index) => (
                        <FAQItem
                            key={`faq-${item.question}`}
                            question={item.question}
                            answer={item.answer}
                            isOpen={activeIndex === index}
                            onToggle={() => handleToggle(index)}
                            index={index}
                        />
                    ))}
                </MotionFlex>
            </Container>
        </section>
    );
};
