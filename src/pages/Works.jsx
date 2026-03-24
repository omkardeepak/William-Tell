import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './Works.css';

/* ─── All videos grouped by brand / project ─────── */
const videoGroups = [
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
        group: 'Kalyan Silks',
        category: 'Brand Film',
        videos: [
            { youtubeId: '7zEUImqBxLY', title: 'Kalyan Silks Onam Ad' },
            { youtubeId: 'vdDbyddtEsE', title: 'Kalyan Adi Sale Ad' },
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
        group: 'Cadbury',
        category: 'Campaign',
        videos: [
            { youtubeId: '9iCMhKNMBbE', title: 'Cadbury Thank You Campaign' },
            { youtubeId: '5lVBuUxjNZA', title: 'Cadbury Ad' },
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
        group: 'LDF',
        category: 'Campaign Film',
        videos: [
            { youtubeId: 'X30KBVV9k4I', title: 'LDF Election Campaign Film' },
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
        group: 'myG',
        category: 'Launch Film',
        videos: [
            { youtubeId: 'XNgy1CugdwI', title: 'myG Kannur Launch Film' },
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
function VideoCard({ video, className = '', isFeatured = false, index = 0 }) {
    const [playing, setPlaying] = useState(isFeatured);

    return (
        <motion.div 
            className={`work-card ${className}`} 
            onClick={() => !playing && setPlaying(true)}
            initial={{ opacity: 0, x: isFeatured ? 0 : 40, y: isFeatured ? 30 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: isFeatured ? '-60px' : '-20px' }}
            transition={{
                duration: 0.6,
                delay: isFeatured ? 0.3 : index * 0.08,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            <div className="work-card-media">
                {playing ? (
                    <>
                        <iframe
                            className="yt-iframe"
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=${isFeatured ? 1 : 0}&loop=${isFeatured ? 1 : 0}&playlist=${video.youtubeId}&rel=0&modestbranding=1&controls=${isFeatured ? 0 : 1}&showinfo=0`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen={!isFeatured}
                            frameBorder="0"
                            title={video.title}
                            style={isFeatured ? { pointerEvents: 'none' } : {}}
                        />
                        {isFeatured && <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'transparent' }} />}
                    </>
                ) : (
                    <>
                        <img
                            className="yt-thumb"
                            src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                            alt={video.title}
                            loading="lazy"
                        />
                        <div className="yt-play-overlay">
                            <div className="yt-play-btn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="work-card-info">
                <span className="work-card-title">{video.title}</span>
            </div>
        </motion.div>
    );
}

/* ─── Group Section: Featured hero + row below ───── */
function GroupSection({ group, index }) {
    const featured = group.videos[0];
    const rest = group.videos.slice(1);
    const rowRef = useRef(null);

    const scroll = (dir) => {
        if (!rowRef.current) return;
        const amt = rowRef.current.offsetWidth * 0.7;
        rowRef.current.scrollBy({ left: dir === 'left' ? -amt : amt, behavior: 'smooth' });
    };

    return (
        <motion.section
            className="works-group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* ── Group Label ──────────────────────── */}
            <div className="works-group-label">
                <span className="works-group-number">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="works-group-name">{group.group}</h2>
                <span className="works-group-cat">{group.category}</span>
            </div>

            {/* ── Featured / Hero Card ─────────────── */}
            <div className="works-featured">
                <VideoCard video={featured} className="card-featured" isFeatured={true} />

                {/* Info panel beside the featured video */}
                <div className="works-featured-info">
                    <span className="featured-tag">Featured</span>
                    <h3 className="featured-title">{featured.title}</h3>
                    <p className="featured-meta">
                        Director: M Vipin Chandran
                    </p>
                    <p className="featured-count">
                        {group.videos.length} {group.videos.length === 1 ? 'Film' : 'Films'} in this collection
                    </p>
                </div>
            </div>

            {/* ── Remaining videos row ─────────────── */}
            {rest.length > 0 && (
                <div className="works-rest-wrap">
                    <div className="works-rest-header">
                        <span className="works-rest-label">More from {group.group}</span>
                        {rest.length > 3 && (
                            <div className="works-row-arrows">
                                <button className="works-arrow-btn" onClick={() => scroll('left')} aria-label="Scroll left">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                                </button>
                                <button className="works-arrow-btn" onClick={() => scroll('right')} aria-label="Scroll right">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="works-rest-row" ref={rowRef}>
                        {rest.map((video, i) => (
                            <VideoCard key={video.youtubeId} video={video} className="card-small" index={i} />
                        ))}
                    </div>
                </div>
            )}
        </motion.section>
    );
}

/* ─── Main Works Page ────────────────────────────── */
export default function Works() {
    return (
        <div className="works-page">
            {/* ── HERO HEADING ─────────────────────── */}
            <section className="works-hero">
                <motion.div
                    className="works-hero-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.span
                        className="works-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                    >
                        Selected Works
                    </motion.span>

                    <h1 className="works-headline">
                        {['OUR', 'FILMS.'].map((word, i) => (
                            <motion.span
                                key={word}
                                className={`wh-word ${word === 'FILMS.' ? 'wh-accent' : ''}`}
                                initial={{ opacity: 0, y: 60, skewY: 4 }}
                                animate={{ opacity: 1, y: 0, skewY: 0 }}
                                transition={{
                                    duration: 0.9,
                                    delay: 0.4 + i * 0.12,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <div className="works-hero-sub">
                        <motion.p className="wh-sub-left" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
                            WILLIAM TELL<br />PRODUCTIONS
                        </motion.p>
                        <motion.p className="wh-sub-right" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
                            CRAFTING STORIES<br />THROUGH CINEMA
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    className="works-divider"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
            </section>

            {/* ── SECTION LABEL ────────────────────── */}
            <div className="works-section-label">
                <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    — Cinematography &nbsp;&nbsp; Direction &nbsp;&nbsp; Visual Storytelling
                </motion.span>
            </div>

            {/* ── GROUP SECTIONS ──────────────────── */}
            <div className="works-groups-container">
                {videoGroups.map((group, i) => (
                    <GroupSection key={group.group} group={group} index={i} />
                ))}
            </div>
        </div>
    );
}
