/*
 *
 * @Chakra UI
 *
 */
import { Provider } from './ui/provider';
import { ColorModeProvider } from './ui/color-mode';
import { Toaster } from './ui/toaster';
import { useColorMode, useColorModeValue } from './ui/color-mode';

export {
    Provider,
    ColorModeProvider,
    Toaster,
    useColorMode,
    useColorModeValue,
};

/*
 *
 * @section Hero
 *
 */
import { Navbar } from './Navbar/Navbar';

export { Navbar };

/*
 *
 * @section Hero
 *
 */
import { Hero } from './sections/hero.section';

export { Hero };

/*
 *
 * @section About
 *
 */
import { About } from './sections/about.section';

export { About };

/*
 *
 * @section SPUR
 *
 */
import { Spur } from './sections/spur.section';

export { Spur };

/*
 *
 * @section Statistics
 *
 */
import { Statistics } from './sections/statistics.section';

export { Statistics };

/*
 *
 * @section Sponsorship
 *
 */
import { Sponsorship } from './sections/sponsorship.section';

export { Sponsorship };

/*
 *
 * @section FAQ
 *
 */
import { FAQ } from './sections/faq.section';

export { FAQ };

/*
 *
 * @section Stay in the know
 *
 */
import { UpdatesSection } from './sections/updates.section';

export { UpdatesSection };

/*
 *
 * @component Footer
 *
 */
import { Footer } from './Footer';

export { Footer };

/*
 *
 * @Component CountUp
 *
 */
import { CountUp } from './countup';

export { CountUp };

/*
 *
 * @Component SplineTarget
 *
 */
export * from './spline/SplineTarget';

// Common components
export * from './common/SocialMediaBar';
