import {
    Navbar,
    Hero,
    About,
    Spur,
    Statistics,
    UpdatesSection,
    Sponsorship,
    FAQ,
    Footer,
} from '@components';

export const Landing = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <About />
            <Spur />
            <Statistics />
            <Sponsorship />
            <FAQ />
            <UpdatesSection />
            <Footer />
        </main>
    );
};
