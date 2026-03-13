import { motion } from 'framer-motion';
import './CurtainIntro.css';

const CurtainIntro = () => {
    const panels = [0, 1, 2, 3, 4];
    return (
        <div className="curtain-wrapper" aria-hidden="true">
            {panels.map((i) => (
                <motion.div
                    key={i}
                    className="curtain-panel"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{
                        duration: 0.9,
                        delay: i * 0.07,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    style={{ transformOrigin: 'top' }}
                />
            ))}
            {/* Overlay text during curtain */}
            <motion.div
                className="curtain-label"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <img src="/images/wt-logo.png" alt="William Tell" className="curtain-logo" />
            </motion.div>
        </div>
    );
};

export default CurtainIntro;
