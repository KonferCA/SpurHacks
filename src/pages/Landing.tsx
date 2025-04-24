import {
    Hero,
    Statistics,
    UpdatesSection,
    Sponsorship,
    Footer,
} from '@components';

export const Landing = () => {
    return (
        <main>
            <Hero />
            <Statistics />
            <Sponsorship />
            <UpdatesSection />
            <Footer />
        </main>
    );
};
