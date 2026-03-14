import { motion } from 'framer-motion';
import './CurtainIntro.css';

const CurtainIntro = ({ isReady = true }) => {
    return (
        <motion.div
            className="curtain-wrapper"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            animate={{ opacity: isReady ? 0 : 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{
                pointerEvents: isReady ? 'none' : 'auto',
                backgroundColor: '#060606',
                zIndex: 9999,
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: isReady ? 0 : 1,
                    scale: isReady ? 1.05 : 1
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut"
                }}
                style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}
            >
                <img src="/images/wt-logo.png" alt="William Tell" className="curtain-logo" />
                <motion.div
                    className="curtain-dot"
                    animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.9, 1.7, 0.9]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

export default CurtainIntro;
