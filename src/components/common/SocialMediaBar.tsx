import { HStack, Link, Icon } from '@chakra-ui/react';
import {
    FaDiscord,
    FaLinkedin,
    FaInstagram,
    FaXTwitter,
    FaTiktok,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { strings } from '@locales';
import { links } from '@data';

// maps social keys to icons and labels
const socialPlatforms: {
    [key: string]: {
        icon: IconType;
        ariaLabel: string;
        title: string;
        href: string;
    };
} = {
    discord: {
        icon: FaDiscord,
        ariaLabel: strings.socials.discord.ariaLabel,
        title: strings.socials.discord.title,
        href: links.hackathon.discord,
    },
    linkedin: {
        icon: FaLinkedin,
        ariaLabel: strings.socials.linkedin.ariaLabel,
        title: strings.socials.linkedin.title,
        href: links.socials.linkedin,
    },
    instagram: {
        icon: FaInstagram,
        ariaLabel: strings.socials.instagram.ariaLabel,
        title: strings.socials.instagram.title,
        href: links.socials.instagram,
    },
    x: {
        icon: FaXTwitter,
        ariaLabel: strings.socials.x.ariaLabel,
        title: strings.socials.x.title,
        href: links.socials.x,
    },
    tiktok: {
        icon: FaTiktok,
        ariaLabel: strings.socials.tiktok.ariaLabel,
        title: strings.socials.tiktok.title,
        href: links.socials.tiktok,
    },
};

interface SocialMediaBarProps {
    iconSize?: number | string; // size in pixels or chakra size string
    spacing?: number | string; // spacing between icons
    color?: string; // icon color
    isFooter?: boolean;
}

export const SocialMediaBar: React.FC<SocialMediaBarProps> = ({
    iconSize = 7,
    spacing = 4,
    color = 'offWhite',
    isFooter = false,
}) => {
    const footerIconSize = isFooter ? 5 : iconSize;
    const footerSpacing = isFooter ? 3 : spacing;

    return (
        <HStack gap={footerSpacing}>
            {Object.entries(socialPlatforms).map(([key, platform]) => (
                <Link
                    key={key}
                    href={platform.href}
                    aria-label={platform.ariaLabel}
                    title={platform.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    color={color}
                    display="block"
                    position="relative"
                    transition="all 0.2s ease"
                    _hover={{
                        opacity: 1,
                        transform: 'scale(1.1)',
                    }}
                >
                    <Icon as={platform.icon} boxSize={footerIconSize} />
                </Link>
            ))}
        </HStack>
    );
};
