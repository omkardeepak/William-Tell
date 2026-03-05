import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import './About.css';

/* ─── Cinematic page-intro curtain ──────────────────────────────── */
const CurtainIntro = () => {
    const panels = [0, 1, 2, 3, 4];
    return (
        <div className="curtain-wrapper" aria-hidden="true">
            {panels.map((i) => (
                <motion.div
                    key={i}
                    className="curtain-panel"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{
                        duration: 0.9,
                        delay: i * 0.07,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    style={{ transformOrigin: 'top' }}
                />
            ))}
            {/* Overlay text during curtain */}
            <motion.div
                className="curtain-label"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <img src="/images/wt-logo.png" alt="William Tell" className="curtain-logo" />
            </motion.div>
        </div>
    );
};

/* ─── Reveal wrapper (fade + rise on viewport) ───────────────────── */
const Reveal = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
};

/* ─── Stats data from the image ─────────────────────────────────── */
const stats = [
    {
        number: '50+',
        label: 'Brand Films',
        services: [
            'Tv Commercials',
            'Corporate Shoot',
            'Instagram Promotion Reels',
            '2d & 3d Motion Videos',
            'Graphics',
            'Social Media Ads',
        ],
    },
    {
        number: '20+',
        label: 'Brands',
        services: [
            'Textile',
            'Bathware',
            'Cosmetics Clinic',
            'Sanitary Retail',
            'Electronic And Appliances Retail',
            'Political Campaign',
        ],
    },
    {
        number: '9+',
        label: 'Branding Design',
        services: [
            'Logo / Branding Identity Designing',
            'Package Designing',
            'Brochure / Profile Designing',
            'Hoarding Design',
        ],
    },
];

/* ─── Accordion row component ───────────────────────────────────── */
const AccordionRow = ({ stat, index }) => {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-expand on mobile scroll
    useEffect(() => {
        if (isMobile && inView) {
            setOpen(true);
        }
    }, [inView, isMobile]);

    const serviceVariants = {
        hidden: { opacity: 0, x: -14 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { duration: 0.38, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
        }),
    };

    return (
        <motion.div
            ref={ref}
            className={`accordion-row ${open ? 'is-open' : ''}`}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseEnter={() => {
                setHovered(true);
                if (!isMobile) setOpen(true);
            }}
            onMouseLeave={() => {
                setHovered(false);
                if (!isMobile) setOpen(false);
            }}
        >
            {/* Ambient ghost number — grows on hover/open */}
            <AnimatePresence>
                {(hovered || open) && (
                    <motion.span
                        className="accordion-ghost-num"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                        aria-hidden="true"
                    >
                        {stat.number}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Gradient top border that fills on hover */}
            <motion.div
                className="accordion-border"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered || open ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* ── Header ── */}
            <div
                className="accordion-header"
                style={{ cursor: isMobile ? 'default' : 'pointer' }}
            >
                {/* Index number */}
                <span className="accordion-index">
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Stat count */}
                <span className="accordion-stat-num">{stat.number}</span>

                {/* Label */}
                <span className="accordion-label">{stat.label}</span>

                {/* Service count pill */}
                <span className="accordion-count-pill">
                    {stat.services.length} services
                </span>

                {/* Toggle icon */}
                <motion.span
                    className="accordion-icon"
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <Plus size={18} strokeWidth={1.5} />
                </motion.span>
            </div>

            {/* ── Expandable body ── */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        className="accordion-body"
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <ul className="accordion-services">
                            {stat.services.map((s, i) => (
                                <motion.li
                                    key={s}
                                    custom={i}
                                    variants={serviceVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="accordion-service-item"
                                >
                                    <span className="service-dot" />
                                    {s}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ─── Main Component ─────────────────────────────────────────────── */
export default function About() {
    return (
        <div className="about-page">
            {/* Cinematic curtain intro */}
            <CurtainIntro />

            {/* ── HERO ────────────────────────────────────────── */}
            <section className="about-hero">
                <div className="about-container">
                    <motion.p
                        className="about-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        About Us
                    </motion.p>
                    <motion.h1
                        className="about-hero-heading"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        We don't just produce.
                        <br />
                        <em>We reinvent.</em>
                    </motion.h1>
                    <motion.div
                        className="about-hero-divider"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                </div>
            </section>

            {/* ── PHILOSOPHY ──────────────────────────────────── */}
            <section className="about-philosophy">
                <div className="about-container">
                    <div className="philosophy-row">
                        {/* Left label */}
                        <Reveal delay={0} className="philosophy-label-col">
                            <span className="section-label">The Philosophy</span>
                        </Reveal>

                        {/* Right content */}
                        <div className="philosophy-content-col">
                            <Reveal delay={0.1}>
                                <p className="philosophy-body">
                                    At William Tell Productions, we blur the line between
                                    commercial advertising and cinematic art. We believe every
                                    brand has a story that deserves to be told with magnitude
                                    and visual excellence.
                                </p>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p className="philosophy-body" style={{ marginTop: '1.5rem' }}>
                                    Our team of visionary directors, meticulous strategists,
                                    and innovative designers collaborate to create work that
                                    doesn't just look good — it shifts culture and drives results.
                                </p>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <Link to="/works" className="about-cta-link">
                                    See Our Work <ArrowUpRight size={15} strokeWidth={1.5} />
                                </Link>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS / SERVICES  ── Interactive Accordion ─── */}
            <section className="about-stats">
                <div className="about-container">
                    <Reveal delay={0}>
                        <div className="stats-header-row">
                            <span className="section-label">What We've Done</span>
                        </div>
                    </Reveal>

                    <div className="accordion-list">
                        {stats.map((stat, i) => (
                            <AccordionRow key={stat.label} stat={stat} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MISSION STATEMENT ───────────────────────────── */}
            <section className="about-mission">
                <div className="about-container">
                    <Reveal>
                        <blockquote className="mission-quote">
                            "Impact is our standard. Every frame, every cut, every campaign —
                            crafted to leave a mark."
                        </blockquote>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <p className="mission-attribution">
                            — William Tell Productions
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ── BOTTOM DIVIDER ──────────────────────────────── */}
            <div className="about-bottom-rule" />
        </div>
    );
}
