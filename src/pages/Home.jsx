'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollExpandMedia from '../components/blocks/scroll-expansion-hero';
import { LinkPreview } from '../components/ui/link-preview';
import { WordPullUp } from '../components/ui/word-pull-up';

const sampleMediaContent = {
    video: {
        src: 'https://www.youtube.com/watch?v=6TcIzK_E4lQ',
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

    // Show description when section enters view OR immediately when hero expands
    useEffect(() => {
        if (sectionInView) {
            setShowContent(true);
        }
    }, [sectionInView]);

    // Magnetic scroll — when hero finishes expanding, snap viewport to this section
    useEffect(() => {
        const onHeroExpanded = () => {
            // Show content immediately — don't wait for IntersectionObserver
            setShowContent(true);

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
                padding: '5rem 2rem 5rem',
                position: 'relative',
                fontFamily: "'Outfit', sans-serif",
            }}
        >
            <style>{`
                .about-who-label {
                    flex-shrink: 0;
                    width: 100%;
                    margin-bottom: 2rem;
                    padding-top: 0.25rem;
                }
                .about-content-col {
                    width: 100%;
                }
                @media (min-width: 768px) {
                    .about-who-label {
                        width: 220px;
                        margin-bottom: 0;
                        position: sticky;
                        top: 100px;
                    }
                    .about-content-col {
                        width: auto;
                        flex: 1;
                    }
                    .about-row {
                        flex-direction: row !important;
                        align-items: flex-start !important;
                        gap: 7rem !important;
                    }
                }
                .learn-more-link {
                    display: inline-block;
                    margin-top: 2.5rem;
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 400;
                    color: rgba(255,255,255,0.75);
                    letter-spacing: 0.03em;
                    border-bottom: 1px solid rgba(255,255,255,0.4);
                    padding-bottom: 3px;
                    text-decoration: none;
                    transition: color 0.25s ease, border-color 0.25s ease;
                }
                .learn-more-link:hover {
                    color: #fff;
                    border-color: #fff;
                }
            `}</style>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Row: label left | content right */}
                <div
                    className="about-row"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '1.5rem',
                    }}
                >
                    {/* ── LEFT — WHO WE ARE label ── */}
                    <motion.div
                        className="about-who-label"
                        initial={{ opacity: 0 }}
                        animate={showContent ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <span style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.45)',
                        }}>
                            Who We Are
                        </span>
                    </motion.div>

                    {/* ── RIGHT — Statement + link ── */}
                    <div className="about-content-col">
                        <RevealLine delay={0}>
                            <p style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
                                fontWeight: 300,
                                lineHeight: 1.45,
                                color: 'rgba(255,255,255,0.92)',
                                letterSpacing: '-0.01em',
                                margin: 0,
                            }}>
                                We are creatives who focus on crafting{' '}
                                <LinkPreview
                                    url="https://www.youtube.com/watch?v=POX8SAX_eVQ"
                                    imageSrc="https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?w=600&q=80"
                                    isStatic
                                    className="font-normal text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
                                >
                                    compelling visual stories
                                </LinkPreview>
                                {' '}that offer powerful impact — combining{' '}
                                <LinkPreview
                                    url="https://www.youtube.com/watch?v=POX8SAX_eVQ"
                                    imageSrc="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80"
                                    isStatic
                                    className="font-normal text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
                                >
                                    cinematic direction
                                </LinkPreview>
                                {' '}with purposeful storytelling.
                            </p>
                        </RevealLine>

                        <RevealLine delay={0.2}>
                            <a href="/about" className="learn-more-link">
                                Learn More About Us
                            </a>
                        </RevealLine>
                    </div>
                </div>
            </div>

            {/* Bottom divider */}
            <div style={{ maxWidth: '1200px', margin: '4rem auto 0', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
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




