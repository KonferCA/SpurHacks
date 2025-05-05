import { HStack, Link, Image } from '@chakra-ui/react';
import DiscordIcon from '@assets/logos/socials/discord.svg';
import LinkedinIcon from '@assets/logos/socials/linkedin.svg';
import InstagramIcon from '@assets/logos/socials/instagram.svg';
import XIcon from '@assets/logos/socials/x.svg';
import { strings } from '@locales';
import { links } from '@data';

// maps social keys to icons and labels
const socialPlatforms: {
    [key: string]: {
        icon: string; // the icon is imported as a string (url)
        ariaLabel: string;
        title: string;
        href: string;
    };
} = {
    discord: {
        icon: DiscordIcon,
        ariaLabel: strings.socials.discord.ariaLabel,
        title: strings.socials.discord.title,
        href: links.hackathon.discord,
    },
    linkedin: {
        icon: LinkedinIcon,
        ariaLabel: strings.socials.linkedin.ariaLabel,
        title: strings.socials.linkedin.title,
        href: links.socials.linkedin,
    },
    instagram: {
        icon: InstagramIcon,
        ariaLabel: strings.socials.instagram.ariaLabel,
        title: strings.socials.instagram.title,
        href: links.socials.instagram,
    },
    x: {
        icon: XIcon,
        ariaLabel: strings.socials.x.ariaLabel,
        title: strings.socials.x.title,
        href: links.socials.x,
    },
};

interface SocialMediaBarProps {
    iconSize?: number | string; // size in pixels or chakra size string
    spacing?: number | string; // spacing between icons
}

export const SocialMediaBar: React.FC<SocialMediaBarProps> = ({
    iconSize = 7,
    spacing = 4,
}) => {
    return (
        <HStack gap={spacing}>
            {Object.entries(socialPlatforms).map(([key, platform]) => (
                <Link
                    key={key}
                    href={platform.href}
                    aria-label={platform.ariaLabel}
                    title={platform.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="block"
                >
                    <Image
                        src={platform.icon}
                        alt={platform.title}
                        boxSize={iconSize}
                        display="block"
                    />
                </Link>
            ))}
        </HStack>
    );
};
