/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
        __lenis: any;
    }
}

'use client';

import {
    useEffect,
    useRef,
    useState,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
    mediaType?: 'video' | 'image';
    mediaSrc: string;
    posterSrc?: string;
    bgImageSrc?: string;
    bgColor?: string;
    logoSrc?: string;
    title?: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: React.ReactNode;
}

const ScrollExpandMedia: React.FC<ScrollExpandMediaProps> = ({
    mediaType = 'video',
    mediaSrc,
    posterSrc,
    bgImageSrc,
    logoSrc,
    title,
    date,
    scrollToExpand,
    textBlend,
    children,
}) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
    const [isMobileState, setIsMobileState] = useState(false);

    const sectionRef = useRef(null);
    const touchStartYRef = useRef(0);
    const scrollProgressRef = useRef(0);
    const targetProgressRef = useRef(0);
    const mediaExpandedRef = useRef(false);
    const lerpFrameRef = useRef<number | null>(null);
    const isAnimatingRef = useRef(false);
    const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Snap to 0 or 1 based on threshold
    const snapToNearest = () => {
        if (targetProgressRef.current > 0 && targetProgressRef.current < 1) {
            if (targetProgressRef.current > 0.4) {
                targetProgressRef.current = 1;
            } else {
                targetProgressRef.current = 0;
            }
            startLerpLoop();
        }
    };

    const resetSnapTimer = () => {
        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = setTimeout(snapToNearest, 150);
    };

    // Helper to stop/start Lenis so hero and smooth-scroll don't fight
    const stopLenis = () => {
        if (window.__lenis) window.__lenis.stop();
    };
    const startLenis = () => {
        if (window.__lenis) window.__lenis.start();
    };

    useEffect(() => {
        scrollProgressRef.current = scrollProgress;
    }, [scrollProgress]);

    useEffect(() => {
        mediaExpandedRef.current = mediaFullyExpanded;
    }, [mediaFullyExpanded]);

    useEffect(() => {
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
        targetProgressRef.current = 0;
        scrollProgressRef.current = 0;
    }, [mediaType]);

    // On mount: pause Lenis so hero controls scroll. On unmount: resume it.
    useEffect(() => {
        stopLenis();
        return () => startLenis();
    }, []);

    // Smooth lerp animation loop — runs continuously while current ≠ target
    const startLerpLoop = () => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        let lastTime = performance.now();

        const tick = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.05); // cap delta-time at 50ms
            lastTime = now;

            const current = scrollProgressRef.current;
            const target = targetProgressRef.current;
            const diff = target - current;

            // Frame-rate-independent exponential ease
            // smoothFactor controls the "feel": lower = smoother/slower, higher = snappier
            const smoothFactor = 8;
            const newProgress = Math.abs(diff) < 0.0005
                ? target
                : current + diff * (1 - Math.exp(-smoothFactor * dt));

            const clamped = Math.min(Math.max(newProgress, 0), 1);
            scrollProgressRef.current = clamped;
            setScrollProgress(clamped);

            if (clamped >= 1) {
                setMediaFullyExpanded(true);
                mediaExpandedRef.current = true;
                setShowContent(true);
                // Media is fully expanded — hand scroll control back to Lenis
                startLenis();
                // Signal AboutSection to magnetically snap to it
                window.dispatchEvent(new Event('heroExpanded'));
            } else if (clamped < 0.75) {
                setShowContent(false);
            }

            // Keep looping if we haven't converged
            if (Math.abs(clamped - target) > 0.0003) {
                lerpFrameRef.current = requestAnimationFrame(tick);
            } else {
                isAnimatingRef.current = false;
                lerpFrameRef.current = null;
            }
        };

        lerpFrameRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        const handleWheel = (e) => {
            if (mediaExpandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                e.preventDefault();
                mediaExpandedRef.current = false;
                // Collapsing — take scroll control away from Lenis
                stopLenis();
                // Set target back so lerp animates the collapse
                targetProgressRef.current = 0;
                startLerpLoop();
                resetSnapTimer();
            } else if (!mediaExpandedRef.current) {
                e.preventDefault();
                const lineHeight = 16;
                const normalizedDelta =
                    e.deltaMode === 1 ? e.deltaY * lineHeight : e.deltaY;

                // Accumulate into a smooth target instead of applying instantly
                const scrollDelta = normalizedDelta * 0.003;
                targetProgressRef.current = Math.min(
                    Math.max(targetProgressRef.current + scrollDelta, 0),
                    1
                );
                startLerpLoop();
                resetSnapTimer();
            }
        };

        const handleTouchStart = (e) => {
            const initialY = e.touches[0].clientY;
            touchStartYRef.current = initialY;
        };

        const handleTouchMove = (e) => {
            if (!touchStartYRef.current) return;

            const touchY = e.touches[0].clientY;
            const deltaY = touchStartYRef.current - touchY;

            if (mediaExpandedRef.current && deltaY < -20 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                mediaExpandedRef.current = false;
                e.preventDefault();
                stopLenis();
                targetProgressRef.current = 0;
                startLerpLoop();
                resetSnapTimer();
            } else if (!mediaExpandedRef.current) {
                e.preventDefault();
                const scrollFactor = deltaY < 0 ? 0.018 : 0.012;
                const scrollDelta = deltaY * scrollFactor;
                targetProgressRef.current = Math.min(
                    Math.max(targetProgressRef.current + scrollDelta, 0),
                    1
                );
                startLerpLoop();
                resetSnapTimer();
                touchStartYRef.current = touchY;
            }
        };

        const handleTouchEnd = () => {
            touchStartYRef.current = 0;
        };

        const handleScroll = () => {
            if (!mediaExpandedRef.current) {
                window.scrollTo(0, 0);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);

            if (lerpFrameRef.current) {
                cancelAnimationFrame(lerpFrameRef.current);
                lerpFrameRef.current = null;
            }
            isAnimatingRef.current = false;
            if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobileState(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const mediaWidth = (isMobileState ? 320 : 750) + scrollProgress * (isMobileState ? 800 : 1600);
    const mediaHeight = (isMobileState ? 400 : 800) + scrollProgress * (isMobileState ? 300 : 300);
    const textTranslateX = scrollProgress * (isMobileState ? 100 : 130);

    // Blur: starts at 12px, clears to 0 as scroll progresses
    const blurAmount = Math.max(0, 10 * (1 - scrollProgress * 1.5));

    const words = title ? title.split(' ') : [];
    const titleLine1 = words.length > 1 ? words.slice(0, -1).join(' ') : title || '';
    const titleLine2 = words.length > 1 ? words[words.length - 1] : '';

    return (
        <div
            ref={sectionRef}
            className={`transition-colors duration-700 ease-in-out overflow-x-hidden ${!mediaFullyExpanded ? 'h-[100dvh] overflow-y-hidden' : 'h-auto'}`}
        >
            <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
                <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
                    <motion.div
                        className='absolute inset-0 z-0 h-full'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 - scrollProgress }}
                        transition={{ duration: 0.1 }}
                    >
                        <img
                            src={bgImageSrc}
                            alt='Background'
                            className='w-screen h-screen object-cover object-center'
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                        />
                        <div className='absolute inset-0 bg-black/10' />
                    </motion.div>

                    <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
                        <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
                            <div
                                className='absolute z-0 transition-none rounded-2xl'
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: `${mediaWidth}px`,
                                    height: `${mediaHeight}px`,
                                    maxWidth: '95vw',
                                    maxHeight: '85vh',
                                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                                    filter: `blur(${blurAmount}px)`,
                                }}
                            >
                                {mediaType === 'video' ? (
                                    mediaSrc.includes('youtube.com') ? (
                                        <div
                                            className='relative w-full h-full pointer-events-none'
                                            style={{ overflow: 'hidden', borderRadius: '0.75rem' }}
                                        >
                                            <iframe
                                                width='100%'
                                                height='100%'
                                                src={
                                                    mediaSrc.includes('embed')
                                                        ? mediaSrc +
                                                        (mediaSrc.includes('?') ? '&' : '?') +
                                                        'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&iv_load_policy=3&playsinline=1'
                                                        : mediaSrc.replace('watch?v=', 'embed/') +
                                                        '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&iv_load_policy=3&playsinline=1&playlist=' +
                                                        mediaSrc.split('v=')[1]
                                                }
                                                style={{
                                                    position: 'absolute',
                                                    top: '-60px',
                                                    left: '-10px',
                                                    width: 'calc(100% + 20px)',
                                                    height: 'calc(100% + 120px)',
                                                    border: 'none',
                                                }}
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                allowFullScreen
                                            />
                                            {/* Block pointer events so user can't interact with YT controls */}
                                            <div
                                                className='absolute inset-0 z-10'
                                                style={{ pointerEvents: 'auto' }}
                                            ></div>

                                            <motion.div
                                                className='absolute inset-0 bg-black/30'
                                                style={{ borderRadius: '0.75rem' }}
                                                initial={{ opacity: 0.7 }}
                                                animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </div>
                                    ) : (
                                        <div className='relative w-full h-full pointer-events-none'>
                                            <video
                                                src={mediaSrc}
                                                poster={posterSrc}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload='auto'
                                                className='w-full h-full object-cover rounded-xl'
                                                controls={false}
                                                disablePictureInPicture
                                                disableRemotePlayback
                                            />
                                            <div
                                                className='absolute inset-0 z-10'
                                                style={{ pointerEvents: 'none' }}
                                            ></div>

                                            <motion.div
                                                className='absolute inset-0 bg-black/30 rounded-xl'
                                                initial={{ opacity: 0.7 }}
                                                animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <div className='relative w-full h-full'>
                                        <img
                                            src={mediaSrc}
                                            alt={title || 'Media content'}
                                            className='w-full h-full object-cover rounded-xl'
                                        />

                                        <motion.div
                                            className='absolute inset-0 bg-black/50 rounded-xl'
                                            initial={{ opacity: 0.7 }}
                                            animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </div>
                                )}

                                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                                    {date && (
                                        <p
                                            className='text-2xl text-blue-200'
                                            style={{ transform: `translateX(-${textTranslateX}vw)` }}
                                        >
                                            {date}
                                        </p>
                                    )}
                                    {scrollToExpand && (
                                        <p
                                            className='text-blue-200 font-medium text-center'
                                            style={{ transform: `translateX(${textTranslateX}vw)` }}
                                        >
                                            {scrollToExpand}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div
                                className={`flex items-center justify-center w-full relative z-10 transition-none ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'}`}
                            >
                                <div
                                    className='flex items-center  gap-4 md:gap-6 transition-none'
                                    style={{
                                        transform: `scale(${1 - scrollProgress * 0.15})`,
                                    }}
                                >
                                    {/* Logo on left */}
                                    {logoSrc && (
                                        <motion.img
                                            src={logoSrc}
                                            alt='Logo'
                                            className='transition-none mb-10'
                                            style={{
                                                width: isMobileState ? '80px' : '140px',
                                                height: 'auto',
                                                filter: 'drop-shadow(0 2px 20px rgba(0,0,0,0.8))',
                                                transform: `translateX(-${textTranslateX}vw)`,
                                            }}
                                        />
                                    )}
                                    <div
                                        className='flex flex-col items-center transition-none'
                                        style={{
                                            transform: `translateX(${textTranslateX}vw)`,
                                        }}
                                    >
                                        <motion.h2
                                            className='transition-none'
                                            style={{
                                                fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                                                fontSize: isMobileState ? '2.2rem' : '4.2rem',
                                                fontWeight: 400,
                                                color: 'white',
                                                letterSpacing: '0.02em',
                                                lineHeight: 1.15,
                                                textShadow: '0 2px 30px rgba(0,0,0,0.9), 0 4px 60px rgba(0,0,0,0.7), 0 0 10px rgba(0,0,0,0.6)',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            William Tell
                                        </motion.h2>
                                        <motion.p
                                            className='transition-none'
                                            style={{
                                                fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                                                fontSize: isMobileState ? '0.85rem' : '1.5rem',
                                                fontWeight: 400,
                                                color: 'white',
                                                letterSpacing: '0.45em',
                                                lineHeight: 1.2,
                                                textShadow: '0 2px 30px rgba(0,0,0,0.9), 0 4px 60px rgba(0,0,0,0.7), 0 0 10px rgba(0,0,0,0.6)',
                                                textTransform: 'uppercase',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Productions
                                        </motion.p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showContent && (
                            <motion.section
                                className='flex flex-col w-full px-8 py-4 md:px-16 lg:py-8'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7 }}
                            >
                                {children}
                            </motion.section>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ScrollExpandMedia;
