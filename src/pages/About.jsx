import { motion } from 'framer-motion';
import './About.css';

export default function About() {
    return (
        <div className="about">
            {/* Spacer for navbar */}
            <div style={{ height: '120px' }}></div>

            <div className="container">
                <section className="about-hero section">
                    <motion.h1
                        className="title-massive"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        WE DON'T<br />JUST PRODUCE.<br />
                        <span className="accent-text">WE REINVENT.</span>
                    </motion.h1>
                </section>

                <section className="about-content section">
                    <div className="about-grid">
                        <motion.div
                            className="about-image-wrapper"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src="/images/hero_bg_1772450857844.png" alt="Studio Setup" />
                        </motion.div>

                        <div className="about-text-container">
                            <motion.h2
                                className="about-subtitle"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                THE PHILOSOPHY
                            </motion.h2>
                            <motion.p
                                className="about-description"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                At William Tell Production Company, we blur the line between commercial advertising and cinematic art. We believe that every brand has a story that deserves to be told with magnitude and visual excellence.
                                <br /><br />
                                Our team consists of visionary directors, meticulous strategists, and innovative designers who collaborate to create work that doesn't just look good, but shifts culture and drives results.
                            </motion.p>

                            <motion.div
                                className="stats-grid"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="stat-item">
                                    <h3>10+</h3>
                                    <p>Years of Excellence</p>
                                </div>
                                <div className="stat-item">
                                    <h3>500+</h3>
                                    <p>Projects Delivered</p>
                                </div>
                                <div className="stat-item">
                                    <h3>GLOBAL</h3>
                                    <p>Client Reach</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
