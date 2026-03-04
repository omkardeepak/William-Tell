import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll — wraps the app with Lenis for premium buttery-smooth scrolling.
 * Provides inertia-based scroll easing that feels cinematic on both mouse & trackpad.
 */
const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,            // scroll duration (seconds) — higher = smoother/slower
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,     // slightly reduce wheel speed for a more controlled feel
            touchMultiplier: 1.5,     // touch/trackpad feel
            infinite: false,
        });

        lenisRef.current = lenis;

        // Expose lenis on window for other components that may need to pause/resume it
        window.__lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
            window.__lenis = null;
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
