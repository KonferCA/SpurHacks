import { useState, useEffect } from 'react';
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
    LoadingScreen,
    // Toast,
} from '@components';
import { useSpline } from '@contexts';
// import { toastStrings } from '@locales';

export const Landing = () => {
    const { isSplineLoaded, splineError } = useSpline();
    const [contentReady, setContentReady] = useState(false);

    useEffect(() => {
        const handleTransitionIn = () => {
            if (isSplineLoaded || splineError) {
                setContentReady(true);
            }
        };
        const timer = setTimeout(handleTransitionIn, 100);
        return () => clearTimeout(timer);
    }, [isSplineLoaded, splineError]);

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.removedNodes.length > 0) {
                    const loadingRemoved = Array.from(
                        mutation.removedNodes
                    ).some(
                        (node) =>
                            node instanceof HTMLElement &&
                            node.querySelector('[role="presentation"]')
                    );
                    if (loadingRemoved) {
                        document.body.style.display = 'none';
                        setTimeout(() => {
                            document.body.style.display = '';
                        }, 5);
                    }
                }
            }
        });
        observer.observe(document.body, { childList: true });
        return () => observer.disconnect();
    }, []);

    // const handleToastCTA = () => {
    //     window.open(toastStrings.ctaLink, '_blank');
    // };

    // const handleToastClose = () => {
    //     console.log('Toast closed by user');
    // };

    return (
        <>
            <LoadingScreen minLoadTime={2500} />
            <main
                style={{
                    opacity: contentReady ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                }}
            >
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

            {/* <Toast
                title={toastStrings.title}
                body={toastStrings.body}
                ctaText={toastStrings.ctaText}
                ctaAction={handleToastCTA}
                onClose={handleToastClose}
                autoShow={true}
                delay={3000}
            /> */}
        </>
    );
};
