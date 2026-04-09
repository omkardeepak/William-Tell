import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import './ContactOverlay.css';

export default function ContactOverlay() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        const handleClose = () => setIsOpen(false);
        const handleToggle = () => setIsOpen(p => !p);

        window.addEventListener('openContact', handleOpen);
        window.addEventListener('closeContact', handleClose);
        window.addEventListener('toggleContact', handleToggle);

        // Auto-open if route is /contact
        if (location.pathname === '/contact') {
            setIsOpen(true);
        }

        return () => {
            window.removeEventListener('openContact', handleOpen);
            window.removeEventListener('closeContact', handleClose);
            window.removeEventListener('toggleContact', handleToggle);
        };
    }, [location.pathname]);

    // Handle closing when navigation occurs internally
    useEffect(() => {
        if (isOpen && location.pathname !== '/contact') {
            setIsOpen(false);
        }
    }, [location.pathname]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (window.__lenis) window.__lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (window.__lenis) window.__lenis.start();
        }
    }, [isOpen]);

    const handleCloseOverlay = () => {
        setIsOpen(false);
        // If we are on /contact, navigating back is polite, otherwise just close
        if (location.pathname === '/contact') {
            navigate('/');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="contact-mega-overlay"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >


                    <div className="mega-overlay-inner">
                        {/* Top Hero Section */}
                        <div className="mega-hero">
                            <motion.h2 
                                className="mega-title"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                Let's collaborate and<br />
                                build something iconic
                            </motion.h2>
                            
                            <motion.p 
                                className="mega-subtitle-top"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                Partner with William Tell Productions for visionary brand storytelling,<br /> cinematic commercials, and motion art that shifts culture.
                            </motion.p>
                        </div>

                        {/* Huge Decorative Background Text */}
                        <div className="mega-bg-text">
                            WILLIAM TELL
                        </div>

                        {/* Bottom Multi-Column Footer Layout */}
                        <motion.div 
                            className="mega-footer-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 1 }}
                        >
                            {/* Brand Info Left Section */}
                            <div className="mega-brand-col">
                                <h3 className="mega-brand-name">
                                    <em style={{ fontStyle: 'italic', fontFamily: '"Playfair Display", serif', fontWeight: 400, marginRight: '4px' }}>WILLIAMTELL</em> PRODUCTIONS
                                </h3>
                                <p className="mega-brand-desc">
                                    Williamtell Productions Pvt. Ltd. merges cinematic art with commercial results. 
                                    Impact is our standard. Every frame, every cut, every campaign — crafted to leave a mark.
                                </p>
                            </div>

                            {/* 4 Column Links Right Section */}
                            <div className="mega-links-container">
                                <div className="mega-link-col">
                                    <h4>Contact</h4>
                                    <span className="col-sub">Creative Director</span>
                                    <a href="tel:+916238652343">+91 62386 52343</a>
                                    
                                    <span className="col-sub" style={{ marginTop: '1.2rem' }}>Vipin Williamtells</span>
                                    <a href="tel:+919562720106">+91 95627 20106</a>
                                </div>

                                <div className="mega-link-col">
                                    <h4>Categories</h4>
                                    <Link to="/works" onClick={handleCloseOverlay}>Commercials</Link>
                                    <Link to="/works" onClick={handleCloseOverlay}>Fashion Films</Link>
                                    <Link to="/works" onClick={handleCloseOverlay}>Strategy</Link>
                                    <Link to="/works" onClick={handleCloseOverlay}>Motion Art</Link>
                                </div>

                                <div className="mega-link-col">
                                    <h4>Pages</h4>
                                    <Link to="/" onClick={handleCloseOverlay}>Home</Link>
                                    <Link to="/works" onClick={handleCloseOverlay}>Work</Link>
                                    <Link to="/about" onClick={handleCloseOverlay}>About Us</Link>
                                    <p onClick={() => {}} style={{ cursor: 'pointer', color: '#fff' }}>Contact Us</p>
                                </div>

                                <div className="mega-link-col">
                                    <h4>Socials / Link</h4>
                                    <a href="https://www.instagram.com/williamtellproductions?igsh=cjQxNnUyejF2aGs5" target="_blank" rel="noreferrer">Instagram</a>
                                    <a href="https://www.youtube.com/@WilliamTellProductions" target="_blank" rel="noreferrer">YouTube</a>
                                    <a href="https://www.linkedin.com/company/williamtell-productions/" target="_blank" rel="noreferrer">LinkedIn</a>
                                </div>
                            </div>
                        </motion.div>

                        <div className="mega-bottom-bar">
                            <p>No 42/2511 A, Door, Vennala Janatha Rd, near Century Club Lane, PO, Vennala, Kochi, Ernakulam, Kerala 682028</p>
                            <div className="mega-bottom-right">
                                <span>Privacy Policy</span>
                                <span>Terms and conditions</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
