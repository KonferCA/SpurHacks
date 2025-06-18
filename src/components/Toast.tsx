import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    Button,
    Text,
    IconButton,
    VStack,
    HStack,
    useBreakpointValue,
    Portal,
    Presence,
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

interface ToastProps {
    title: string;
    body: string;
    ctaText: string;
    ctaAction: () => void;
    onClose?: () => void;
    autoShow?: boolean;
    delay?: number;
    enablePersistence?: boolean;
}

export const Toast = ({
    title,
    body,
    ctaText,
    ctaAction,
    onClose,
    autoShow = true,
    delay = 3000,
    enablePersistence = true,
}: ToastProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const width = useBreakpointValue({
        base: 'calc(100vw - 2rem)',
        md: '400px',
    });

    const maxWidth = useBreakpointValue({
        base: '90vw',
        md: '400px',
    });

    const bottom = useBreakpointValue({
        base: '1rem',
        md: '2rem',
    });

    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        if (autoShow) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [autoShow, delay]);

    const handleClose = () => {
        setIsVisible(false);

        if (enablePersistence) {
            localStorage.setItem('toast-dismissed', 'true');
        }

        setTimeout(() => {
            setIsDismissed(true);
            onClose?.();
        }, 300);
    };

    const handleCtaClick = () => {
        ctaAction();
        handleClose();
    };

    if (isDismissed) {
        return null;
    }

    const mobileStyles = {
        left: '50%',
        transform: 'translateX(-50%)',
    };

    const desktopStyles = {
        right: '2rem',
    };

    return (
        <Portal>
            <Box
                position="fixed"
                bottom={bottom}
                zIndex={9999}
                width={width}
                maxWidth={maxWidth}
                pointerEvents="none"
                {...(isMobile ? mobileStyles : desktopStyles)}
            >
                <Presence
                    present={isVisible}
                    animationName={{
                        _open: 'slide-from-bottom, fade-in',
                        _closed: 'slide-to-bottom, fade-out',
                    }}
                    animationDuration="moderate"
                >
                    <Card.Root
                        shadow="2xl"
                        borderRadius="xl"
                        bg="white"
                        border="2px solid"
                        borderColor="orange.default/20"
                        _dark={{
                            bg: 'gray.800',
                            borderColor: 'orange.default/30',
                        }}
                        overflow="hidden"
                        pointerEvents="auto"
                        boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 167, 95, 0.1)"
                        position="relative"
                        _before={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background:
                                'linear-gradient(90deg, orange.default, orange.hover)',
                            borderTopRadius: 'xl',
                        }}
                    >
                        <Card.Body p={4}>
                            <HStack
                                justify="space-between"
                                align="flex-start"
                                mb={3}
                            >
                                <VStack align="flex-start" flex={1}>
                                    <Text
                                        fontSize={{ base: 'sm', md: 'md' }}
                                        fontWeight="semibold"
                                        color="gray.900"
                                        _dark={{ color: 'white' }}
                                        lineHeight="shorter"
                                    >
                                        {title}
                                    </Text>

                                    <Text
                                        fontSize={{ base: 'xs', md: 'sm' }}
                                        color="gray.600"
                                        _dark={{ color: 'gray.300' }}
                                        lineHeight="base"
                                    >
                                        {body}
                                    </Text>
                                </VStack>

                                <IconButton
                                    aria-label="Close toast"
                                    size="sm"
                                    variant="ghost"
                                    colorPalette="gray"
                                    onClick={handleClose}
                                    _hover={{
                                        bg: 'orange.default/10',
                                        color: 'orange.default',
                                        _dark: { bg: 'orange.default/10' },
                                    }}
                                    flexShrink={0}
                                    ml={2}
                                >
                                    <MdClose />
                                </IconButton>
                            </HStack>
                        </Card.Body>

                        <Card.Footer pt={0} px={4} pb={4}>
                            <Button
                                size={{ base: 'sm', md: 'md' }}
                                onClick={handleCtaClick}
                                width="full"
                                fontWeight="medium"
                                bg="orange.default"
                                color="white"
                                boxShadow="orangeGlow"
                                _hover={{
                                    bg: 'orange.hover',
                                    transform: 'translateY(-1px)',
                                    boxShadow:
                                        '0 6px 12px rgba(255, 167, 95, 0.5)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                transition="all 0.2s"
                            >
                                {ctaText}
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                </Presence>
            </Box>
        </Portal>
    );
};

export const usePersistentToast = () => {
    const [toastConfig, setToastConfig] = useState<ToastProps | null>(null);

    const showToast = (config: Omit<ToastProps, 'onClose'>) => {
        setToastConfig({
            ...config,
            onClose: () => setToastConfig(null),
        });
    };

    const hideToast = () => {
        setToastConfig(null);
    };

    return {
        showToast,
        hideToast,
        toastConfig,
    };
};
