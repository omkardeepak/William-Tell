import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── All films – every video from Works.jsx ─────────────────── */
const ALL_FILMS = [
    /* Salve Maria */
    { id: '3-1PyFj1h7Y', brand: 'Salve Maria',  cat: 'Ad Film'        },
    { id: 'Kkb-ogpelIo', brand: 'Salve Maria',  cat: 'Ad Film'        },
    { id: 'H9FNmeSnbQY', brand: 'Salve Maria',  cat: 'Ad Film'        },
    { id: 'NL9Wl0jAfM8', brand: 'Salve Maria',  cat: 'Ad Film'        },
    { id: 'fLrw2V4N_Vs', brand: 'Salve Maria',  cat: 'Ad Film'        },
    /* Kalyan Silks */
    { id: '7zEUImqBxLY', brand: 'Kalyan Silks', cat: 'Brand Film'     },
    { id: 'vdDbyddtEsE', brand: 'Kalyan Silks', cat: 'Brand Film'     },
    /* Fazyo */
    { id: 'ON3CbgeviSs', brand: 'Fazyo',        cat: 'Fashion Film'   },
    { id: 'aSxR-I_OG1A', brand: 'Fazyo',        cat: 'Fashion Film'   },
    { id: 'hSU-_Gz_QGQ', brand: 'Fazyo',        cat: 'Street'         },
    { id: 'RfCXTA15bno', brand: 'Fazyo',        cat: 'Cafe'           },
    { id: 'en-z_aTVn30', brand: 'Fazyo',        cat: 'Beach'          },
    { id: 'POX8SAX_eVQ', brand: 'Fazyo',        cat: 'Fashion Film'   },
    { id: 'B5dLCHgC21Q', brand: 'Fazyo',        cat: 'Fashion Film'   },
    { id: 'RoUvFpiaRro', brand: 'Fazyo',        cat: 'Fashion Film'   },
    { id: 'pY4sQVsJC3I', brand: 'Fazyo',        cat: 'Fashion Film'   },
    { id: 'MUVOx9CezRo', brand: 'Fazyo',        cat: 'Fashion Film'   },
    { id: 'e3H9h1nmV0g', brand: 'Fazyo',        cat: 'Fashion Film'   },
    { id: 'kuZgNuNMAxE', brand: 'Fazyo',        cat: 'Teaser'         },
    /* Therefore I'm */
    { id: 'MWepSouX1Es', brand: "Therefore I'm", cat: 'Ad Film'       },
    { id: 'ubRXxLr08rY', brand: "Therefore I'm", cat: 'Ad Film'       },
    { id: 'oJrqi2bThJs', brand: "Therefore I'm", cat: 'Ad Film'       },
    { id: '86cB9Vm5QRQ', brand: "Therefore I'm", cat: 'Ad Film'       },
    /* Cadbury */
    { id: '9iCMhKNMBbE', brand: 'Cadbury',      cat: 'Campaign'       },
    { id: '5lVBuUxjNZA', brand: 'Cadbury',      cat: 'Campaign'       },
    /* myG */
    { id: 'XNgy1CugdwI', brand: 'myG',          cat: 'Launch Film'    },
    /* Maharani */
    { id: 'Kv-zKigB9kY', brand: 'Maharani',     cat: 'Onam Film'      },
    /* Carla */
    { id: '6TcIzK_E4lQ', brand: 'Carla',        cat: 'Commercial'     },
    /* Oxygen */
    { id: 'ri3ylqx8xYQ', brand: 'Oxygen',       cat: 'Digital Film'   },
    /* LDF */
    { id: 'X30KBVV9k4I', brand: 'LDF',          cat: 'Campaign'       },
    /* Nila */
    { id: 'GXlg5S4ASgs', brand: 'Nila',         cat: 'Digital Film'   },
    { id: 'Bba2IMvh3dc', brand: 'Nila',         cat: 'Digital Film'   },
    { id: 'OqWaih22a-c', brand: 'Nila',         cat: 'Digital Film'   },
    /* YSR Congress */
    { id: 'qJ2JaafaTWE', brand: 'YSR Congress', cat: 'Political Ad'   },
    { id: 'f051D_Hg-BM', brand: 'YSR Congress', cat: 'Political Ad'   },
    /* Showreel */
    { id: '4svjw9bicV0', brand: 'Showreel',     cat: '2019'           },
];

const thumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/* ── Distribute films across 3 rows (cycle through all) ─────── */
const chunk = (arr, rows) => {
    const result = Array.from({ length: rows }, () => []);
    arr.forEach((item, i) => result[i % rows].push(item));
    // duplicate for seamless infinite loop
    return result.map(r => [...r, ...r, ...r]);
};
const ROWS = chunk(ALL_FILMS, 3);

