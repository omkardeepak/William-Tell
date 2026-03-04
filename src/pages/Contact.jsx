import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Contact.css';

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
            <div style={{ height: '120px' }}></div>
            <div className="container">

                <section className="contact-hero section">
                    <motion.h1
                        className="title-massive"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        LET'S<br /><span className="accent-text">COLLABORATE.</span>
                    </motion.h1>
                    <motion.p
                        className="contact-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Have a project in mind? Let's make it iconic.
                    </motion.p>
                </section>

                <section className="contact-content">
                    <div className="contact-grid">

                        <motion.div
                            className="contact-info"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="info-block">
                                <h3>NEW BUSINESS</h3>
                                <a href="mailto:hello@williamtell.com">hello@williamtell.com</a>
                            </div>
                            <div className="info-block">
                                <h3>CAREERS</h3>
                                <a href="mailto:careers@williamtell.com">careers@williamtell.com</a>
                            </div>
                            <div className="info-block">
                                <h3>OFFICE</h3>
                                <p>123 Creative Studio<br />Hollywood, CA 90028<br />United States</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="contact-form-container"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="YOUR NAME *"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group half">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="EMAIL *"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group half">
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="COMPANY"
                                            value={formData.company}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <select
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>ESTIMATED BUDGET</option>
                                        <option value="< 10k">Less than $10k</option>
                                        <option value="10k-50k">$10k - $50k</option>
                                        <option value="50k-100k">$50k - $100k</option>
                                        <option value="> 100k">$100k+</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        placeholder="TELL US ABOUT YOUR PROJECT *"
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn btn-primary">
                                    <span className="btn-content">SUBMIT INQUIRY <ArrowRight size={18} /></span>
                                </button>
                            </form>
                        </motion.div>

                    </div>
                </section>
            </div>
        </div>
    );
}
