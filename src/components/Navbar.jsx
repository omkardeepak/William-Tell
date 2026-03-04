import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navLinks = [
    { name: 'Works', path: '/works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled glass-effect' : ''}`}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        WILLIAM<br />TELL.
                    </Link>

                    {/* Desktop Nav */}
                    <div className="nav-links desktop-only">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/contact" className="nav-btn">Lest Talk</Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle mobile-only"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Full Screen Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>
                            <X size={40} />
                        </button>
                        <div className="mobile-nav-links">
                            <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="mobile-nav-link"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mobile-footer">
                            <p>WILLIAM TELL © {new Date().getFullYear()}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
