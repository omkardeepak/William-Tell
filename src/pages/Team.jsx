import { motion } from 'framer-motion';
import CurtainIntro from '../components/CurtainIntro';
import './Team.css';

export default function Team() {
    return (
        <div className="team-page">
            <CurtainIntro />

            <section className="team-hero">
                <div className="team-container">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <p className="team-eyebrow">The Team</p>
                    </motion.div>

                    <motion.h1
                        className="team-hero-heading"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 0.8,
                                },
                            },
                        }}
                    >
                        <span className="hero-line-mask">
                            <motion.span
                                className="hero-line hero-line-1"
                                variants={{
                                    hidden: { y: '105%', rotate: 2 },
                                    visible: {
                                        y: 0,
                                        rotate: 0,
                                        transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                                    }
                                }}
                            >
                                Comming
                            </motion.span>
                        </span>
                        <span className="hero-line-mask">
                            <motion.span
                                className="hero-line hero-line-2"
                                variants={{
                                    hidden: { y: '105%', rotate: 2 },
                                    visible: {
                                        y: 0,
                                        rotate: 0,
                                        transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                                    }
                                }}
                            >
                                soon...
                            </motion.span>
                        </span>
                    </motion.h1>

                    <motion.div
                        className="team-hero-divider"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 1.4, ease: [0.19, 1, 0.22, 1] }}
                    />
                </div>
            </section>
        </div>
    );
}