/* ── Single card ──────────────────────────────────────────────── */
const Card = ({ film, onHover, onLeave }) => (
    <div
        className="vg-card"
        onMouseEnter={() => onHover(film)}
        onMouseLeave={onLeave}
    >
        <img src={thumb(film.id)} alt={film.brand} loading="lazy" decoding="async" />
        <div className="vg-card-shine" />
        <div className="vg-card-info">
            <span className="vg-card-brand">{film.brand}</span>
            <span className="vg-card-cat">{film.cat}</span>
        </div>
    </div>
);

/* ── Scrolling rail ──────────────────────────────────────────── */
const Rail = ({ films, direction, speed }) => (
    <div className="vg-rail-wrap">
        <div
            className="vg-rail"
            style={{
                animationDuration: `${speed}s`,
                animationDirection: direction === 'left' ? 'normal' : 'reverse',
            }}
        >
            {films.map((f, i) => (
                <div key={`${f.id}-${i}`} className="vg-card-slot">
                    <img src={thumb(f.id)} alt={f.brand} loading="lazy" decoding="async" className="vg-rail-img" />
                    <div className="vg-rail-overlay">
                        <span className="vg-rail-brand">{f.brand}</span>
                        <span className="vg-rail-cat">{f.cat}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/* ── Main Component ──────────────────────────────────────────── */
const HeroFilmsSection = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const rootRef = useRef(null);

    /* Track cursor for spotlight */
    useEffect(() => {
        const move = (e) => {
            if (!rootRef.current) return;
            const rect = rootRef.current.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        };
        window.addEventListener('mousemove', move, { passive: true });
        return () => window.removeEventListener('mousemove', move);
    }, []);

    return (
        <section className="vg-root" ref={rootRef}>
            <style>{CSS}</style>

            {/* ── Cursor spotlight ── */}
            <div
                className="vg-spotlight"
                style={{ left: mousePos.x, top: mousePos.y }}
            />

            {/* ── Grain texture ── */}
            <div className="vg-grain" />

            {/* ── 3 speed-differentiated rails ── */}
            <div className="vg-grid">
                <Rail films={ROWS[0]} direction="left"  speed={38} />
                <Rail films={ROWS[1]} direction="right" speed={28} />
                <Rail films={ROWS[2]} direction="left"  speed={48} />
            </div>

            {/* ── Hard vignette edges ── */}
            <div className="vg-edge vg-edge-top"    />
            <div className="vg-edge vg-edge-bottom" />
            <div className="vg-edge vg-edge-left"   />
            <div className="vg-edge vg-edge-right"  />

            {/* ── Centre overlay: big editorial headline ── */}
            <div className="vg-centre">
                {/* Kicker */}
                <div className="vg-kicker">
                    <span className="vg-kicker-line" />
                    <span className="vg-kicker-text">William Tell Productions</span>
                    <span className="vg-kicker-line" />
                </div>

                {/* Headline — mix-blend-mode punches through grid */}
                <h1 className="vg-headline">
                    <span className="vg-hl-row">WE MAKE</span>
                    <span className="vg-hl-row vg-hl-accent">FILMS</span>
                </h1>


                <button
                    className="vg-cta"
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent('wt:expandSection', { detail: 'film' }));
                    }}
                >
                    <span className="vg-cta-text">View All Films</span>
                    <span className="vg-cta-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </button>
            </div>
        </section>
    );
};

/* ─── CSS ─────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital@1&display=swap');

/* ── Root ── */
.vg-root {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 640px;
    overflow: hidden;
    background: #0a0a0a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* ── Cursor spotlight ── */
.vg-spotlight {
    position: absolute;
    width: 480px;
    height: 480px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 6;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 70%);
    transition: left 0.08s linear, top 0.08s linear;
    mix-blend-mode: screen;
}

/* ── Grain ── */
.vg-grain {
    position: absolute;
    inset: 0;
    z-index: 7;
    pointer-events: none;
    opacity: 0.065;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
}

/* ── Grid of rails ── */
.vg-grid {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 32px 0;
    z-index: 1;
}

.vg-rail-wrap {
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.vg-rail {
    display: flex;
    gap: 10px;
    will-change: transform;
    animation: railScroll linear infinite;
    width: max-content;
}

@keyframes railScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-33.333%); }
}

/* ── Individual card slot ── */
.vg-card-slot {
    flex-shrink: 0;
    width: 210px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
}
.vg-card-slot:hover {
    transform: scale(1.08) translateY(-4px);
    z-index: 3;
}
.vg-rail-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
    filter: saturate(0.7) brightness(0.75);
    transition: filter 0.4s ease;
    border-radius: 10px;
}
.vg-card-slot:hover .vg-rail-img {
    filter: saturate(1.1) brightness(0.95);
}
.vg-rail-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0.6rem 0.7rem;
    opacity: 0;
    transition: opacity 0.35s ease;
}
.vg-card-slot:hover .vg-rail-overlay { opacity: 1; }
.vg-rail-brand {
    font-family: 'Outfit', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.06em;
    line-height: 1.2;
}
.vg-rail-cat {
    font-family: 'Outfit', sans-serif;
    font-size: 0.58rem;
    font-weight: 400;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 2px;
}

