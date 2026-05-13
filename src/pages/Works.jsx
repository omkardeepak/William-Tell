import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import CurtainIntro from '../components/CurtainIntro';
import './Works.css';

/* ─── Art subsections ─────────────────────────────── */
// Flat array of image-card rows. Main titles only appear on the first
// card of each section. Subheadings are de-prioritised inside the body.
const artSubsections = [
    {
        id: 'photography',
        title: 'Photography', // Main title
        heading: null,
        text: 'We stage and execute brand photoshoots at a standard that holds its own alongside category leaders. Working across lifestyle, product, and portrait formats, each shoot is built around a creative brief that ensures the imagery is purposeful, consistent, and ready to perform across every channel.',
        image: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/image.png',
        images: null,
    },
    {
        id: 'design-print',
        title: 'Design', // Main title
        heading: 'Print & Out-of-Home',
        text: 'From full-scale hoardings to metro pillar installations and magazine placements, we produce OOH work built for impact at every size.',
        image: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/2.jpg',
        images: null,
    },
    {
        id: 'design-logo',
        title: null, // No main title
        heading: 'Logo, Brand Identity & Package Designing',
        text: 'From original logos and full-scale rebranding to packaging design for oil labels, water bottles, cosmetic containers, and product boxes, we create visual identities that makes a brand stand out and be unignorable.',
        image: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/4.jpg',
        images: null,
    },
    {
        id: 'design-social',
        title: null, // No main title
        heading: 'Social Media',
        text: 'We create and manage scroll-stopping content for brand pages — each post designed to serve a function, whether that is driving leads, building recognition, or deepening audience engagement.',
        image: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/3.jpg',
        images: null,
    },
    {
        id: 'campaign-therefor',
        title: 'Campaigns & Case Studies', // Main title
        heading: 'You Decide You — Therefor I\u2019m',
        text: 'A campaign built on a single conviction: identity is self-determined. Not assigned by society, not inherited by expectation.',
        image: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/image.png?updatedAt=1778592997608',
        images: null,
    },
    {
        id: 'campaign-maharani',
        title: null, // No main title
        heading: 'Manam Naraye Onakodi — Maharani Silks',
        text: 'A campaign centred around the spirit of Onam — not the product, but the feeling of coming together. It marked a turning point in establishing Maharani Silks as a household name in Kerala.',
        image: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/1.jpg',
        images: null,
    },
];

/* ─── All videos — flat, ordered as on YouTube channel ─── */
const allVideos = [
    { youtubeId: '3-1PyFj1h7Y' },
    { youtubeId: 'Kkb-ogpelIo' },
    { youtubeId: 'H9FNmeSnbQY' },
    { youtubeId: 'NL9Wl0jAfM8' },
    { youtubeId: 'fLrw2V4N_Vs' },
    { youtubeId: '7zEUImqBxLY' },
    { youtubeId: 'vdDbyddtEsE' },
    { youtubeId: 'ON3CbgeviSs' },
    { youtubeId: 'aSxR-I_OG1A' },
    { youtubeId: 'hSU-_Gz_QGQ' },
    { youtubeId: 'RfCXTA15bno' },
    { youtubeId: 'en-z_aTVn30' },
    { youtubeId: 'POX8SAX_eVQ' },
    { youtubeId: 'B5dLCHgC21Q' },
    { youtubeId: 'RoUvFpiaRro' },
    { youtubeId: 'pY4sQVsJC3I' },
    { youtubeId: 'MUVOx9CezRo' },
    { youtubeId: 'e3H9h1nmV0g' },
    { youtubeId: 'kuZgNuNMAxE' },
    { youtubeId: 'MWepSouX1Es' },
    { youtubeId: 'ubRXxLr08rY' },
    { youtubeId: 'oJrqi2bThJs' },
    { youtubeId: '86cB9Vm5QRQ' },
    { youtubeId: '9iCMhKNMBbE' },
    { youtubeId: '5lVBuUxjNZA' },
    { youtubeId: 'XNgy1CugdwI' },
    { youtubeId: 'Kv-zKigB9kY' },
    { youtubeId: '6TcIzK_E4lQ' },
    { youtubeId: 'ri3ylqx8xYQ' },
    { youtubeId: 'X30KBVV9k4I' },
    { youtubeId: 'GXlg5S4ASgs' },
    { youtubeId: 'Bba2IMvh3dc' },
    { youtubeId: 'OqWaih22a-c' },
    { youtubeId: 'qJ2JaafaTWE' },
    { youtubeId: 'f051D_Hg-BM' },
    { youtubeId: '4svjw9bicV0' },
];

/* ─── Thumbnail quality fallback ────────────────── */
const YT_THUMB_QUALITIES = ['maxresdefault', 'hqdefault', 'mqdefault'];
const YT_STUB_WIDTH = 120;

