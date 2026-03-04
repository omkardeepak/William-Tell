import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer section">
            <div className="container">
                <div className="footer-cta">
                    <h2 className="title-massive">
                        LET'S MAKE<br />
                        SOMETHING<br />
                        <span className="accent-text">ICONIC.</span>
                    </h2>
                    <Link to="/contact" className="footer-btn">
                        START A PROJECT <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="footer-grid">
                    <div className="footer-col">
                        <h4 className="footer-subtitle">Contact</h4>
                        <a href="mailto:hello@williamtell.com" className="footer-link">hello@williamtell.com</a>
                        <a href="tel:+1234567890" className="footer-link">+1 (234) 567-890</a>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-subtitle">Social</h4>
                        <a href="#" className="footer-link">Instagram</a>
                        <a href="#" className="footer-link">Vimeo</a>
                        <a href="#" className="footer-link">LinkedIn</a>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-subtitle">Location</h4>
                        <p className="footer-text">123 Creative Studio,<br />Los Angeles, CA 90028</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} WILLIAM TELL PRODUCTION COMPANY.</p>
                    <p>ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