/* ── Edge fades ── */
.vg-edge {
    position: absolute;
    z-index: 5;
    pointer-events: none;
}
.vg-edge-top {
    top: 0; left: 0; right: 0; height: 28%;
    background: linear-gradient(to bottom, #0a0a0a 0%, transparent 100%);
}
.vg-edge-bottom {
    bottom: 0; left: 0; right: 0; height: 22%;
    background: linear-gradient(to top, #0a0a0a 0%, transparent 100%);
}
.vg-edge-left {
    top: 0; left: 0; bottom: 0; width: 7%;
    background: linear-gradient(to right, #0a0a0a 0%, transparent 100%);
}
.vg-edge-right {
    top: 0; right: 0; bottom: 0; width: 7%;
    background: linear-gradient(to left, #0a0a0a 0%, transparent 100%);
}

/* ── Centre panel ── */
.vg-centre {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
    pointer-events: none;
}

/* Kicker */
.vg-kicker {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 1.2rem;
}
.vg-kicker-line {
    display: block;
    width: 36px;
    height: 1px;
    background: rgba(255,255,255,0.3);
}
.vg-kicker-text {
    font-family: 'Outfit', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
}

/* Headline */
.vg-headline {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 0.88;
    margin: 0;
    gap: 0;
}
.vg-hl-row {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(6rem, 18vw, 14rem);
    font-weight: 400;
    letter-spacing: 0.04em;
    color: #fff;
    /* Punch through the grid — this makes it look etched into motion */
    mix-blend-mode: difference;
    text-shadow: none;
    line-height: 0.9;
}
.vg-hl-accent {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(5rem, 15vw, 12rem);
    color: #fff;
    mix-blend-mode: difference;
    letter-spacing: -0.01em;
}

/* Stats row */
.vg-stats {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 2.2rem;
    mix-blend-mode: normal;
    pointer-events: auto;
}
.vg-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
}
.vg-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    color: #fff;
    letter-spacing: 0.05em;
    line-height: 1;
    text-shadow: 0 0 20px rgba(255,255,255,0.3);
}
.vg-stat-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.58rem;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
}
.vg-stat-divider {
    width: 1px;
    height: 32px;
    background: rgba(255,255,255,0.15);
}

/* CTA */
.vg-cta {
    display: inline-flex;
    align-items: center;
    gap: 0;
    margin-top: 2.2rem;
    background: #fff;
    color: #0a0a0a;
    border: none;
    cursor: pointer;
    border-radius: 100px;
    overflow: hidden;
    padding: 0;
    pointer-events: auto;
    transition: transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease;
    box-shadow: 0 4px 32px rgba(255,255,255,0.12);
}
.vg-cta:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 8px 40px rgba(255,255,255,0.22);
}
.vg-cta-text {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.85rem 1.8rem 0.85rem 2rem;
    transition: letter-spacing 0.35s ease;
}
.vg-cta:hover .vg-cta-text { letter-spacing: 0.22em; }
.vg-cta-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0a;
    color: #fff;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin: 3px;
    flex-shrink: 0;
    transition: background 0.3s, transform 0.35s ease;
}
.vg-cta:hover .vg-cta-icon {
    transform: translateX(3px) rotate(-35deg);
}

/* ── Bottom ticker ── */
.vg-ticker-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 12;
    height: 36px;
    overflow: hidden;
    border-top: 1px solid rgba(255,255,255,0.07);
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
}
.vg-ticker {
    display: flex;
    white-space: nowrap;
    animation: tickerScroll 30s linear infinite;
    width: max-content;
}
@keyframes tickerScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
}
.vg-ticker-item {
    font-family: 'Outfit', sans-serif;
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    padding: 0 1.4rem;
    display: flex;
    align-items: center;
    gap: 1.4rem;
}
.vg-ticker-dot {
    font-size: 0.35rem;
    color: rgba(255,255,255,0.18);
}

/* ── Responsive ── */
@media (max-width: 768px) {
    .vg-hl-row { font-size: clamp(4.5rem, 22vw, 8rem); }
    .vg-hl-accent { font-size: clamp(3.8rem, 18vw, 7rem); }
    .vg-card-slot { width: 150px; }
    .vg-stats { gap: 1.2rem; }
    .vg-stat-num { font-size: 1.5rem; }
    .vg-kicker-line { width: 22px; }
}
@media (max-width: 480px) {
    .vg-hl-row { font-size: clamp(3.5rem, 24vw, 6rem); }
    .vg-hl-accent { font-size: clamp(3rem, 20vw, 5rem); }
    .vg-card-slot { width: 120px; }
    .vg-stats { gap: 0.9rem; }
    .vg-cta-text { font-size: 0.65rem; padding: 0.75rem 1.2rem 0.75rem 1.5rem; }
    .vg-cta-icon { width: 38px; height: 38px; }
    .vg-grid { gap: 6px; padding: 28px 0; }
    .vg-rail-wrap { gap: 6px; }
}
`;

export default HeroFilmsSection;
