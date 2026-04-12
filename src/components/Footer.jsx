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

                    {/* ── Contact column ── */}
                    <Col delay={0}>
                        <h4 className="footer-subtitle">Contact</h4>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p className="footer-text" style={{ margin: 0, fontWeight: 500 }}>Vipin Chandran</p>
                            <a href="tel:+919562720106" className="footer-link" style={{ marginTop: '0.2rem' }}>+91 95627 20106</a>
                        </div>
                        
                        <div>
                            <p className="footer-text" style={{ margin: 0, fontWeight: 500 }}>Jain Mary John</p>
                            <a href="tel:+916238652343" className="footer-link" style={{ marginTop: '0.2rem' }}>+91 62386 52343</a>
                        </div>
                    </Col>

                    {/* ── Social column ── */}
                    <Col delay={0.1}>
                        <h4 className="footer-subtitle">Social</h4>
                        <a href="https://www.instagram.com/williamtellproductions?igsh=cjQxNnUyejF2aGs5" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
                        <a href="https://www.youtube.com/@WilliamTellProductions" target="_blank" rel="noopener noreferrer" className="footer-link">YouTube</a>
                        <a href="https://www.linkedin.com/company/williamtell-productions/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                    </Col>

                    {/* ── Location column ── */}
                    <Col delay={0.2}>
                        <h4 className="footer-subtitle">Location</h4>
                        <p className="footer-text" style={{ fontSize: '0.95rem' }}>
                            No 42/2511 A, Door,<br />
                            Vennala Janatha Rd,<br />
                            near Century Club Lane, PO,<br />
                            Vennala, Kochi,<br />
                            Ernakulam, Kerala 682028
                        </p>
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
                    <p>© {new Date().getFullYear()} WILLIAMTELL PRODUCTIONS PVT. LTD.</p>
                    <p>ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
