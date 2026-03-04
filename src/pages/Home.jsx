'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollExpandMedia from '../components/blocks/scroll-expansion-hero';
import { LinkPreview } from '../components/ui/link-preview';
import { WordPullUp } from '../components/ui/word-pull-up';

const sampleMediaContent = {
    video: {
        src: 'https://www.youtube.com/watch?v=POX8SAX_eVQ',
        poster:
            'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
        background:
            'https://i.pinimg.com/736x/64/eb/ef/64ebefbbd558d77f1a1e0d01a4e050c1.jpg',
        title: 'William Tell Productions',
        date: ''
    },

};

// Individual line reveal component — fast fade on viewport entry
const RevealLine = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
};

const AboutSection = () => {
    const sectionRef = useRef(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: '-50px' });
    const [showContent, setShowContent] = useState(false);

    // Show description immediately when section enters view
    useEffect(() => {
        if (sectionInView) {
            setShowContent(true);
        }
    }, [sectionInView]);

    // Magnetic scroll — when hero finishes expanding, snap viewport to this section
    useEffect(() => {
        const onHeroExpanded = () => {
            // Small delay so the snapping feels intentional rather than instant
            setTimeout(() => {
                if (sectionRef.current) {
                    if (window.__lenis) {
                        window.__lenis.scrollTo(sectionRef.current, {
                            offset: -80,      // account for navbar height
                            duration: 1.4,
                            easing: (t) => 1 - Math.pow(1 - t, 4), // quartic ease-out
                        });
                    } else {
                        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }, 200);
        };

        window.addEventListener('heroExpanded', onHeroExpanded);
        return () => window.removeEventListener('heroExpanded', onHeroExpanded);
    }, []);

    return (
        <div
            ref={sectionRef}
            style={{
                padding: '2rem 1.5rem 3rem',
                position: 'relative',
                fontFamily: "'Outfit', sans-serif",
            }}
        >
            <style>{`
                .about-left {
                    padding: 1rem 0 1rem 0;
                    border-right: none;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    position: relative;
                    top: auto;
                    margin-bottom: 1.5rem;
                }
                .about-right {
                    padding: 1rem 0;
                }
                @media (min-width: 768px) {
                    .about-left {
                        padding: 1rem 2.5rem 1rem 0;
                        border-right: 1px solid rgba(255,255,255,0.1);
                        border-bottom: none;
                        position: sticky;
                        top: 100px;
                        margin-bottom: 0;
                    }
                    .about-right {
                        padding: 1rem 0 1rem 2.5rem;
                    }
                }
            `}</style>
            {/* Two-column grid: heading left | description right */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '0',
                alignItems: 'flex-start',
            }}>

                {/* ── LEFT COLUMN — Heading ── */}
                <div className="about-left">
                    {sectionInView && (
                        <WordPullUp
                            words="What we do."
                            className="text-left text-white font-medium text-3xl md:text-5xl leading-tight tracking-[0.02em] drop-shadow-sm"
                            wrapperFramerProps={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.2,
                                        delayChildren: 0.1,
                                    },
                                },
                            }}
                            framerProps={{
                                hidden: { y: 40, opacity: 0 },
                                show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
                            }}
                        />
                    )}
                </div>

                {/* ── RIGHT COLUMN — Description ── */}
                <motion.div
                    className="about-right"
                    initial={{ opacity: 0, y: 30 }}
                    animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <RevealLine delay={0}>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: '1.2rem' }}>
                            William Tell Productions is a full-service{' '}
                            <LinkPreview
                                url="https://www.youtube.com/watch?v=POX8SAX_eVQ"
                                imageSrc="https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?w=600&q=80"
                                isStatic
                                className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
                            >
                                video production
                            </LinkPreview>{' '}
                            company dedicated to crafting compelling visual stories.
                        </p>
                    </RevealLine>
                    <RevealLine delay={0.1}>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: '1.2rem' }}>
                            From concept to final cut, we bring brands to life through{' '}
                            <LinkPreview
                                url="https://www.youtube.com/watch?v=POX8SAX_eVQ"
                                imageSrc="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80"
                                isStatic
                                className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
                            >
                                cinematic storytelling
                            </LinkPreview>
                            , commercials, and immersive digital content.
                        </p>
                    </RevealLine>
                    <RevealLine delay={0.2}>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: '1.2rem' }}>
                            We believe every project deserves a unique voice. Whether it's a{' '}
                            <LinkPreview
                                url="https://www.youtube.com/watch?v=POX8SAX_eVQ"
                                imageSrc="https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=600&q=80"
                                isStatic
                                className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
                            >
                                brand film
                            </LinkPreview>
                            ,{' '}
                            <LinkPreview
                                url="https://www.youtube.com/watch?v=POX8SAX_eVQ"
                                imageSrc="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80"
                                isStatic
                                className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
                            >
                                documentary
                            </LinkPreview>
                            , or{' '}
                            <LinkPreview
                                url="https://www.youtube.com/watch?v=POX8SAX_eVQ"
                                imageSrc="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80"
                                isStatic
                                className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
                            >
                                social campaign
                            </LinkPreview>
                            {' '}— impact is our standard.
                        </p>
                    </RevealLine>
                    <RevealLine delay={0.3}>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', fontWeight: 300 }}>
                            With years of experience across industries, we partner with
                            visionary clients to turn bold ideas into unforgettable experiences.
                        </p>
                    </RevealLine>
                </motion.div>
            </div>

            {/* Bottom divider */}
            <div style={{ maxWidth: '1200px', margin: '2rem auto 0', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        </div>
    );
};


export const VideoExpansionTextBlend = () => {
    const mediaType = 'video';
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        window.scrollTo(0, 0);

        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaType={mediaType}
                mediaSrc={currentMedia.src}
                posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
                bgImageSrc={undefined}
                bgColor="black"
                logoSrc="/images/wt-logo.png"
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
            >
                <AboutSection />
            </ScrollExpandMedia>
        </div>
    );
};

export const ImageExpansionTextBlend = () => {
    const mediaType = 'image';
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        window.scrollTo(0, 0);

        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaType={mediaType}
                mediaSrc={currentMedia.src}
                bgImageSrc={currentMedia.background}
                logoSrc="/images/wt-logo.png"
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
                textBlend
            >
                <AboutSection />
            </ScrollExpandMedia>
        </div>
    );
};

export const VideoExpansion = () => {
    const mediaType = 'video';
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        window.scrollTo(0, 0);

        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaType={mediaType}
                mediaSrc={currentMedia.src}
                posterSrc={currentMedia.poster}
                bgImageSrc={currentMedia.background}
                logoSrc="/images/wt-logo.png"
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
            >
                <AboutSection />
            </ScrollExpandMedia>
        </div>
    );
};

export const ImageExpansion = () => {
    const mediaType = 'image';
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        window.scrollTo(0, 0);

        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaType={mediaType}
                mediaSrc={currentMedia.src}
                bgImageSrc={currentMedia.background}
                logoSrc="/images/wt-logo.png"
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
            >
                <AboutSection />
            </ScrollExpandMedia>
        </div>
    );
};

const Demo = () => {
    const [mediaType, setMediaType] = useState('video');
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        window.scrollTo(0, 0);

        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, [mediaType]);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaType={mediaType}
                mediaSrc={currentMedia.src}
                posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
                bgImageSrc={currentMedia.background}
                logoSrc="/images/wt-logo.png"
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
            >
                <AboutSection />
            </ScrollExpandMedia>
        </div>
    );
};

export default Demo;




