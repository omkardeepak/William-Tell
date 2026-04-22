import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import CurtainIntro from '../components/CurtainIntro';
import './Works.css';

/* ─── Arts Data — per-brand ─────────────────────── */
const artBrands = [
    {
        id: 'fazyo',
        brand: 'Fazyo',
        photos: [
            { id: 1, src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/fazyo1.jpeg?updatedAt=1776871723302" },
            { id: 2, src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/fazyo2.jpeg?updatedAt=1776871767341" },
            { id: 3, src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/fazyo3.jpeg?updatedAt=1776871787705" },
            { id: 4, src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/fazyo4.png?updatedAt=1776871823745" },
        ],
    },
    {
        id: 'glow-young',
        brand: 'Glow Young',
        photos: [
            { id: 5, src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/glowyoung1.jpeg?updatedAt=1776871645959" },
            { id: 6, src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/glowyoung2.jpeg?updatedAt=1776871679527" },

        ],
    },
    {
        id: 'maharani',
        brand: 'Maharani',
        photos: [
            { id: 9, src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(3).png?updatedAt=1773335721606" },

        ],
    },
];

/* ─── All videos grouped by brand / project ─────── */
const videoGroups = [
    {
        group: 'Salve Maria',
        category: 'Ad Film',
        videos: [
            { youtubeId: '3-1PyFj1h7Y', title: 'Kalidas Jayaram — Salve Maria' },
            { youtubeId: 'Kkb-ogpelIo', title: 'Jayaram Kalidas — Salve Maria' },
            { youtubeId: 'H9FNmeSnbQY', title: 'Jayaram Kalidas — Salve Maria' },
            { youtubeId: 'NL9Wl0jAfM8', title: 'Salve Maria Ad' },
            { youtubeId: 'fLrw2V4N_Vs', title: 'Salve Maria Ad Film' },
        ],
    },
    {
        group: 'Kalyan Silks',
        category: 'Brand Film',
        videos: [
            { youtubeId: '7zEUImqBxLY', title: 'Kalyan Silks Onam Ad' },
            { youtubeId: 'vdDbyddtEsE', title: 'Kalyan Adi Sale Ad' },
        ],
    },
    {
        group: 'Fazyo',
        category: 'Fashion Film',
        videos: [
            { youtubeId: 'ON3CbgeviSs', title: 'Fazyo Fashion Film' },
            { youtubeId: 'aSxR-I_OG1A', title: 'Fazyo Fashion Films' },
            { youtubeId: 'hSU-_Gz_QGQ', title: 'Fazyo — Street' },
            { youtubeId: 'RfCXTA15bno', title: 'Fazyo — Cafe' },
            { youtubeId: 'en-z_aTVn30', title: 'Fazyo — Beach' },
            { youtubeId: 'POX8SAX_eVQ', title: 'Fazyo Fashion Film' },
            { youtubeId: 'B5dLCHgC21Q', title: 'Fazyo Fashion Film' },
            { youtubeId: 'RoUvFpiaRro', title: 'Fazyo Fashion Film' },
            { youtubeId: 'pY4sQVsJC3I', title: 'Fashion Film for Fazyo' },
            { youtubeId: 'MUVOx9CezRo', title: 'Fazyo Fashion Film' },
            { youtubeId: 'e3H9h1nmV0g', title: 'Fazyo Fashion Film' },
            { youtubeId: 'kuZgNuNMAxE', title: 'Fazyo Teaser' },
        ],
    },
    {
        group: "Therefore I'm",
        category: 'Ad Film',
        videos: [
            { youtubeId: 'MWepSouX1Es', title: "THEREFORE I'M Ad Film" },
            { youtubeId: 'ubRXxLr08rY', title: "THEREFORE I'M Ad Film" },
            { youtubeId: 'oJrqi2bThJs', title: "THEREFORE I'M Ad Film" },
            { youtubeId: '86cB9Vm5QRQ', title: "Therefore I'm Ad Film" },
        ],
    },
    {
        group: 'Cadbury',
        category: 'Campaign',
        videos: [
            { youtubeId: '9iCMhKNMBbE', title: 'Cadbury Thank You Campaign' },
            { youtubeId: '5lVBuUxjNZA', title: 'Cadbury Ad' },
        ],
    },
    {
        group: 'myG',
        category: 'Launch Film',
        videos: [
            { youtubeId: 'XNgy1CugdwI', title: 'myG Kannur Launch Film' },
        ],
    },
    {
        group: 'Maharani',
        category: 'Onam Film',
        videos: [
            { youtubeId: 'Kv-zKigB9kY', title: 'Maharani Onam Film' },
        ],
    },
    {
        group: 'Carla',
        category: 'Commercial',
        videos: [
            { youtubeId: '6TcIzK_E4lQ', title: 'Carla Commercial' },
        ],
    },
    {
        group: 'Oxygen',
        category: 'Digital Film',
        videos: [
            { youtubeId: 'ri3ylqx8xYQ', title: 'Oxygen Student Laptop' },
        ],
    },
    {
        group: 'LDF',
        category: 'Campaign Film',
        videos: [
            { youtubeId: 'X30KBVV9k4I', title: 'LDF Election Campaign Film' },
        ],
    },
    {
        group: 'Nila',
        category: 'Digital Film',
        videos: [
            { youtubeId: 'GXlg5S4ASgs', title: 'Nila Soap Digital Ad' },
            { youtubeId: 'Bba2IMvh3dc', title: 'Nila Ayurveda — Arabic' },
            { youtubeId: 'OqWaih22a-c', title: 'Nila Cream Digital Film' },
        ],
    },
    {
        group: 'YSR Congress',
        category: 'Political Ad',
        videos: [
            { youtubeId: 'qJ2JaafaTWE', title: 'YSR Congress Ad Film' },
            { youtubeId: 'f051D_Hg-BM', title: 'YSR Congress Ad Film' },
        ],
    },
    {
        group: 'Showreel',
        category: 'Showreel',
        videos: [
            { youtubeId: '4svjw9bicV0', title: 'Showreel 2019' },
        ],
    },
];

/* ─── Playable Video Card ────────────────────────── */
function VideoCard({ video, index = 0 }) {
    const [playing, setPlaying] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    // Failsafe: drop the thumbnail cover after 1.2s even if YouTube's heavy onLoad hasn't fired yet
    useEffect(() => {
        if (playing) {
            const timer = setTimeout(() => setIframeLoaded(true), 1200);
            return () => clearTimeout(timer);
        }
    }, [playing]);

    return (
        <motion.div
            className="work-card"
            onClick={() => !playing && setPlaying(true)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            <div className="work-card-media">
                {playing && (
                    <iframe
                        className="yt-iframe"
                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=0&controls=1&showinfo=0`}
                        loading="lazy"
                        allow="autoplay; encrypted-media"
                        allowFullScreen={true}
                        frameBorder="0"
                        title={video.title}
                        onLoad={() => setIframeLoaded(true)}
                    />
                )}

                <div
                    className="yt-thumb-wrapper"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 5,
                        opacity: playing && iframeLoaded ? 0 : 1,
                        pointerEvents: playing && iframeLoaded ? 'none' : 'auto',
                        transition: 'opacity 0.8s ease-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#000'
                    }}
                >
                    <img
                        className="yt-thumb"
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        loading="lazy"
                    />
                    {!playing && (
                        <div className="yt-play-overlay">
                            <div className="yt-play-btn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Group Section: Uniform grid ───────────────── */
function GroupSection({ group }) {
    return (
        <motion.section
            className="works-group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="works-group-label">
                <h2 className="works-group-name">{group.group}</h2>
                <span className="works-group-category">{group.category}</span>
            </div>

            <div className="works-group-grid">
                {group.videos.map((video, i) => (
                    <VideoCard key={video.youtubeId} video={video} index={i} />
                ))}
            </div>
        </motion.section>
    );
}

/* ─── Per-Brand Folder Card ─────────────────────── */
function BrandFolderCard({ brandData, globalIndex }) {
    const [phase, setPhase] = useState('closed'); // closed | popped | list
    const [hasOpened, setHasOpened] = useState(false);

    const previewPhotos = brandData.photos.slice(0, 4);
    const popPositions = [
        { x: -80, y: -190 },
        { x: 80, y: -220 },
        { x: -30, y: -100 },
        { x: 55, y: -140 },
    ];

    const openFolder = () => {
        if (hasOpened) return;
        setHasOpened(true);
        setPhase('popped');
        setTimeout(() => setPhase('list'), 2400);
    };

    return (
        <motion.div
            className="brand-folder-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: globalIndex * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* ── Folder animation scene ── */}
            <AnimatePresence mode="wait">
                {phase !== 'list' ? (
                    <motion.div
                        key="folder-scene"
                        className="brand-folder-scene"
                        onClick={openFolder}
                        exit={{ opacity: 0, scale: 0.85, filter: 'blur(12px)', transition: { duration: 1.2 } }}
                    >
                        {/* Back panel */}
                        <div className="folder-back-wrap">
                            <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
                                <path
                                    d="M0 20C0 8.954 8.954 0 20 0H90L110 20H220C231.046 20 240 28.954 240 40V180H0V20Z"
                                    fill="rgba(255,255,255,0.03)"
                                    stroke="rgba(255,255,255,0.12)"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>

                        {/* Flying photos */}
                        <div className="folder-images-container">
                            {previewPhotos.map((photo, i) => {
                                const isPopped = phase === 'popped';
                                const pos = popPositions[i] || popPositions[0];
                                return (
                                    <motion.div
                                        key={`pop-${photo.id}`}
                                        layoutId={`art-brand-${brandData.id}-img-${photo.id}`}
                                        initial={{ y: 0, x: 0, opacity: 0, scale: 0.4 }}
                                        animate={{
                                            y: isPopped ? pos.y : 0,
                                            x: isPopped ? pos.x : 0,
                                            opacity: isPopped ? 1 : 0,
                                            scale: isPopped ? 1 : 0.4,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.35,
                                            duration: 1,
                                            delay: isPopped ? i * 0.14 : 0,
                                        }}
                                        className="folder-img-wrap"
                                    >
                                        <img src={photo.src} alt={brandData.brand} />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Front cover */}
                        <div className="folder-front-wrap">
                            <svg width="260" height="140" viewBox="0 0 260 140" fill="none">
                                <path
                                    d="M0 15C0 6.716 6.716 0 15 0H245C253.284 0 260 6.716 260 15V125C260 133.284 253.284 140 245 140H15C6.716 140 0 133.284 0 125V15Z"
                                    fill="rgba(255,255,255,0.07)"
                                    stroke="rgba(255,255,255,0.18)"
                                    strokeWidth="1.5"
                                />
                                <line x1="40" y1="42" x2="220" y2="42" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="40" y1="66" x2="220" y2="66" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="40" y1="90" x2="160" y2="90" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>

                        {/* Label */}
                        <div className="folder-label">
                            {brandData.brand}
                            <span>{brandData.photos.length} Photos</span>
                        </div>

                        {/* Click hint */}
                        {phase === 'closed' && (
                            <motion.div
                                className="folder-hint"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                Open
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    /* ── Expanded photo grid (small landscape) ── */
                    <motion.div
                        key="photo-list"
                        className="brand-photo-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {brandData.photos.map((photo, idx) => (
                            <motion.div
                                key={`list-${photo.id}`}
                                className="brand-photo-tile"
                                layoutId={`art-brand-${brandData.id}-img-${photo.id}`}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.7,
                                    delay: idx * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <img src={photo.src} alt={brandData.brand} loading="lazy" />
                                <span className="brand-photo-index">{String(idx + 1).padStart(2, '0')}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ─── Art Gallery — all brands ──────────────────── */
function ArtGalleryBrands() {
    return (
        <div className="art-brands-wrapper">
            {artBrands.map((brandData, i) => (
                <div key={brandData.id} className="art-brand-section">
                    {/* Brand header */}
                    <motion.div
                        className="art-brand-header"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h3 className="art-brand-name">{brandData.brand}</h3>
                        <span className="art-brand-category">{brandData.category}</span>
                    </motion.div>

                    {/* Folder + photos */}
                    <BrandFolderCard brandData={brandData} globalIndex={i} />
                </div>
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
                                                    {videoGroups.map((group, i) => (
                                                        <GroupSection key={group.group} group={group} index={i} />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        {sec.id === 'art' && (
                                            <div className="works-gallery-section" style={{ paddingBottom: '4rem' }}>
                                                <div className="works-section-label" style={{ borderBottom: 'none', paddingLeft: 0, paddingTop: 0 }}>
                                                    <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                                                        — Creative Direction &nbsp;&nbsp; Curation &nbsp;&nbsp; Visual Arts
                                                    </motion.span>
                                                </div>
                                                <ArtGalleryBrands />
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
