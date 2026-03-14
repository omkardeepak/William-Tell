import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─── Reel video data from the channel ────────────────────────── */
const reelVideos = [
    { id: '7zEUImqBxLY', title: 'Kalyan Silks' },
    { id: '3-1PyFj1h7Y', title: 'Salve Maria' },
    { id: 'Kkb-ogpelIo', title: 'Salve Maria' },
    { id: 'H9FNmeSnbQY', title: 'Salve Maria' },
    { id: 'vdDbyddtEsE', title: 'Kalyan Silks' },
    { id: 'MWepSouX1Es', title: 'Therefore Im' },
];

// Frame dimensions are computed dynamically based on container width (see frameDims state)
const FRAME_GAP_DEFAULT = 20;

// Derive responsive frame dims from container width
const getFrameDims = (containerWidth) => {
    if (containerWidth <= 480) return { width: Math.round(containerWidth * 0.8), gap: 10 };
    if (containerWidth <= 768) return { width: Math.round(containerWidth * 0.72), gap: 14 };
    return { width: 600, gap: FRAME_GAP_DEFAULT };
};

// Circular buffer: add one frame before and after for edge frames
// Stopped display: [last, 0, 1, 2, 3, 4, 5, first]
// activeIndex 0 maps to display index 1
const buildDisplayList = () => [
    reelVideos[reelVideos.length - 1], // left neighbour of first
    ...reelVideos,
    reelVideos[0],                       // right neighbour of last
];
const STOPPED_FRAMES = buildDisplayList();
// When stopped, real index 0 = display index 1
const toDisplayIndex = (realIdx) => realIdx + 1;

/* ─── Single film frame ────────────────────────────────────────── */
const FilmFrame = ({ video, isActive, frameWidth, onClick }) => {
    const embedSrc = `https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&playlist=${video.id}`;
    const thumbSrc = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

    return (
        <div
            className={`film-frame ${isActive ? 'film-frame-active' : ''}`}
            style={{ width: `${frameWidth}px` }}
            onClick={isActive ? undefined : onClick}
            tabIndex={0}
            aria-label={video.title}
        >
            <div className="film-frame-inner">
                {/* Always preload thumbnail */}
                <img
                    src={thumbSrc}
                    alt={video.title}
                    className="film-frame-thumb"
                    loading="eager"
                    decoding="async"
                />
                {/* Embed iframe on active frame — sits on top of thumbnail */}
                {isActive && (
                    <iframe
                        src={embedSrc}
                        className="film-frame-video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                    />
                )}
                {/* Dark overlay for non-active frames */}
                {!isActive && <div className="film-frame-overlay" />}
            </div>
            <span className="film-frame-label">{video.title}</span>
        </div>
    );
};

/* ─── Sprocket row ─────────────────────────────────────────────── */
const SprocketRow = ({ count }) => (
    <div className="sprocket-row">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="sprocket-hole" />
        ))}
    </div>
);

