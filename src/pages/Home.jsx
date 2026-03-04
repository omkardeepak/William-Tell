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

// Individual line reveal component — animates in/out on every scroll
const RevealLine = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
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

    return (
        <div
            ref={sectionRef}
            style={{
                padding: '0.5rem 1.5rem',
                position: 'relative',
            }}
        >
            <div className='max-w-4xl mx-auto'>
                {/* Animated Heading — WordPullUp on viewport entry */}
                {sectionInView && (
                    <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>
                        <WordPullUp
                            words="About Us"
                            className="text-left text-white font-medium text-3xl md:text-5xl leading-tight tracking-[0.02em] drop-shadow-sm"
                            wrapperFramerProps={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.6,
                                        delayChildren: 0.3,
                                    },
                                },
                            }}
                            framerProps={{
                                hidden: { y: 80, opacity: 0 },
                                show: { y: 0, opacity: 1, transition: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] } },
                            }}
                        />
                    </div>
                )}

                {/* Description — fades in after heading animation completes */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{
                        duration: 1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    {/* Paragraph 1 — line by line reveal */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <RevealLine delay={0}>
                            <p style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.1rem',
                                lineHeight: 1.9,
                                color: 'rgba(255,255,255,0.85)',
                                fontWeight: 300,
                            }}>
                                William Tell Productions is a full-service{' '}
                                <LinkPreview
                                    url="https://www.youtube.com/watch?v=POX8SAX_eVQ"
                                    imageSrc="https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?w=600&q=80"
                                    isStatic
                                    className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
                                >
                                    video production
                                </LinkPreview>{' '}
                                company
                                dedicated to crafting compelling visual stories.
                            </p>
                        </RevealLine>
                        <RevealLine delay={0.15}>
                            <p style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.1rem',
                                lineHeight: 1.9,
                                color: 'rgba(255,255,255,0.85)',
                                fontWeight: 300,
                            }}>
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
                        <RevealLine delay={0.3}>
                            <p style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.1rem',
                                lineHeight: 1.9,
                                color: 'rgba(255,255,255,0.85)',
                                fontWeight: 300,
                            }}>

                            </p>
                        </RevealLine>
                    </div>

                    {/* Paragraph 2 — line by line reveal */}
                    <div>
                        <RevealLine delay={0}>
                            <p style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.1rem',
                                lineHeight: 1.9,
                                color: 'rgba(255,255,255,0.85)',
                                fontWeight: 300,
                            }}>
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
                        <RevealLine delay={0.15}>
                            <p style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.1rem',
                                lineHeight: 1.9,
                                color: 'rgba(255,255,255,0.85)',
                                fontWeight: 300,
                            }}>
                                With years of experience across industries, we partner with
                                visionary clients to turn bold ideas into unforgettable experiences.
                            </p>
                        </RevealLine>
                    </div>
                </motion.div>
            </div>
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




