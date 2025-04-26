import {
    Navbar,
    Hero,
    Statistics,
    UpdatesSection,
    Sponsorship,
    FAQ,
    Footer,
} from "@components";

export const Landing = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <Statistics />
            <Sponsorship />
            <FAQ />
            <UpdatesSection />
            <Footer />
        </main>
    );
};
