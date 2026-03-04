'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollExpandMedia from '../components/blocks/scroll-expansion-hero';

const sampleMediaContent = {
    video: {
        src: 'https://www.youtube.com/watch?v=POX8SAX_eVQ',
        poster:
            'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
        background:
            'https://i.pinimg.com/736x/64/eb/ef/64ebefbbd558d77f1a1e0d01a4e050c1.jpg',
        title: 'William Tell Productions',
        date: '',
        scrollToExpand: 'We create impact.',
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
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: false, margin: '-80px' });

    return (
        <div className='max-w-4xl mx-auto' style={{ padding: '1rem 1.5rem' }}>
            {/* Animated Heading */}
            <motion.div
                ref={headingRef}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={headingInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
                transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
                style={{ marginBottom: '1rem' }}
            >
                <h2
                    style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 500,
                        color: 'white',
                        letterSpacing: '0.04em',
                        borderBottom: '1px solid rgba(255,255,255,0.15)',
                        paddingBottom: '1.5rem',
                    }}
                >
                    About Us
                </h2>
            </motion.div>

            {/* Paragraph 1 — line by line reveal */}
            <div style={{ marginBottom: '2.5rem' }}>
                <RevealLine delay={0}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)' }}>
                        William Tell Productions is a full-service video production company
                        dedicated to crafting compelling visual stories.
                    </p>
                </RevealLine>
                <RevealLine delay={0.15}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)' }}>
                        From concept to final cut, we bring brands to life through cinematic
                        storytelling, commercials, and immersive digital content.
                    </p>
                </RevealLine>
                <RevealLine delay={0.3}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)' }}>
                        Our team blends creativity with technical precision to deliver
                        work that resonates with audiences worldwide.
                    </p>
                </RevealLine>
            </div>

            {/* Paragraph 2 — line by line reveal */}
            <div>
                <RevealLine delay={0}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)' }}>
                        We believe every project deserves a unique voice. Whether it's a
                        brand film, documentary, or social campaign — impact is our standard.
                    </p>
                </RevealLine>
                <RevealLine delay={0.15}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)' }}>
                        With years of experience across industries, we partner with
                        visionary clients to turn bold ideas into unforgettable experiences.
                    </p>
                </RevealLine>
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




