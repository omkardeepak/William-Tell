import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';


export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showAltNavbar, setShowAltNavbar] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';
    const navColumns = [
        { primary: { name: 'Work', path: '/#works' } },
        { primary: { name: 'About', path: '/#about' } },
        { primary: { name: 'Contact', path: '/contact' } },
    ];

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
        if (path.includes('#')) {
            const hash = path.substring(path.indexOf('#'));
            const targetId = hash.replace('#', '');

            if (hash === '#stories-in-motion') {
                // Re-dispatch event to ensure hero is expanded
                window.dispatchEvent(new Event('forceExpandHero'));
            }

            if (location.pathname === '/' && path.startsWith('/#')) {
                e.preventDefault();
                const target = document.getElementById(targetId);
                if (target) {
                    if (window.__lenis) {
                        window.__lenis.scrollTo(target, {
                            offset: -80,
                            duration: 1.2,
                            easing: (t) => 1 - Math.pow(1 - t, 4)
                        });
                    } else {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                    window.history.pushState(null, '', path);
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
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <button className="mobile-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                            <X size={32} strokeWidth={1.5} />
                        </button>

                        <motion.div
                            className="mobile-nav-links"
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                        >
                            {[
                                <Link key="home" to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>,
                                ...navColumns.flatMap((col) => [
                                    <Link
                                        key={col.primary.name}
                                        to={col.primary.path}
                                        className="mobile-nav-link"
                                        onClick={(e) => { setMobileMenuOpen(false); handleAnchorLinkClick(e, col.primary.path); }}
                                    >
                                        {col.primary.name}
                                    </Link>,
                                    col.secondary && (
                                        <Link
                                            key={col.secondary.name}
                                            to={col.secondary.path}
                                            className="mobile-nav-sublink"
                                            onClick={(e) => { setMobileMenuOpen(false); handleAnchorLinkClick(e, col.secondary.path); }}
                                        >
                                            {col.secondary.name}
                                        </Link>
                                    ),
                                ].filter(Boolean)),
                            ].map((el, i) => (
                                <motion.div
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 18 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                                    }}
                                >
                                    {el}
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="mobile-footer">
                            <p>William Tell Productions © {new Date().getFullYear()}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
