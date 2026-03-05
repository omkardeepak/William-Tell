import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

// Nav columns: each has a primary link and an optional secondary link
const navColumns = [
    { primary: { name: 'Works', path: '/works' }, secondary: { name: 'Showreel', path: '/works' } },
    { primary: { name: 'About', path: '/about' }, secondary: { name: 'Story', path: '/about' } },
    { primary: { name: 'Contact', path: '/contact' }, secondary: { name: 'Find Us', path: '/contact' } },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
                <div className="navbar-inner">

                    {/* ── Logo ── */}
                    <Link to="/" className="navbar-logo">
                        <img src="/images/wt-logo.png" alt="William Tell Productions" />
                    </Link>

                    {/* ── Desktop: columnar nav ── */}
                    <div className="nav-cols desktop-only">
                        {navColumns.map((col) => (
                            <div className="nav-col" key={col.primary.name}>
                                <Link
                                    to={col.primary.path}
                                    className={`nav-col__primary ${location.pathname === col.primary.path ? 'is-active' : ''}`}
                                >
                                    {col.primary.name}
                                </Link>
                                <Link
                                    to={col.secondary.path}
                                    className="nav-col__secondary"
                                >
                                    {col.secondary.name}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* ── Contact CTA ── */}
                    <Link to="/contact" className="nav-contact desktop-only">
                        Contact Us <ArrowUpRight size={14} strokeWidth={1.5} />
                    </Link>

                    {/* ── Mobile toggle ── */}
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

            {/* ── Mobile full-screen overlay ── */}
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
                                <Link
                                    key={col.primary.name}
                                    to={col.primary.path}
                                    className="mobile-nav-link"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {col.primary.name}
                                </Link>
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
