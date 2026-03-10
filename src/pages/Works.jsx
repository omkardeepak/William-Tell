import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Works.css';

const categories = ["All", "Films", "Hoardings", "Metro Pillars", "Magazines", "Rebranding", "Digital Marketing", "Social Media"];

const projects = [
    { id: 1, title: "The Midnight Drive", category: "Films", image: "/images/works_cinematic_1772450874161.png" },
    { id: 2, title: "Neon Nights", category: "Hoardings", image: "/images/billboard_ad_1772450987520.png" },
    { id: 3, title: "Social Evolution", category: "Digital Marketing", image: "/images/digital_marketing_1772451008183.png" },
    { id: 4, title: "Urban Escape", category: "Metro Pillars", image: "/images/hero_bg_1772450857844.png" },
    { id: 5, title: "Vogue Forward", category: "Magazines", image: "/images/works_cinematic_1772450874161.png" },
    { id: 6, title: "Identity Shift", category: "Rebranding", image: "/images/billboard_ad_1772450987520.png" },
    { id: 7, title: " viral_campaign.mp4 ", category: "Social Media", image: "/images/digital_marketing_1772451008183.png" },
];

export default function Works() {
    const [activeCategory, setActiveCategory] = useState("All");

    // Pre-select category from URL query param ?category=Films
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category');
        if (cat && categories.includes(cat)) {
            setActiveCategory(cat);
            // Scroll to filter section after a short delay so the page renders first
            setTimeout(() => {
                const el = document.getElementById('category-filter');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
        }
    }, []);

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="works-page">
            <div style={{ height: '120px' }}></div>
            <div className="container">

                <section className="works-hero section">
                    <motion.h1
                        className="title-massive"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        OUR<br /><span className="accent-text">ARCHIVES.</span>
                    </motion.h1>
                </section>

                <div id="category-filter" className="category-filter">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div
                    className="works-grid-main"
                    layout
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                className="work-item"
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="work-image-container">
                                    <img src={project.image} alt={project.title} />
                                    <div className="work-overlay">
                                        <span className="view-text">VIEW PROJECT</span>
                                    </div>
                                </div>
                                <div className="work-details">
                                    <h3>{project.title}</h3>
                                    <p>{project.category}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </div>
    );
}
