import { Hero, Sponsorship } from '@components';

export const Landing = () => {
    return (
        <div>
            <main>
                <Hero />
                <div id="sponsorship">
                    <Sponsorship />
                </div>
            </main>
        </div>
    );
};
