/**
 * HeroSeam — the "breathing gap" between the Kinetic Velocity Grid hero
 * and the content below.
 *
 * Visual language:
 *  • A full-width horizontal rule sweeps left→right on intersect
 *  • A slow-moving service marquee (echoes the hero ticker but calmer)
 *  • A vertical counter strip that descends the left edge
 *  • The whole section stays black — zero visual jump from hero
 */

import { useEffect, useRef, useState } from 'react';

const SERVICES = [
    'Salve Maria',
    'Kalyan Silks',
    'Fazyo',
    "Therefore I'm",
    'Cadbury',
    'myG',
    'Maharani',
    'Carla',
    'Oxygen',
    'LDF',
    'Nila',
    'YSR Congress',
    'Brahmins'
];

const HeroSeam = () => {
    const rootRef = useRef(null);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
            { threshold: 0.3 }
        );
        if (rootRef.current) obs.observe(rootRef.current);
        return () => obs.disconnect();
    }, []);

    const marqueeItems = [...SERVICES, ...SERVICES, ...SERVICES];

    return (
        <div className="hs-root" ref={rootRef}>
            <style>{CSS}</style>

            {/* ── Sweeping rule ── */}
            <div className="hs-rule-wrap">
                <div className={`hs-rule ${triggered ? 'hs-rule-in' : ''}`} />
            </div>

            {/* ── Service marquee — slower / calmer than hero ticker ── */}
            <div className="hs-marquee-wrap">
                <div className="hs-marquee">
                    {marqueeItems.map((s, i) => (
                        <span key={i} className="hs-marquee-item">
                            {s}
                            <span className="hs-marquee-sep">—</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Second sweeping rule ── */}
            <div className="hs-rule-wrap hs-rule-wrap-rev">
                <div className={`hs-rule hs-rule-rev ${triggered ? 'hs-rule-in' : ''}`} />
            </div>
        </div>
    );
};

const CSS = `
.hs-root {
    width: 100%;
    background: #0a0a0a;
    padding: 0;
    overflow: hidden;
    position: relative;
}

/* ── Sweeping rule ── */
.hs-rule-wrap {
    position: relative;
    height: 1px;
    background: rgba(255,255,255,0.06);
    overflow: hidden;
}
.hs-rule {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%);
    transform: translateX(-100%);
    transition: transform 1.6s cubic-bezier(0.16,1,0.3,1);
}
.hs-rule-in {
    transform: translateX(100%);
}
.hs-rule-rev {
    transform: translateX(100%);
    transition-delay: 0.25s;
}
.hs-rule-rev.hs-rule-in {
    transform: translateX(-100%);
}

/* ── Service marquee ── */
.hs-marquee-wrap {
    overflow: hidden;
    padding: 1.4rem 0;
}
.hs-marquee {
    display: flex;
    white-space: nowrap;
    width: max-content;
    animation: hsScroll 22s linear infinite;
}
@keyframes hsScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-33.333%); }
}
.hs-marquee-item {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.18);
    padding: 0 1.2rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    transition: color 0.3s;
}
.hs-marquee-item:hover { color: rgba(255,255,255,0.55); }
.hs-marquee-sep {
    color: rgba(255,255,255,0.08);
    font-size: 0.9em;
}

@media (max-width: 480px) {
    .hs-marquee-item { font-size: 1rem; letter-spacing: 0.1em; }
    .hs-marquee-wrap { padding: 1rem 0; }
}
`;

export default HeroSeam;
