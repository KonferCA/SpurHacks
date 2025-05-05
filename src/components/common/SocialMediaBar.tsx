import { HStack, Link, Icon } from '@chakra-ui/react';

import {
    FaDiscord,
    FaLinkedin,
    FaInstagram,
    FaXTwitter,
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
};

interface SocialMediaBarProps {
    iconSize?: number | string; // size in pixels or chakra size string
    spacing?: number | string; // spacing between icons
    color?: string; // icon color
}

export const SocialMediaBar: React.FC<SocialMediaBarProps> = ({
    iconSize = 7,
    spacing = 4,
    color = 'white',
}) => {
    return (
        <HStack gap={spacing}>
            {Object.entries(socialPlatforms).map(([key, platform]) => (
                <Link
                    key={key}
                    href={platform.href}
                    aria-label={platform.ariaLabel}
                    title={platform.title} // title for accessibility :eyes:
                    target="_blank"
                    rel="noopener noreferrer"
                    color={color}
                    display="block"
                >
                    <Icon as={platform.icon} boxSize={iconSize} />
                </Link>
            ))}
        </HStack>
    );
};