/* ─── Fullscreen Video Modal ─────────────────────── */
function VideoModal({ video, onClose }) {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    // Portal renders at document.body — escapes all Framer Motion transform
    // ancestors so position:fixed works correctly and the iframe never reloads.
    return createPortal(
        <div className="film-modal-backdrop" onClick={onClose}>
            <div
                className="film-modal-frame"
                onClick={(e) => e.stopPropagation()}
            >
                <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1&fs=1`}
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen={true}
                    frameBorder="0"
                    title="Video"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                />
            </div>
            <button className="film-modal-close" onClick={onClose} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>,
        document.body
    );
}

/* ─── Thumbnail-only Video Card ──────────────────── */
function VideoCard({ video, index = 0, onPlay }) {
    const [thumbQualityIdx, setThumbQualityIdx] = useState(0);
    const thumbSrc = `https://img.youtube.com/vi/${video.youtubeId}/${YT_THUMB_QUALITIES[thumbQualityIdx]}.jpg`;

    const handleThumbLoad = (e) => {
        if (e.target.naturalWidth <= YT_STUB_WIDTH && thumbQualityIdx < YT_THUMB_QUALITIES.length - 1) {
            setThumbQualityIdx(prev => prev + 1);
        }
    };

    const handleThumbError = () => {
        if (thumbQualityIdx < YT_THUMB_QUALITIES.length - 1) {
            setThumbQualityIdx(prev => prev + 1);
        }
    };

    return (
        <motion.div
            className="work-card"
            onClick={() => onPlay(video)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: (index % 12) * 0.04, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="work-card-media">
                <img
                    className="yt-thumb"
                    src={thumbSrc}
                    alt=""
                    loading="lazy"
                    onLoad={handleThumbLoad}
                    onError={handleThumbError}
                />
                <div className="yt-play-overlay">
                    <div className="yt-play-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Flat Film Grid ─────────────────────────────── */
function FilmGrid() {
    const [activeVideo, setActiveVideo] = useState(null);
    // Stable reference so VideoModal's useEffect doesn't re-run on every render
    const handleClose = useCallback(() => setActiveVideo(null), []);
    return (
        <>
            {activeVideo && (
                <VideoModal video={activeVideo} onClose={handleClose} />
            )}
            <div className="films-flat-grid">
                {allVideos.map((video, i) => (
                    <VideoCard key={video.youtubeId} video={video} index={i} onPlay={setActiveVideo} />
                ))}
            </div>
        </>
    );
}

/* ─── Art Section — flat image-card rows ─────────── */
function ArtSection() {
    return (
        <div className="art-subsections-wrapper">
            {artSubsections.map((sub, i) => (
                <motion.div
                    key={sub.id}
                    className="art-subsection"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Left — Image */}
                    <div className="art-subsection-image">
                        {sub.images ? (
                            <div className="art-image-grid">
                                {sub.images.map((src, idx) => (
                                    <div key={idx} className="art-image-grid-cell">
                                        <img src={src} alt={`${sub.heading || sub.title} ${idx + 1}`} loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        ) : sub.image ? (
                            <img src={sub.image} alt={sub.heading || sub.title} loading="lazy" />
                        ) : (
                            <div className="art-image-placeholder">
                                <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="8" y="8" width="64" height="64" rx="6" />
                                    <circle cx="28" cy="30" r="7" />
                                    <path d="M8 56l18-18 14 14 10-10 22 22" strokeLinejoin="round" />
                                </svg>
                                <span>Image coming soon</span>
                            </div>
                        )}
                    </div>

                    {/* Right — Title + de-emphasised sub-items */}
                    <div className="art-subsection-text">
                        {sub.title && (
                            <motion.h3
                                className="art-subsection-title"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.25 }}
                            >
                                {sub.title}
                            </motion.h3>
                        )}

                        <div className="art-subsection-body" style={{ marginTop: sub.title ? '1.2rem' : '0' }}>
                            <motion.div
                                className="art-body-item"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.35 }}
                            >
                                {sub.heading && (
                                    <span className="art-body-heading">{sub.heading}</span>
                                )}
                                <p className="art-body-text">{sub.text}</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ─── Main Works Page ────────────────────────────── */
export default function Works({ compact = false }) {
    const location = useLocation();
    const [expandedSection, setExpandedSection] = useState(location.state?.expandSection || null);
    const containerRefs = useRef({});
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start top", "end top"]
    });

    // Apply smooth spring physics to the scroll value
    const smoothScrollY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const filmX = useTransform(smoothScrollY, [0, 1], [0, -800]);

    useEffect(() => {
        if (location.state?.expandSection) {
            setExpandedSection(location.state.expandSection);

            // Wait for curtain intro (~1s) + accordion AnimatePresence expansion (~0.6s)
            setTimeout(() => {
                const el = containerRefs.current[location.state.expandSection];
                if (el) {
                    // Scroll so the accordion CONTENT (below the header) is at top of viewport
                    const headerHeight = el.querySelector('.works-accordion-header')?.offsetHeight || 0;
                    const elementPosition = el.getBoundingClientRect().top + window.scrollY + headerHeight;
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                }
            }, 1200);
        }
    }, [location.state]);

    // Listen for hero "View All Films" button — expand + scroll without navigation
    useEffect(() => {
        const handler = (e) => {
            const section = e.detail;
            setExpandedSection(section);
            // Wait for accordion AnimatePresence to finish expanding (0.6s transition)
            setTimeout(() => {
                const el = containerRefs.current[section];
                if (el) {
                    const headerHeight = el.querySelector('.works-accordion-header')?.offsetHeight || 0;
                    const pos = el.getBoundingClientRect().top + window.scrollY + headerHeight;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            }, 700);
        };
        window.addEventListener('wt:expandSection', handler);
        return () => window.removeEventListener('wt:expandSection', handler);
    }, []);

    const sections = [
        { id: 'film', title: 'FILM' },
        { id: 'art', title: 'ART' },
    ];

    const handleSectionClick = (id) => {
        const isExpanding = expandedSection !== id;
        // Track whether we're switching from one open section to another
        const wasSwitching = expandedSection !== null && expandedSection !== id;

        setExpandedSection(isExpanding ? id : null);

        if (isExpanding) {
            // If switching, wait for the previous section's collapse animation (0.6s)
            // before measuring the new section's position — prevents overshoot to footer
            const delay = wasSwitching ? 700 : 150;
            setTimeout(() => {
                if (containerRefs.current[id]) {
                    const navOffset = 80;
                    const elementPosition = containerRefs.current[id].getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - navOffset,
                        behavior: 'smooth'
                    });
                }
            }, delay);
        }
    };

    return (
        <div className="works-page" id="works">
            {/* Cinematic curtain intro */}
            <CurtainIntro />

            {/* ── HERO HEADING ─────────────────────── */}
            <section ref={heroRef} className={`works-hero ${compact ? 'compact-hero' : ''}`}>
                <motion.div
                    className="works-hero-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >


                    <motion.h1
                        className="works-headline"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 1.1,
                                },
                            },
                        }}
                    >
                        <span className="hero-line-mask">
                            <motion.span
                                className="hero-line"
                                variants={{
                                    hidden: { y: '105%', rotate: 2 },
                                    visible: {
                                        y: 0,
                                        rotate: 0,
                                        transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                                    }
                                }}
                            >
                                OUR
                            </motion.span>
                        </span>
                        <span className="hero-line-mask">
                            <motion.em
                                className="hero-line wh-accent"
                                variants={{
                                    hidden: { y: '105%', rotate: 2 },
                                    visible: {
                                        y: 0,
                                        rotate: 0,
                                        transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                                    }
                                }}
                            >
                                WORKS.
                            </motion.em>
                        </span>
                    </motion.h1>

                    <motion.div
                        className="works-hero-nav"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                    >
                        {sections.map((sec) => (
                            <motion.button
                                key={sec.id}
                                className={`works-hero-nav-item ${expandedSection === sec.id ? 'active' : ''}`}
                                onClick={() => handleSectionClick(sec.id)}
                                style={sec.id === 'film' ? { x: filmX } : {}}
                            >
                                {sec.title}
                            </motion.button>
                        ))}
                    </motion.div>

                    <div className="works-hero-sub">
                        <motion.p className="wh-sub-right" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.5 }}>
                            CRAFTING STORIES THROUGH ART
                        </motion.p>
                    </div>
                </motion.div>

            </section>

            {/* ── SECTIONS ACCORDION ──────────────────── */}
            <div className="works-accordion-container">
                {sections.map((sec) => (
                    <div
                        key={sec.id}
                        ref={(el) => (containerRefs.current[sec.id] = el)}
                        className={`works-accordion-item ${expandedSection === sec.id ? 'is-expanded' : ''}`}
                    >
                        <div
                            className="works-accordion-header"
                            onClick={() => handleSectionClick(sec.id)}
                        >
                            <h2 className="works-accordion-title">{sec.title}</h2>
                            <span className="works-accordion-icon text-[10px]">
                                {expandedSection === sec.id ? '=' : '='}
                            </span>
                        </div>

                        <AnimatePresence>
                            {expandedSection === sec.id && (
                                <motion.div
                                    className="works-accordion-content"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="works-accordion-inner">
                                        {sec.id === 'film' && (
                                            <>
                                                <div className="works-section-label" style={{ borderBottom: 'none', paddingLeft: 0, paddingTop: 0 }}>
                                                    <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                                                        Elevating brands through cinematic storytelling.
                                                    </motion.span>
                                                </div>
                                                <div className="works-groups-container">
                                                    <FilmGrid />
                                                </div>
                                            </>
                                        )}
                                        {sec.id === 'art' && (
                                            <div className="works-gallery-section" style={{ paddingBottom: '4rem' }}>
                                                <div className="works-section-label" style={{ borderBottom: 'none', paddingLeft: 0, paddingTop: 0 }}>
                                                    <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                                                        — Photography &nbsp;&nbsp; Design &nbsp;&nbsp; Campaign &nbsp;&nbsp; Case Studies
                                                    </motion.span>
                                                </div>
                                                <ArtSection />
                                            </div>
                                        )}

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
