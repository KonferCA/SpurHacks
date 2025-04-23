import { Hero, Sponsorship, Footer } from '@components';

export const Landing = () => {
    return (
        <div>
            <main>
                <Hero />
                <div id="sponsorship">
                    <Sponsorship />
                </div>
                <Footer />
            </main>
        </div>
    );
};
