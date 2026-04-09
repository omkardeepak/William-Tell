import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CurtainIntro from '../components/CurtainIntro';
import './Contact.css';

/* ── Shared easing ── */
const EASE = [0.16, 1, 0.3, 1];

/* ── Line-mask reveal: text slides up from below a hard clip edge ── */
const LineReveal = ({ children, delay = 0, className = '' }) => (
    <span style={{ display: 'block', overflow: 'hidden' }} className={className}>
        <motion.span
            style={{ display: 'block' }}
            initial={{ y: '105%', rotate: 1.5 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 1.0, delay, ease: EASE }}
        >
            {children}
        </motion.span>
    </span>
);

/* ── Staggered word reveal ── */
const WordReveal = ({ text, delay = 0, className = '' }) => (
    <motion.span
        className={className}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    >
        {text.split(' ').map((w, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
                <motion.span
                    style={{ display: 'inline-block' }}
                    variants={{
                        hidden: { y: '100%', opacity: 0 },
                        visible: { y: '0%', opacity: 1, transition: { duration: 0.65, ease: EASE } },
                    }}
                >
                    {w}
                </motion.span>
            </span>
        ))}
    </motion.span>
);

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Normally handle form submission here
        alert("Message sent. We will get back to you shortly.");
        setFormData({ name: '', email: '', company: '', budget: '', message: '' });
    };

    return (
        <div className="contact-page">
            <CurtainIntro />
            <div style={{ height: '120px' }} />
            <div className="container">

                {/* ── Hero heading: line-mask ── */}
                <section className="contact-hero section">
                    <h1 className="title-massive" style={{ overflow: 'hidden' }}>
                        <LineReveal delay={0.5}>LET'S</LineReveal>
                        <LineReveal delay={0.65}>
                            <span className="accent-text">COLLABORATE.</span>
                        </LineReveal>
                    </h1>

                    <p className="contact-subtitle" style={{ marginTop: '1.5rem' }}>
                        <WordReveal text="Have a project in mind? Let's make it iconic." delay={0.9} />
                    </p>
                </section>

                <section className="contact-content">
                    <div className="contact-grid">

                        {/* ── Info blocks: staggered entry ── */}
                        <motion.div
                            className="contact-info"
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.14, delayChildren: 1.0 } } }}
                        >
                            {[
                                { label: 'NEW BUSINESS', value: 'hello@williamtell.com', href: 'mailto:hello@williamtell.com' },
                                { label: 'CAREERS', value: 'careers@williamtell.com', href: 'mailto:careers@williamtell.com' },
                                { label: 'OFFICE', value: '123 Creative Studio\nHollywood, CA 90028\nUnited States', href: null },
                            ].map(({ label, value, href }) => (
                                <motion.div
                                    key={label}
                                    className="info-block"
                                    variants={{
                                        hidden: { opacity: 0, y: 18 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                                    }}
                                >
                                    <h3>{label}</h3>
                                    {href
                                        ? <a href={href}>{value}</a>
                                        : <p style={{ whiteSpace: 'pre-line' }}>{value}</p>
                                    }
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* ── Form: cascading field reveal ── */}
                        <motion.div
                            className="contact-form-container"
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1.05 } } }}
                        >
                            <form className="contact-form" onSubmit={handleSubmit}>
                                {[
                                    <div className="form-group" key="name">
                                        <input type="text" name="name" placeholder="YOUR NAME *" required value={formData.name} onChange={handleChange} />
                                    </div>,
                                    <div className="form-row" key="email-co">
                                        <div className="form-group half">
                                            <input type="email" name="email" placeholder="EMAIL *" required value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className="form-group half">
                                            <input type="text" name="company" placeholder="COMPANY" value={formData.company} onChange={handleChange} />
                                        </div>
                                    </div>,
                                    <div className="form-group" key="budget">
                                        <select name="budget" value={formData.budget} onChange={handleChange}>
                                            <option value="" disabled>ESTIMATED BUDGET</option>
                                            <option value="< 10k">Less than $10k</option>
                                            <option value="10k-50k">$10k – $50k</option>
                                            <option value="50k-100k">$50k – $100k</option>
                                            <option value="> 100k">$100k+</option>
                                        </select>
                                    </div>,
                                    <div className="form-group" key="msg">
                                        <textarea name="message" placeholder="TELL US ABOUT YOUR PROJECT *" rows="4" required value={formData.message} onChange={handleChange} />
                                    </div>,
                                    <button type="submit" className="submit-btn btn-primary" key="btn">
                                        <span className="btn-content">SUBMIT INQUIRY <ArrowRight size={18} /></span>
                                    </button>,
                                ].map((el, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: 16 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                                        }}
                                    >
                                        {el}
                                    </motion.div>
                                ))}
                            </form>
                        </motion.div>

                    </div>
                </section>
            </div>
        </div>
    );
}
