import {
    Hero,
    About,
    About2,
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
            <About />
            <About2 />
            <Statistics />
            <Sponsorship />
            <FAQ />
            <UpdatesSection />
            <Footer />
        </main>
    );
};
