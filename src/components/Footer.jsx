import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/* ── Shared easing for CSS transitions ── */
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/* ── Single reveal column ── */
const Col = ({ children, delay }) => {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVis(true); },
            { threshold: 0.2 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div
            ref={ref}
            className="footer-col"
            style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'translateY(0)' : 'translateY(22px)',
                transition: `opacity 0.75s ${EASE} ${delay}s, transform 0.75s ${EASE} ${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

export default function Footer() {
    const ruleRef = useRef(null);
    const [ruleVis, setRuleVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setRuleVis(true); },
            { threshold: 0.5 }
        );
        if (ruleRef.current) obs.observe(ruleRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <footer className="footer section">
            <div className="container">
                <div className="footer-grid">

                    <Col delay={0}>
                        <h4 className="footer-subtitle">Contact</h4>
                        <a href="mailto:hello@williamtell.com" className="footer-link">hello@williamtell.com</a>
                        <a href="tel:+1234567890" className="footer-link">+1 (234) 567-890</a>
                    </Col>

                    <Col delay={0.1}>
                        <h4 className="footer-subtitle">Social</h4>
                        <a href="#" className="footer-link">Instagram</a>
                        <a href="#" className="footer-link">Vimeo</a>
                        <a href="#" className="footer-link">LinkedIn</a>
                    </Col>

                    <Col delay={0.2}>
                        <h4 className="footer-subtitle">Location</h4>
                        <p className="footer-text">123 Creative Studio,<br />Los Angeles, CA 90028</p>
                    </Col>

                </div>

                {/* Animated rule */}
                <div
                    ref={ruleRef}
                    style={{
                        height: '1px',
                        background: 'rgba(255,255,255,0.07)',
                        margin: '3rem 0 1.5rem',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                        transform: ruleVis ? 'translateX(100%)' : 'translateX(-100%)',
                        transition: `transform 1.4s ${EASE} 0.3s`,
                    }} />
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} WILLIAM TELL PRODUCTION COMPANY.</p>
                    <p>ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
