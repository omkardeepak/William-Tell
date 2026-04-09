import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ── Arts data ── */
const artsData = [
    { id: 1, title: "Storytelling", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(1).png" },
    { id: 2, title: "Brand Identity", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(5).png" },
    { id: 3, title: "Campaign", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(3).png" },
    { id: 4, title: "Production", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(2).png" },
    { id: 5, title: "Visual Story", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(6).png" },
    { id: 6, title: "The Archive", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image.png" },
    { id: 7, title: "Cinematic Frame", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(7).png" },
    { id: 8, title: "Digital Story", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(8).png" },
    { id: 9, title: "Editorial", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(4).png" },
    { id: 10, title: "Direction", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(10).png" },
    { id: 11, title: "Motion Art", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(9).png" }
];

const ArtSection = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % artsData.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + artsData.length) % artsData.length);
    }, []);

    useEffect(() => {
        // Pause auto loop on hover to let users view without it sliding away
        if (isHovered) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(timer);
    }, [isHovered, nextSlide]);

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        },
        exit: (dir) => ({
            zIndex: 0,
            x: dir < 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        })
    };

    return (
        <div className="art-wrapper" id="archives">
            <style>{artSectionStyles}</style>

            <div className="art-section-header">
                <motion.span
                    className="art-eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Portfolio
                </motion.span>

                <h2 className="art-title">
                    {"Browse Our Archives".split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.1,
                                ease: [0.21, 1, 0.36, 1]
                            }}
                            style={{ display: "inline-block", marginRight: "0.4em" }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h2>
            </div>

            <div
                className="carousel-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="carousel-container">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="carousel-slide"
                        >
                            <img
                                src={artsData[currentIndex].src}
                                alt={artsData[currentIndex].title}
                                className="carousel-image"
                            />
                            <div className="carousel-caption">
                                <span>{artsData[currentIndex].title}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="carousel-controls">
                    <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous image">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button className="carousel-btn next" onClick={nextSlide} aria-label="Next image">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                <div className="carousel-indicators">
                    {artsData.map((_, idx) => (
                        <button
                            key={idx}
                            className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="art-footer-action">
                <motion.button
                    className="art-view-btn"
                    onClick={() => navigate("/works", { state: { expandSection: 'art' } })}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                    <span>View All Works</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </motion.button>
            </div>

        </div>
    );
};


/* ── Styles ── */

const artSectionStyles = `

.art-wrapper{
    position:relative;
    padding: 6rem 0 8rem;
    background:transparent;
    color:#fff;
    font-family: 'Outfit', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.art-section-header{
    text-align:center;
    margin-bottom: 3rem;
    z-index:20;
    width: 100%;
    max-width: 1200px;
}

.art-eyebrow{
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: rgba(255,255,255,0.4);
    display: block;
    margin-bottom: 1rem;
}

.art-title{
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    margin: 0;
    letter-spacing: -0.02em;
}

.carousel-wrapper {
    position: relative;
    width: 100%;
    max-width: 1000px;
    padding: 0 1.5rem;
    margin-bottom: 4rem;
}

.carousel-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #0a0a0a;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.05);
}

.carousel-slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: transform, opacity;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.carousel-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2.5rem 1.5rem 1.2rem;
    background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 300;
}

.carousel-controls {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    z-index: 10;
}

.carousel-btn {
    pointer-events: auto;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: translateX(0);
}

.carousel-btn.prev {
    margin-left: -1rem;
}

.carousel-btn.next {
    margin-right: -1rem;
}

.carousel-btn:hover {
    background: rgba(255, 255, 255, 1);
    color: #000;
    transform: scale(1.1);
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.indicator-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    cursor: pointer;
    transition: all 0.4s ease;
    padding: 0;
}

.indicator-dot.active {
    background: rgba(255, 255, 255, 1);
    width: 24px;
    border-radius: 4px;
}

.indicator-dot:hover:not(.active) {
    background: rgba(255, 255, 255, 0.5);
}

.art-footer-action {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
}

.art-view-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.65rem 1.6rem;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.art-view-btn:hover {
    background: #fff;
    color: #000;
    border-color: #fff;
    gap: 1rem;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
}

.art-view-btn svg {
    transition: transform 0.4s ease;
    flex-shrink: 0;
}

.art-view-btn:hover svg {
    transform: translateX(4px);
    stroke: #000;
}

@media(max-width: 768px) {
    .art-wrapper {
        padding: 4rem 0 5rem;
    }
    .art-title {
        font-size: clamp(1.6rem, 7vw, 2.4rem);
    }
    .carousel-container {
        aspect-ratio: 4 / 5;
    }
    .carousel-btn {
        width: 34px;
        height: 34px;
    }
    .carousel-btn svg {
        width: 18px;
        height: 18px;
    }
    .carousel-btn.prev { margin-left: 0.5rem; }
    .carousel-btn.next { margin-right: 0.5rem; }
    .carousel-caption {
        padding: 2rem 1.5rem 1.5rem;
        font-size: 0.68rem;
    }
    .art-view-btn {
        font-size: 0.65rem;
        padding: 0.45rem 1.1rem;
    }
}

@media (max-width: 480px) {
    .art-wrapper {
        padding: 1.5rem 0;
    }
    .carousel-btn {
        width: 30px;
        height: 30px;
    }
    .carousel-btn svg {
        width: 14px;
        height: 14px;
    }
    .art-section-header {
        margin-bottom: 2.5rem;
    }
    .art-title {
        font-size: 1.5rem;
    }
    .art-eyebrow {
        font-size: 0.65rem;
    }
    .carousel-caption {
        font-size: 0.6rem;
    }
    .art-view-btn {
        font-size: 0.6rem;
        padding: 0.4rem 1rem;
    }
}
`;

export default ArtSection;