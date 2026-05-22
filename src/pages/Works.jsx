import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import CurtainIntro from '../components/CurtainIntro';
import './Works.css';

/* ─── Art sections — exact Canva layout ───────── */
const artSections = [
    {
        id: 'photoshoot',
        layout: 'photoshoot',
        title: 'Photoshoot',
        body: 'We stage and execute brand photoshoots at a standard that holds its own alongside category leaders. Working across lifestyle, product, and portrait formats, each shoot is built around a creative brief that ensures the imagery is purposeful, consistent, and ready to perform across every channel.',
        divider: 'solid',
        photos: [
            { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/imagehv.png', caption: 'Maharani Silks' },
            { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/image.png?updatedAt=1779371627653', caption: 'Glowyoung' },
        ],
    },
    {
        id: 'designs',
        layout: 'designs',
        title: 'Designs',
        subtitle: 'Print & Out-of-Home:',
        body: 'From full-scale hoardings to metro pillar installations and magazine placements, we produce OOH print work built for impact at every size. Every format is designed with a provoking thought, starting with how it will actually be seen \u2014 in light, in motion, at a distance \u2014 so the work doesn\'t just fill a space, it owns it. Because outdoor is the only medium that doesn\'t ask for attention, it takes it. There are no skip buttons, no scroll, no algorithm deciding who sees it. Just the work, in the world, earning its place.',
        divider: 'dotted',
        photos: [
            { src: '/images/design_billboard_1.png' },
            { src: '/images/design_billboard_2.png' },
            { src: '/images/design_billboard_3.png' },
        ],
    },
    {
        id: 'campaigns',
        layout: 'campaigns',
        title: 'Campaigns and Case Studies',
        divider: 'dotted',
        caseStudies: [
            {
                id: 'therefor',
                fullWidth: true,
                image: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/imageyou.png?updatedAt=1779389049738',
                caption: 'You Decide You (Therefor I\'m)',
                body: 'A campaign built on a single conviction: identity is self-determined. Not assigned by society, not inherited by expectation. This campaign by the brand Therefor I\'m was focused on giving people the language and the imagery to claim that, on their own terms.',
            },
            {
                id: 'maharani',
                fullWidth: false,
                image: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/1.jpg',
                caption: 'Manam Naraye Onakodi (Maharani Silks)',
                body: 'A campaign for Maharani Silks centred around the spirit of Onam \u2014 not the product, but the feeling of coming together. The campaign generated significant visibility across the region and marked a turning point in establishing Maharani Silks as a household name in Kerala, and a huge campaign success for the brand.',
            },
        ],
    },
    {
        id: 'logo-design',
        layout: 'logo-design',
        label: 'Logo unit Design',
        body: 'Some logos carry decades. Others launch them. We work across both, refining legacy identities that have earned their authority over time, and building new marks from scratch for products that need to own a space the moment they enter it. Every logo we create is designed to be immediately legible, endlessly versatile, and impossible to mistake for anything else.',
        divider: 'dotted',
        logos: [
            { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/image.png', alt: 'Logo 1' },
            { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/bellaro.png?updatedAt=1779387321894', alt: 'Logo 2' },
            { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/aryas.png?updatedAt=1779387372441', alt: 'Logo 3' },
            { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/carla.png?updatedAt=1779387403117', alt: 'Logo 4' },
        ],
    },
    {
        id: 'packaging',
        layout: 'packaging',
        label: 'Product Package Designs',
        body: 'A product\'s packaging is its first salesperson. We design with that weight in mind \u2014 every label, every bottle, every box considered from the perspective of the person picking it up for the first time. From oil bottles with semi-transparent covers that make quality visible before a word is read, to sunscreen ranges built around a clean and confident shelf presence, the work is always in service of one thing: making the product impossible to put back down.',
        divider: 'solid',
        photos: [
            { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/aryas.png' },
            { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/crad.png' },
            { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/bm.png' },
        ],
    },
    {
        id: 'brand-identity',
        layout: 'brand-identity',
        label: 'Brand Identity Designing',
        body: 'Identity doesn\'t stop at a logo. It lives on the side of a vehicle, on a hoarding at a junction, under an umbrella at an event. We build visual systems designed to travel, coherent across every surface, every format, every context. So that wherever the brand appears, it\'s recognised. And wherever it\'s recognised, it\'s trusted.',
        divider: 'none',
        photo: { src: 'https://ik.imagekit.io/r70knk9pu/William%20Tell/brand.png?updatedAt=1779388901021' },
    },
];

/* ─── All videos — flat, ordered as on YouTube channel ─── */
const allVideos = [
    { youtubeId: '7zEUImqBxLY' },   // Kalyan silks onam ad
    { youtubeId: '3-1PyFj1h7Y' },   // kalidas jayaram salve maria ad
    { youtubeId: 'Kkb-ogpelIo' },   // jayaram kalidas salve maria ad
    { youtubeId: 'H9FNmeSnbQY' },   // jayaram kalidas salve maria ad
    { youtubeId: 'vdDbyddtEsE' },   // KALYAN ADI SALE AD
    { youtubeId: 'MWepSouX1Es' },   // THEREFORE I'M ad film
    { youtubeId: 'ubRXxLr08rY' },   // THEREFORE I'M ad film
    { youtubeId: 'ON3CbgeviSs' },   // Fazyo fashion film
    { youtubeId: 'aSxR-I_OG1A' },   // Fazyo fashion films
    { youtubeId: '6TcIzK_E4lQ' },   // maharani silks onam ad
    { youtubeId: 'NL9Wl0jAfM8' },   // salve maria ad
    { youtubeId: 'fLrw2V4N_Vs' },   // salve maria ad film
    { youtubeId: 'oJrqi2bThJs' },   // THEREFORE I'M AD FILM
    { youtubeId: '86cB9Vm5QRQ' },   // thereforeI'm ad film
    { youtubeId: 'Kv-zKigB9kY' },   // maharani silks ad
    { youtubeId: 'hSU-_Gz_QGQ' },   // Fazyo fashion film street
    { youtubeId: 'GXlg5S4ASgs' },
    { youtubeId: '9iCMhKNMBbE' },   // cadbury thank you campaign
    { youtubeId: 'Bba2IMvh3dc' },
    { youtubeId: 'RfCXTA15bno' },   // fazyo fashion film cafe
    { youtubeId: 'en-z_aTVn30' },   // fazyo fashion film beach
    { youtubeId: 'POX8SAX_eVQ' },   // fazyo fashion film
    { youtubeId: 'B5dLCHgC21Q' },   // fazyo fashion film
    { youtubeId: 'RoUvFpiaRro' },   // fazyo fashion film
    { youtubeId: 'pY4sQVsJC3I' },   // fashion film for fazyo
    { youtubeId: 'MUVOx9CezRo' },   // fazyo fashion film
    { youtubeId: 'e3H9h1nmV0g' },   // fazyo fashion film
    { youtubeId: 'OqWaih22a-c' },
    { youtubeId: 'X30KBVV9k4I' },
    { youtubeId: 'ri3ylqx8xYQ' },
    { youtubeId: 'XNgy1CugdwI' },
    { youtubeId: 'qJ2JaafaTWE' },
    { youtubeId: 'f051D_Hg-BM' },
    { youtubeId: 'kuZgNuNMAxE' },   // fazyo teaser
    { youtubeId: '4svjw9bicV0' },
    { youtubeId: '5lVBuUxjNZA' },
];

/* ─── Video Titles Map ─────────────────────────── */
const YT_VIDEO_TITLES = {
  "7zEUImqBxLY": "Kalyan silks onam ad",
  "3-1PyFj1h7Y": "kalidas jayaram salve maria ad",
  "Kkb-ogpelIo": "jayaram kalidas salve maria ad",
  "H9FNmeSnbQY": "jayaram kalidas salve maria ad",
  "vdDbyddtEsE": "KALYAN ADI SALE AD",
  "MWepSouX1Es": "THEREFORE I'M ad film",
  "ubRXxLr08rY": "THEREFORE I'M ad film",
  "ON3CbgeviSs": "Fazyo fashion film",
  "aSxR-I_OG1A": "Fazyo fashion films",
  "6TcIzK_E4lQ": "carla Commercial",
  "NL9Wl0jAfM8": "salve maria ad",
  "fLrw2V4N_Vs": "salve maria ad film",
  "oJrqi2bThJs": "THEREFORE I'M AD FILM",
  "86cB9Vm5QRQ": "thereforeI'm ad film",
  "Kv-zKigB9kY": "maharani onam film",
  "hSU-_Gz_QGQ": "Fazyo fashion film street",
  "GXlg5S4ASgs": "nila soap digital ad film",
  "9iCMhKNMBbE": "cadbury thank you campaign",
  "Bba2IMvh3dc": "nila ayurveda soap arabic",
  "RfCXTA15bno": "fazyo fashion film cafe",
  "en-z_aTVn30": "fazyo fashion film beach",
  "POX8SAX_eVQ": "fazyo fashion film",
  "B5dLCHgC21Q": "fazyo fashion film",
  "RoUvFpiaRro": "fazyo fashion film",
  "pY4sQVsJC3I": "fashion film for fazyo",
  "MUVOx9CezRo": "fazyo fashion film",
  "e3H9h1nmV0g": "fazyo fashion film",
  "OqWaih22a-c": "nila cream digital film",
  "X30KBVV9k4I": "LDF election campaign film",
  "ri3ylqx8xYQ": "oxygen student laptop digital film",
  "XNgy1CugdwI": "myG kannur launch film",
  "qJ2JaafaTWE": "YSR congress ad film",
  "f051D_Hg-BM": "YSR congress ad film",
  "kuZgNuNMAxE": "fazyo teaser",
  "4svjw9bicV0": "showreel 2019",
  "5lVBuUxjNZA": "cadbury ad"
};

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
                    className={`yt-thumb ${YT_THUMB_QUALITIES[thumbQualityIdx] === 'hqdefault' ? 'hq-crop' : ''}`}
                    src={thumbSrc}
                    alt=""
                    loading="lazy"
                    onLoad={handleThumbLoad}
                    onError={handleThumbError}
                />
            </div>
            <div className="work-card-title">
                {YT_VIDEO_TITLES[video.youtubeId] || "William Tell Film"}
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

/* ─── Art Section — exact Canva layout ─── */
function ArtSection() {
    return (
        <div className="ca-wrap">
            {artSections.map((sec) => (
                <motion.div
                    key={sec.id}
                    className={`ca-block ${sec.divider !== 'none' ? `ca-div-${sec.divider}` : ''}`}
                    style={sec.layout === 'logo-design' ? { paddingLeft: 0, paddingRight: 0 } : {}}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* 1. PHOTOSHOOT — title left, full-width body, 2-col images + captions */}
                    {sec.layout === 'photoshoot' && (<>
                        <h2 className="ca-title ca-title-left">{sec.title}</h2>
                        <p className="ca-body ca-body-full">{sec.body}</p>
                        <div className="ca-photo-row">
                            {sec.photos.map((p, i) => (
                                <div key={i} className="ca-photo-cell">
                                    <img src={p.src} alt={p.caption} loading="lazy" className="ca-img" />
                                    {p.caption && <p className="ca-caption ca-caption-center">{p.caption}</p>}
                                </div>
                            ))}
                        </div>
                    </>)}

                    {/* 2. DESIGNS — title+subtitle right, text left 48%, images right 48% */}
                    {sec.layout === 'designs' && (<>
                        <div className="ca-title-blk ca-title-blk-right">
                            <h2 className="ca-title ca-title-right">{sec.title}</h2>
                            {sec.subtitle && <p className="ca-label">{sec.subtitle}</p>}
                        </div>
                        <div className="ca-cols ca-cols-designs">
                            <div className="ca-col-text">
                                <p className="ca-body">{sec.body}</p>
                            </div>
                            <div className="ca-col-imgs">
                                {sec.photos.map((p, i) => (
                                    <div key={i} className="ca-img-cell">
                                        <img src={p.src} alt={sec.title} loading="lazy" className="ca-img" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>)}

                    {/* 3. CAMPAIGNS — centered title, full-width first case, split second case */}
                    {sec.layout === 'campaigns' && (<>
                        <h2 className="ca-title ca-title-center">{sec.title}</h2>
                        {sec.caseStudies.map((cs, ci) => (
                            <motion.div
                                key={cs.id}
                                className={`ca-case ${cs.fullWidth ? 'ca-case-full' : 'ca-case-split'}`}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.7, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {cs.fullWidth ? (<>
                                    <img src={cs.image} alt={cs.caption} loading="lazy" className="ca-img ca-img-wide" />
                                    <p className="ca-caption ca-caption-left ca-caption-accent">{cs.caption}</p>
                                    <p className="ca-body ca-body-full">{cs.body}</p>
                                </>) : (
                                    <div className="ca-cols ca-cols-case">
                                        <div className="ca-col-img-left">
                                            <img src={cs.image} alt={cs.caption} loading="lazy" className="ca-img" />
                                        </div>
                                        <div className="ca-col-text-right">
                                            <p className="ca-body">{cs.body}</p>
                                            <p className="ca-caption ca-caption-left ca-caption-bottom">{cs.caption}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </>)}

                    {/* 4. LOGO UNIT DESIGN — full-viewport 2×2 grid, label + body indented */}
                    {sec.layout === 'logo-design' && (<>
                        <div className="ca-logo-grid">
                            {sec.logos.map((logo, li) => (
                                <div key={li} className="ca-logo-cell">
                                    <img src={logo.src} alt={logo.alt} loading="lazy" className="ca-logo-img" />
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: '0 5%' }}>
                            <p className="ca-label ca-label-grid" style={{ padding: 0 }}>{sec.label}</p>
                            <p className="ca-body ca-body-full">{sec.body}</p>
                        </div>
                    </>)}

                    {/* 5. PACKAGING — images left 42%, label+body right 53% */}
                    {sec.layout === 'packaging' && (
                        <div className="ca-cols ca-cols-pkg">
                            <div className="ca-col-imgs">
                                {sec.photos.map((p, i) => (
                                    <div key={i} className="ca-img-cell">
                                        <img src={p.src} alt={sec.label} loading="lazy" className="ca-img" />
                                    </div>
                                ))}
                            </div>
                            <div className="ca-col-text">
                                <p className="ca-label">{sec.label}</p>
                                <p className="ca-body">{sec.body}</p>
                            </div>
                        </div>
                    )}

                    {/* 6. BRAND IDENTITY — body left 48%, image+label right 48% */}
                    {sec.layout === 'brand-identity' && (
                        <div className="ca-cols ca-cols-brand">
                            <div className="ca-col-text">
                                <p className="ca-body">{sec.body}</p>
                            </div>
                            <div className="ca-col-img-right">
                                <img src={sec.photo.src} alt={sec.label} loading="lazy" className="ca-img" />
                                <p className="ca-caption ca-caption-left">{sec.label}</p>
                            </div>
                        </div>
                    )}

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
                                                        — Elevating brands through cinematic storytelling.
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
