import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Contact.css';

export default function Contact() {
    return (
        <motion.div
            className="contact-mega-page"
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
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
                            <em style={{ fontStyle: 'italic', fontFamily: '"Playfair Display", serif', fontWeight: 400, marginRight: '4px' }}>WILLIAMTELL </em> PRODUCTIONS
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
                            <span className="col-sub">William Tell Productions</span>
                            <a href="tel:+919562720106">+91 95627 20106</a>

                            <span className="col-sub" style={{ marginTop: '1.2rem' }}>Jain Mary John</span>
                            <a href="tel:+916238652343">+91 62386 52343</a>
                        </div>

                        <div className="mega-link-col">
                            <h4>Enquiries</h4>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@williamtellads.com&cc=director@williamtellads.com&su=Client%20Enquiry" target="_blank" rel="noopener noreferrer">Client Enquiry</a>

                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=media.williamtell@gmail.com&cc=director@williamtellads.com&su=Careers" target="_blank" rel="noopener noreferrer">Careers</a>
                        </div>
                        <div className="mega-link-col">
                            <h4>Socials</h4>
                            <a href="https://www.instagram.com/williamtellproductions" target="_blank" rel="noreferrer">Instagram</a>
                            <a href="https://www.youtube.com/@WilliamTellProductions" target="_blank" rel="noreferrer">YouTube</a>
                            <a href="https://www.linkedin.com/company/williamtell-productions/" target="_blank" rel="noreferrer">LinkedIn</a>
                        </div>
                        <div className="mega-link-col">
                            <h4>Location</h4>
                            <p style={{ lineHeight: '1.6', marginBottom: '1.2rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                                No 42/2511 A, Door, Vennala Janatha Rd,<br />
                                near Century Club Lane, PO,<br />
                                Vennala, Kochi, Ernakulam,<br />
                                Kerala 682028
                            </p>
                            <a href="https://www.google.com/maps/place/Nte+Media+LLP/@9.9988598,76.3146028,17z/data=!3m1!4b1!4m6!3m5!1s0x3b080db75280bb39:0x8064d5bc354b7aea!8m2!3d9.9988598!4d76.3146028!16s%2Fg%2F11w36v1363!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQwNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="view-maps-btn">View in Maps <span>→</span></a>
                        </div>


                    </div>
                </motion.div>

                <div className="mega-bottom-bar" style={{ justifyContent: 'flex-end' }}>
                    <div className="mega-bottom-right">
                        <span>Privacy Policy</span>
                        <span>Terms and conditions</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
