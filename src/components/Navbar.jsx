import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

// Nav columns: each has a primary link and an optional secondary link
const navColumns = [
    { primary: { name: 'Art', path: '/#archives' }, secondary: { name: 'Work', path: '/works' } },
    { primary: { name: 'Strategy', path: '/about' }, secondary: { name: 'About', path: '/about' } },
    { primary: { name: 'Film', path: "/#stories-in-motion" }, secondary: { name: 'Contact', path: '/contact' } },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showAltNavbar, setShowAltNavbar] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Detect if we've reached or passed the "Stories in Motion" section
            const filmSection = document.getElementById('stories-in-motion');
            if (filmSection) {
                const rect = filmSection.getBoundingClientRect();
                // If the top of the section has reached the navbar (80px), switch mode
                setShowAltNavbar(rect.top <= 80);
            } else {
                setShowAltNavbar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const handleAnchorLinkClick = (e, path) => {
        if (path.includes('#stories-in-motion')) {
            // Re-dispatch event to ensure hero is expanded
            window.dispatchEvent(new Event('forceExpandHero'));

            if (location.pathname === '/') {
                e.preventDefault();
                const target = document.getElementById('stories-in-motion');
                if (target && window.__lenis) {
                    window.__lenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.2,
                        easing: (t) => 1 - Math.pow(1 - t, 4)
                    });
                } else if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${showAltNavbar ? 'navbar--alt-mode' : ''}`}>
                <div className="navbar-inner">
                    <Link to="/" className="navbar-logo">
                        <img src="/images/wt-logo.png" alt="William Tell Productions" />
                    </Link>

                    <div className="nav-cols desktop-only">
                        {navColumns.map((col) => (
                            <div className="nav-col" key={col.primary.name}>
                                <Link
                                    to={col.primary.path}
                                    className={`nav-col__primary ${location.pathname === col.primary.path ? 'is-active' : ''}`}
                                    onClick={(e) => handleAnchorLinkClick(e, col.primary.path)}
                                >
                                    {col.primary.name}
                                </Link>
                                {col.secondary && (
                                    <Link
                                        to={col.secondary.path}
                                        className="nav-col__secondary"
                                        onClick={(e) => handleAnchorLinkClick(e, col.secondary.path)}
                                    >
                                        {col.secondary.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <Link to="/contact" className="nav-contact desktop-only">
                        Contact Us <ArrowUpRight size={14} strokeWidth={1.5} />
                    </Link>

                    <button
                        className="mobile-toggle mobile-only"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-overlay"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <button className="mobile-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                            <X size={32} strokeWidth={1.5} />
                        </button>

                        <div className="mobile-nav-links">
                            <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                            {navColumns.map((col) => (
                                <div key={col.primary.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Link
                                        to={col.primary.path}
                                        className="mobile-nav-link"
                                        onClick={(e) => {
                                            setMobileMenuOpen(false);
                                            handleAnchorLinkClick(e, col.primary.path);
                                        }}
                                    >
                                        {col.primary.name}
                                    </Link>
                                    {col.secondary && (
                                        <Link
                                            to={col.secondary.path}
                                            className="mobile-nav-sublink"
                                            onClick={(e) => {
                                                setMobileMenuOpen(false);
                                                handleAnchorLinkClick(e, col.secondary.path);
                                            }}
                                        >
                                            {col.secondary.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mobile-footer">
                            <p>William Tell Productions © {new Date().getFullYear()}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
