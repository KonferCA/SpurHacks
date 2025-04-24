import {
    Hero,
    Statistics,
    UpdatesSection,
    Sponsorship,
    FAQ,
    Footer,
} from '@components';

export const Landing = () => {
    return (
        <main>
            <Hero />
            <Statistics />
            <Sponsorship />
            <FAQ />
            <UpdatesSection />
            <Footer />
        </main>
    );
};