/* ─── Main section ─────────────────────────────────────────────── */
const FilmReelSection = () => {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null); // ref to the film-strip-viewport div
    const [phase, setPhase] = useState('idle');
    const [activeIndex, setActiveIndex] = useState(0);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [stripX, setStripX] = useState(0);

    const posRef = useRef(0);
    const velocityRef = useRef(0);
    const startTimeRef = useRef(0);
    const phaseRef = useRef('idle');

    const navigate = useNavigate();

    // Responsive frame dimensions — recomputed on container resize
    const [frameDims, setFrameDims] = useState({ width: 600, gap: FRAME_GAP_DEFAULT });
    const frameStep = frameDims.width + frameDims.gap;

    const updateFrameDims = useCallback(() => {
        const cw = viewportRef.current
            ? viewportRef.current.getBoundingClientRect().width
            : (typeof window !== 'undefined' ? window.innerWidth : 1200);
        setFrameDims(getFrameDims(cw));
    }, []);

    // Compute on first render and on resize
    useEffect(() => {
        updateFrameDims();
        window.addEventListener('resize', updateFrameDims);
        return () => window.removeEventListener('resize', updateFrameDims);
    }, [updateFrameDims]);

    // Its centre is at 50vw = half of the ACTUAL container width.
    // We measure the container directly to avoid scrollbar / window.innerWidth mismatch.
    const getContainerCenter = useCallback(() => {
        if (viewportRef.current) {
            return viewportRef.current.getBoundingClientRect().width / 2;
        }
        return (typeof window !== 'undefined' ? window.innerWidth : 1200) / 2;
    }, []);

    const getCenteredX = useCallback((displayIdx) => {
        const centerX = getContainerCenter();
        return centerX - (displayIdx * frameStep) - (frameDims.width / 2);
    }, [getContainerCenter, frameStep, frameDims.width]);

    // Set initial x so first real frame (display index 1) is centered
    useEffect(() => {
        const x = getCenteredX(toDisplayIndex(0));
        setStripX(x);
        posRef.current = x;
    }, [getCenteredX]);

    // Re-center when window resizes (stopped mode only)
    useEffect(() => {
        const onResize = () => {
            if (phaseRef.current === 'stopped') {
                setStripX(getCenteredX(toDisplayIndex(activeIndex)));
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [activeIndex, getCenteredX]);

    // Intersection observer — trigger animation
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasTriggered) {
                setHasTriggered(true);
                // Start far right
                posRef.current = 5000;
                velocityRef.current = -90; // very fast leftward
                startTimeRef.current = performance.now();
                setPhase('spinning');
                phaseRef.current = 'spinning';
            }
        }, { threshold: 0.5 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [hasTriggered]);

    // Animation loop
    useEffect(() => {
        if (phase === 'idle' || phase === 'stopped') return;

        let animFrame;
        const targetX = getCenteredX(toDisplayIndex(0));

        const tick = (now) => {
            const elapsed = now - startTimeRef.current;

            if (phase === 'spinning') {
                // Move fast for 2 seconds, then switch to halting
                posRef.current += velocityRef.current;
                if (elapsed > 2000) {
                    setPhase('halting');
                    phaseRef.current = 'halting';
                    startTimeRef.current = now;
                    return; // new effect will pick up
                }
            } else if (phase === 'halting') {
                // Linearly decrease velocity to 0 over 1.5s while steering to target
                const haltDuration = 1500;
                const t = Math.min(elapsed / haltDuration, 1);
                // Linear deceleration: v = v0 * (1 - t)
                velocityRef.current = -90 * (1 - t);
                // Also nudge position toward target so it lands exactly
                const diff = targetX - posRef.current;
                posRef.current += velocityRef.current + diff * 0.015 * t;

                if (t >= 1) {
                    posRef.current = targetX;
                    setStripX(targetX);
                    setPhase('stopped');
                    phaseRef.current = 'stopped';
                    return;
                }
            }

            setStripX(posRef.current);
            animFrame = requestAnimationFrame(tick);
        };

        animFrame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animFrame);
    }, [phase, getCenteredX]);

    // Carousel navigation — slide to centered real frame
    useEffect(() => {
        if (phase === 'stopped') {
            setStripX(getCenteredX(toDisplayIndex(activeIndex)));
        }
    }, [activeIndex, phase, getCenteredX]);

    const handlePrev = () => setActiveIndex(p => (p - 1 + reelVideos.length) % reelVideos.length);
    const handleNext = () => setActiveIndex(p => (p + 1) % reelVideos.length);

    // Frames to render
    const spinFrames = [
        ...reelVideos, ...reelVideos, ...reelVideos,
        ...reelVideos, ...reelVideos,
    ];
    const isSpinning = phase === 'spinning' || phase === 'halting';
    const frames = isSpinning ? spinFrames : STOPPED_FRAMES;
    const sprocketCount = frames.length * 5;

    return (
        <section ref={sectionRef} className="film-reel-section">
            <style>{filmReelStyles}</style>

            <div className="film-reel-header">
                <motion.span 
                    className="film-reel-eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Production
                </motion.span>
                <h2 className="film-reel-title" style={{ overflow: 'hidden' }}>
                    {"Stories in Motion".split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.8, 
                                delay: i * 0.1, 
                                ease: [0.21, 1, 0.36, 1] 
                            }}
                            style={{ display: "inline-block", marginRight: "0.4em" }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h2>
            </div>

            <div className="film-strip-viewport" id="stories-in-motion" ref={viewportRef}>
                {/* Full-width dark background — always edge to edge */}
                <div className="film-strip-bg" />

                {/* Fixed sprocket rows — absolutely positioned top & bottom, always full width */}
                <div className="sprocket-fixed sprocket-fixed-top">
                    {Array.from({ length: 60 }).map((_, i) => <div key={i} className="sprocket-hole" />)}
                </div>
                <div className="sprocket-fixed sprocket-fixed-bottom">
                    {Array.from({ length: 60 }).map((_, i) => <div key={i} className="sprocket-hole" />)}
                </div>

                {/* Translating film strip — only frames, no sprockets */}
                <div
                    className={`film-strip ${phase === 'stopped' ? 'smooth-move' : ''}`}
                    style={{ transform: `translateX(${stripX}px)` }}
                >
                    <div className="film-frames-row" style={{ gap: `${frameDims.gap}px` }}>
                        {frames.map((v, i) => {
                            const isActive = !isSpinning && i === toDisplayIndex(activeIndex);
                            return (
                                <FilmFrame
                                    key={`${v.id}-${i}`}
                                    video={v}
                                    isActive={isActive}
                                    frameWidth={frameDims.width}
                                    onClick={() => {
                                        if (!isSpinning) {
                                            const real = ((i - 1) + reelVideos.length) % reelVideos.length;
                                            setActiveIndex(real);
                                        }
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Smooth gradient edges — no backdrop-filter (avoids blotchy blobs) */}
                <div className="glass-edge glass-edge-left" />
                <div className="glass-edge glass-edge-right" />

                {/* Nav buttons inside reel */}
                {phase === 'stopped' && (
                    <>
                        <button className="reel-nav-btn reel-nav-left" onClick={handlePrev} aria-label="Previous">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button className="reel-nav-btn reel-nav-right" onClick={handleNext} aria-label="Next">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Film grain */}
                <div className="film-grain-overlay" />
            </div>

            {/* Dot indicators + View More button below reel */}
            <div className="film-controls">
                <div className="dots">
                    {reelVideos.map((_, i) => (
                        <div
                            key={i}
                            className={`dot ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
                <motion.button
                    id="stories-in-motion"
                    className="view-more-btn"
                    onClick={() => navigate('/works?category=Films')}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                    <span>View All Films</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </motion.button>
            </div>
        </section>
    );
};

/* ─── Styles ───────────────────────────────────────────────────── */
const filmReelStyles = `
.film-reel-section {
    padding: 8rem 0;
    background: transparent;
    overflow: hidden;
    color: #fff;
    font-family: 'Outfit', sans-serif;
}
.film-reel-header {
    text-align: center;
    margin-bottom: 4rem;
}
.film-reel-eyebrow {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: rgba(255,255,255,0.35);
    display: block;
    margin-bottom: 1rem;
}
.film-reel-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    margin: 0;
    letter-spacing: -0.02em;
}

/* ── Viewport ─────────────────── */
.film-strip-viewport {
    position: relative;
    width: 100%;
    background: transparent;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0;          /* no extra padding — sprockets control spacing */
    overflow: hidden;
    border-radius: 16px; /* rounded reel edges */
}

/* Full-width dark background removed to show page background */
.film-strip-bg {
    display: none;
}

/* ── Strip ────────────────────── */
.film-strip {
    display: flex;
    flex-direction: column;
    width: max-content;
    will-change: transform;
    position: relative;
    z-index: 1;
}
.smooth-move {
    transition: transform 0.85s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* ── Fixed full-width sprocket bands ─ */
/* Sit outside the translating strip so they always span edge to edge */
.sprocket-fixed {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    gap: 36px;
    padding: 0 12px;
    align-items: center;
    height: 38px;
    z-index: 2;
    overflow: hidden;
}
.sprocket-fixed-top    { top: 0; }
.sprocket-fixed-bottom { bottom: 0; }
.sprocket-hole {
    width: 24px;
    height: 15px;
    background: rgba(0,0,0,0.6);
    border-radius: 4px;
    flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.3);
    box-shadow: inset 0 1px 4px rgba(0,0,0,0.4);
}

/* ── Frames ───────────────────── */
.film-frames-row {
    display: flex;
    gap: 20px;
    /* padding matches the height of the fixed sprocket bands (38px each) */
    padding: 38px 0;
    align-items: center;
}
.film-frame {
    width: 600px;
    flex-shrink: 0;
    cursor: pointer;
    transition: transform 0.5s ease, opacity 0.5s ease;
    opacity: 0.45;
    outline: none;
}
.film-frame:hover {
    opacity: 0.75;
}
.film-frame-active {
    opacity: 1;
    transform: scale(1.04);
    cursor: default;
}
.film-frame-inner {
    aspect-ratio: 16/9;
    background: #000;
    border: 1px solid #333;
    overflow: hidden;
    position: relative;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* Thumbnail — centered, covers frame */
.film-frame-thumb {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    display: block;
    filter: grayscale(20%);
    transition: filter 0.4s ease;
    border-radius: 5px;
}
.film-frame-active .film-frame-thumb {
    filter: grayscale(0%);
}
/* Iframe — centered over thumbnail, fills frame fully */
.film-frame-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border: none;
    z-index: 2;
    pointer-events: none;
}
.film-frame-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 1;
    transition: background 0.4s ease;
    border-radius: 5px;
}
.film-frame:hover .film-frame-overlay {
    background: rgba(0,0,0,0.15);
}
.film-frame-label {
    display: block;
    text-align: center;
    margin-top: 0.8rem;
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    transition: color 0.3s;
}
.film-frame-active .film-frame-label {
    color: rgba(255,255,255,0.7);
}

/* ── Smooth gradient edges ───────
   Pure gradient, NO backdrop-filter — avoids blotchy blobs */
.glass-edge {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 28vw;
    pointer-events: none;
    z-index: 10;
}
.glass-edge-left {
    left: 0;
    background: linear-gradient(
        to right,
        rgba(10,10,10,0.9) 0%,
        rgba(10,10,10,0.8) 8%,
        rgba(10,10,10,0.7) 18%,
        rgba(10,10,10,0.6) 32%,
        rgba(10,10,10,0.4) 50%,
        rgba(10,10,10,0.2) 68%,
        rgba(10,10,10,0.1) 82%,
        transparent      100%
    );
}
.glass-edge-right {
    right: 0;
    background: linear-gradient(
        to left,
        rgba(10,10,10,0.9) 0%,
        rgba(10,10,10,0.8) 8%,
        rgba(10,10,10,0.7) 18%,
        rgba(10,10,10,0.6) 32%,
        rgba(10,10,10,0.4) 50%,
        rgba(10,10,10,0.2) 68%,
        rgba(10,10,10,0.1) 82%,
        transparent      100%
    );
}

/* ── Minimal nav buttons ─────────
   Just an SVG chevron + thin ring, no heavy backdrop */
.reel-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.18);
    color: rgba(255,255,255,0.55);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
    animation: fcFadeUp 0.4s ease;
}
.reel-nav-btn:hover {
    border-color: rgba(255,255,255,0.55);
    color: #fff;
    transform: translateY(-50%) scale(1.1);
}
.reel-nav-left  { left: 2vw; }
.reel-nav-right { right: 2vw; }

/* ── Grain overlay ────────────── */
.film-grain-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.06;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    z-index: 11;
    border-radius: 16px;
}

/* ── Dot controls + view more button ─── */
.film-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-top: 2.5rem;
    animation: fcFadeUp 0.5s ease;
}
@keyframes fcFadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
}
.dots {
    display: flex;
    gap: 10px;
    align-items: center;
}
.dot {
    width: 7px;
    height: 7px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.dot.active {
    background: #fff;
    width: 22px;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(255,255,255,0.4);
}

/* ── View More button ────────────── */
.view-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.65rem 1.6rem;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.view-more-btn:hover {
    background: #fff;
    color: #000;
    border-color: #fff;
    gap: 1rem;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
}

.view-more-btn svg {
    transition: transform 0.4s ease;
    flex-shrink: 0;
}

.view-more-btn:hover svg {
    transform: translateX(4px);
    stroke: #000;
}
@media (max-width: 768px) {
    .film-reel-section { padding: 4rem 0 3rem; }
    .film-reel-title { font-size: clamp(1.6rem, 7vw, 2.4rem); }
    .glass-edge { width: 14vw; }
    .reel-nav-left  { left: 1vw; }
    .reel-nav-right { right: 1vw; }
    .reel-nav-btn { width: 34px; height: 34px; }
    .sprocket-fixed { gap: 22px; }
    .sprocket-hole  { width: 18px; height: 12px; }
    .film-frames-row { padding: 32px 0; }
    .sprocket-fixed  { height: 32px; }
    .film-frame-label { font-size: 0.65rem; margin-top: 0.5rem; }
    .view-more-btn { font-size: 0.65rem; padding: 0.45rem 1.1rem; }
    .film-controls { gap: 1.4rem; margin-top: 2rem; }
}

@media (max-width: 480px) {
    .film-reel-section { padding: 3rem 0 2.5rem; }
    .film-reel-header { margin-bottom: 2.5rem; }
    .film-reel-title { font-size: 1.5rem; }
    .glass-edge { width: 10vw; }
    .reel-nav-btn { width: 30px; height: 30px; }
    .reel-nav-btn svg { width: 14px; height: 14px; }
    .sprocket-fixed { gap: 16px; }
    .sprocket-hole  { width: 14px; height: 10px; border-radius: 2px; }
    .film-frames-row { padding: 28px 0; }
    .sprocket-fixed  { height: 28px; }
    .film-reel-eyebrow { font-size: 0.65rem; }
    .view-more-btn { font-size: 0.6rem; padding: 0.4rem 1rem; }
    .dot { width: 6px; height: 6px; }
    .dot.active { width: 18px; }
}
`;

export default FilmReelSection;
