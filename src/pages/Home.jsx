'use client';

import { useState, useEffect, useRef } from 'react';
import ScrollExpandMedia from '../components/blocks/scroll-expansion-hero';
import { LinkPreview } from '../components/ui/link-preview';
import { WordPullUp } from '../components/ui/word-pull-up';
import Works from './Works';
import HeroFilmsSection from '../components/HeroFilmsSection';
import HeroSeam from '../components/HeroSeam';

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

/* ── Word-reveal helper ──────────────────────────── */
const useInView = (threshold = 0.25) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
};

const STATEMENT =
    'We are creatives who are obsessed with crafting stories that offer powerful impact — combining cinematic direction with purposeful storytelling.';

const AboutSection = () => {
    const [rootRef, inView] = useInView(0.2);
    const words = STATEMENT.split(' ');

    return (
        <div className="as-root" ref={rootRef}>
            <style>{ABOUT_CSS}</style>

            <div className="as-inner">

                {/* ── Top micro-label ── */}
                <div className={`as-label ${inView ? 'as-label-in' : ''}`}>
                    <span className="as-label-line" />
                    <span className="as-label-text">Who We Are</span>
                </div>

                {/* ── Animated statement ── */}
                <p className="as-statement">
                    {words.map((word, i) => (
                        <span key={i} className="as-word-mask">
                            <span
                                className="as-word"
                                style={{
                                    transitionDelay: inView ? `${0.04 * i + 0.1}s` : '0s',
                                    transform: inView ? 'translateY(0) skewY(0deg)' : 'translateY(110%) skewY(4deg)',
                                    opacity: inView ? 1 : 0,
                                }}
                            >
                                {word}
                            </span>
                        </span>
                    ))}
                </p>

                {/* ── Animated rule ── */}
                <div className={`as-hr ${inView ? 'as-hr-in' : ''}`} />

                {/* ── Bottom row: link + disciplines ── */}
                <div className={`as-bottom ${inView ? 'as-bottom-in' : ''}`}>
                    <a href="/about" className="as-link">
                        Learn More
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>

                </div>
            </div>
        </div>
    );
};

const ABOUT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap');

.as-root {
    background: #0a0a0a;
    padding: 7rem 2rem 7rem;
    position: relative;
    overflow: hidden;
}
/* faint grid lines echoing the hero grid */
.as-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 100% 80px;
    pointer-events: none;
}
.as-inner {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

/* ── Label ── */
.as-label {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateX(-16px);
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.as-label-in {
    opacity: 1;
    transform: translateX(0);
}
.as-label-line {
    display: block;
    width: 32px;
    height: 1px;
    background: rgba(255,255,255,0.3);
}
.as-label-text {
    font-family: 'Outfit', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.38);
}

/* ── Statement ── */
.as-statement {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.9rem, 4.5vw, 3.4rem);
    font-weight: 300;
    line-height: 1.25;
    letter-spacing: -0.025em;
    color: rgba(255,255,255,0.92);
    margin: 0 0 3.5rem;
    /* inline-flex wrapping for word masks */
    display: flex;
    flex-wrap: wrap;
    gap: 0 0.35em;
    row-gap: 0.15em;
}
.as-word-mask {
    display: inline-block;
    overflow: hidden;
    /* vertical crop for the sliding word */
    line-height: 1.3;
}
.as-word {
    display: inline-block;
    transition: transform 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.55s ease;
}

/* ── Horizontal rule ── */
.as-hr {
    height: 1px;
    background: rgba(255,255,255,0.08);
    position: relative;
    margin-bottom: 2.5rem;
    overflow: hidden;
}
.as-hr::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
    transform: translateX(-100%);
    transition: transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s;
}
.as-hr-in::after {
    transform: translateX(100%);
}

/* ── Bottom row ── */
.as-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.5rem;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.8s ease 0.9s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s;
}
.as-bottom-in {
    opacity: 1;
    transform: translateY(0);
}
.as-link {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: 'Outfit', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding-bottom: 3px;
    transition: color 0.25s ease, border-color 0.25s ease, gap 0.25s ease;
}
.as-link:hover {
    color: #fff;
    border-color: #fff;
    gap: 0.85rem;
}
.as-link svg { flex-shrink: 0; transition: transform 0.3s ease; }
.as-link:hover svg { transform: translateX(4px); }

.as-disciplines {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
}
.as-discipline {
    font-family: 'Outfit', sans-serif;
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 0.35rem 0.8rem;
    border-radius: 100px;
    transition: color 0.25s, border-color 0.25s;
}
.as-discipline:hover {
    color: rgba(255,255,255,0.7);
    border-color: rgba(255,255,255,0.3);
}

@media (max-width: 768px) {
    .as-root { padding: 5rem 1.5rem 5rem; }
    .as-statement { font-size: clamp(1.5rem, 6vw, 2.2rem); row-gap: 0.1em; }
    .as-bottom { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
    .as-root { padding: 4rem 1.2rem 4rem; }
    .as-statement { font-size: clamp(1.3rem, 7vw, 1.8rem); }
    .as-disciplines { display: none; }
}
`;


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
                <Works />
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
                <Works />
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
                <Works />
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
                <Works />
            </ScrollExpandMedia>
        </div>
    );
};
const Demo = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
            {/* ── Grand Hero: Kinetic Velocity Grid ── */}
            <HeroFilmsSection />

            {/* ── Connecting seam: sweeping rule + service marquee ── */}
            <HeroSeam />

            {/* ── Who We Are: word-reveal manifesto ── */}
            <AboutSection />

            {/* ── Works sections ── */}
            <Works />
        </div>
    );
};

export default Demo;




