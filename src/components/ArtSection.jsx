import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="art-redesign-wrapper" id="archives">
            <style>{artRedesignStyles}</style>

            {/* HERO SECTION */}
            <div className="art-hero">
                <motion.div className="hero-img-stack" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                    <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/bb3.png?updatedAt=1779453540445" alt="Billboard 3" />
                    <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/bb2.png?updatedAt=1779453561074" alt="Billboard 2" />
                    <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/bb1.png?updatedAt=1779453519331" alt="Billboard 1" />
                </motion.div>
                
                <div className="hero-content">


                    <motion.h2 className="hero-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <span className="script-letter">M</span>ASTERING THE<br />ART OF STORYTELLING
                    </motion.h2>

                    <motion.div className="hero-bottom-row" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <div className="hero-desc">
                            From full-scale hoardings to metro pillar installations and magazine placements, we produce OOH print work built for impact at every size. Every format is designed with a provoking thought, starting with how it will actually be seen — in light, in motion, at a distance — so the work doesn't just fill a space, it owns it. Because outdoor is the only medium that doesn't ask for attention, it takes it. There are no skip buttons, no scroll, no algorithm deciding who sees it. Just the work, in the world, earning its place.
                        </div>
                    </motion.div>
                </div>
            </div>



            {/* MIDDLE SECTION */}
            <div className="art-middle" id="page-2">
                <div className="middle-left">
                    <motion.div className="middle-small-images" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <div className="small-img-wrap">
                            <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/gy.png?updatedAt=1779439230714" alt="Campaign" />
                        </div>
                        <div className="small-img-wrap">
                            <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/imagehv.png?updatedAt=1778664021584" alt="Production" />
                        </div>
                    </motion.div>

                    <motion.h2 className="middle-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <span style={{ display: 'block', textAlign: 'left', paddingLeft: '5%' }}><span className="script-letter">C</span>RAFTING PURPOSEFUL &</span>
                        <span style={{ display: 'block', textAlign: 'right', paddingRight: '5%', marginTop: '-0.15em' }}>STRIKING IMAGERY</span>
                    </motion.h2>
                    
                    <motion.p className="middle-desc" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        We stage and execute brand photoshoots at a standard that holds its own alongside category leaders. Working across lifestyle, product, and portrait formats, each shoot is built around a creative brief that ensures the imagery is purposeful, consistent, and ready to perform across every channel.
                    </motion.p>
                </div>


            </div>

            {/* BOTTOM SECTION */}
            <div className="art-bottom-redesigned">
                <div className="bottom-layout-grid">
                    <motion.h2 className="standard-title mobile-logo-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <span style={{ display: 'block', textAlign: 'left' }}><span className="script-letter">D</span>EFINING</span>
                        <span style={{ display: 'block', textAlign: 'right', marginTop: '-0.15em' }}>THE MARK</span>
                    </motion.h2>
                    
                    <motion.div className="bottom-left-col" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        
                        <div className="bottom-staggered-images">
                            <div className="stagger-img-wrap">
                                <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/jaccimage.png?updatedAt=1779453396427" alt="Logo 1" />
                            </div>
                            <div className="stagger-img-wrap">
                                <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/aryasimage.png?updatedAt=1779455897494" alt="Logo 2" />
                            </div>
                        </div>
                        
                        <p className="bottom-desc-new">
                            Some logos carry decades. Others launch them. We work across both, refining legacy identities that have earned their authority over time, and building new marks from scratch for products that need to own a space the moment they enter it.
                        </p>
                    </motion.div>

                    <motion.div className="bottom-right-col" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h2 className="standard-title desktop-logo-title">
                            <span style={{ display: 'block', textAlign: 'left' }}><span className="script-letter">D</span>EFINING</span>
                            <span style={{ display: 'block', textAlign: 'right', marginTop: '-0.15em' }}>THE MARK</span>
                        </h2>
                        <p className="bottom-desc-new" style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
                            Every logo we create is designed to be immediately legible, endlessly versatile, and impossible to mistake for anything else.
                        </p>
                        <div className="bottom-staggered-images">
                            <div className="stagger-img-wrap">
                                <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/carla.png?updatedAt=1779387403117" alt="Logo 3" />
                            </div>
                            <div className="stagger-img-wrap">
                                <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/canbean.png" alt="Logo 4" />
                            </div>
                        </div>
                    </motion.div>
                </div>


            </div>

            {/* CAMPAIGNS & CASE STUDIES SECTION */}
            <div className="art-package-identity">
                <motion.h2 className="standard-title mobile-campaign-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                    <span style={{ display: 'block', textAlign: 'left' }}><span className="script-letter">C</span>AMPAIGNS & <br /> CASE STUDIES</span>
                </motion.h2>
                <div className="package-left">
                    <motion.div className="campaign-mobile-img" style={{ width: '75%' }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <div className="stagger-img-wrap" style={{ width: '100%' }}>
                            <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/1.jpg?updatedAt=1778657767795" alt="Campaign" />
                        </div>
                    </motion.div>
                    
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h4 className="title-sans" style={{ marginBottom: '0.2rem', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                            MANAM NARAYE ONAKODI (MAHARANI SILKS)
                        </h4>
                        <p className="bottom-desc-new" style={{ marginTop: 0 }}>
                            A campaign for Maharani Silks centred around the spirit of Onam — not the product, but the feeling of coming together. The campaign generated significant visibility across the region and marked a turning point in establishing Maharani Silks as a household name in Kerala, and a huge campaign success for the brand.
                        </p>
                    </motion.div>
                </div>

                <motion.div className="package-right" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                    <motion.h2 className="standard-title desktop-campaign-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <span style={{ display: 'block', textAlign: 'left' }}><span className="script-letter">C</span>AMPAIGNS & <br /> CASE STUDIES</span>
                    </motion.h2>

                    <div style={{ marginTop: '2.5rem' }}>
                        <h4 className="title-sans" style={{ marginBottom: '0.2rem', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                            YOU DECIDE YOU (THEREFOR I'M)
                        </h4>
                        <p className="bottom-desc-new" style={{ marginTop: 0 }}>
                            A campaign built on a single conviction: identity is self-determined. Not assigned by society, not inherited by expectation. This campaign by the brand Therefor I'm was focused on giving people the language and the imagery to claim that, on their own terms.
                        </p>
                    </div>
                    <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/imageyou.png?updatedAt=1779389049738" alt="Case Studies" style={{ marginTop: '1.5rem' }} />
                </motion.div>
            </div>

            {/* PACKAGE & IDENTITY SECTION */}
            <div className="art-package-identity">
                <div className="package-left">
                    <motion.div className="package-small-images" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <div className="stagger-img-wrap">
                            <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/bm.png?updatedAt=1779388746092" alt="Package 1" />
                        </div>
                        <div className="stagger-img-wrap staggered-down">
                            <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/crad.png?updatedAt=1779388745825" alt="Package 2" />
                        </div>
                        <div className="stagger-img-wrap">
                            <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/aryas.png?updatedAt=1779388746580" alt="Package 3" />
                        </div>
                    </motion.div>

                    <motion.h2 className="standard-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <span style={{ display: 'block', textAlign: 'left' }}><span className="script-letter">P</span>RODUCT PACKAGE</span>
                        <span style={{ display: 'block', textAlign: 'right', marginTop: '-0.15em' }}>DESIGNS</span>
                    </motion.h2>
                    
                    <motion.p className="bottom-desc-new" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        A product's packaging is its first salesperson. We design with that weight in mind — every label, every bottle, every box considered from the perspective of the person picking it up for the first time. From oil bottles with semi-transparent covers that make quality visible before a word is read, to sunscreen ranges built around a clean and confident shelf presence, the work is always in service of one thing: making the product impossible to put back down.
                    </motion.p>
                </div>

                <motion.div className="package-right" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                    <h2 className="standard-title">
                        <span style={{ display: 'block', textAlign: 'left' }}><span className="script-letter">B</span>RAND IDENTITY</span>
                        <span style={{ display: 'block', textAlign: 'right', marginTop: '-0.15em' }}>DESIGN</span>
                    </h2>
                    <p className="bottom-desc-new">
                        Identity doesn't stop at a logo. It lives on the side of a vehicle, on a hoarding at a junction, under an umbrella at an event. We build visual systems designed to travel, coherent across every surface, every format, every context. So that wherever the brand appears, it's recognised. And wherever it's recognised, it's trusted.
                    </p>
                    <img src="https://ik.imagekit.io/r70knk9pu/William%20Tell/brand.png?updatedAt=1779388901021" alt="Brand Identity" style={{ marginTop: '1.5rem' }} />
                </motion.div>
            </div>

        </div>
    );
};

const artRedesignStyles = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

.art-redesign-wrapper {
    padding: 6rem 5% 2rem;
    color: #fff;
    font-family: 'Outfit', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 7rem;
    background: transparent;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    overflow: hidden;
}

.script-letter {
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    margin-right: 0;
    display: inline;
    transform: none;
}

/* HERO SECTION */
.art-hero {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 5%;
    align-items: start;
}

.hero-img-stack {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
}

.hero-img-stack img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 2px;
    transition: transform 0.6s ease;
}

.hero-img-stack:hover img {
    /* Optional: Add hover effect to the stack if desired, or leave as is */
}

.small-img-wrap img, .bottom-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.small-img-wrap:hover img, .bottom-img-wrap:hover img {
    transform: scale(1.05);
}

.hero-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-top: 1rem;
}



.hero-title {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: clamp(3rem, 5vw, 5.5rem);
    line-height: 0.9;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: -0.02em;
}

.hero-bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
}

.hero-desc {
    flex: 1;
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.1rem, 2.3vw, 1.45rem);
    font-weight: 300;
    line-height: 1.85;
    color: rgba(255, 255, 255, 0.78);
    max-width: 600px;
    text-align: justify;
}

.btn-primary {
    margin-top: 2.5rem;
    padding: 1rem 2.5rem;
    background: #fff;
    color: #000;
    border: none;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.btn-primary:hover {
    background: #e0e0e0;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255,255,255,0.1);
}



/* MIDDLE SECTION */
.art-middle {
    display: block;
    width: 100%;
}

.middle-left {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.middle-small-images {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2%;
    width: 100%;
}

.small-img-wrap {
    width: 100%;
    overflow: hidden;
}

.img-num {
    display: block;
    font-size: 0.7rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
    color: rgba(255,255,255,0.5);
}

.small-img-wrap img {
    height: auto;
    aspect-ratio: auto;
    filter: brightness(0.65);
}

.middle-title {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: clamp(2.5rem, 4.5vw, 4.5rem);
    line-height: 0.9;
    text-transform: uppercase;
    margin: -6rem 0 0 0;
    position: relative;
    z-index: 2;
    letter-spacing: -0.02em;
    text-shadow: 0 4px 20px rgba(0,0,0,0.6);
}

.middle-desc {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.1rem, 2.3vw, 1.45rem);
    font-weight: 300;
    line-height: 1.85;
    color: rgba(255, 255, 255, 0.78);
    max-width: 85%;
    margin: 0;
    text-align: justify;
}



/* STATS */
.art-stats {
    display: flex;
    justify-content: center;
    gap: 15%;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 4rem;
    text-align: center;
}

.stat-item h3 {
    font-size: clamp(2.5rem, 4vw, 4rem);
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: #fff;
    letter-spacing: -0.02em;
}

.stat-item p {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    margin: 0;
}

/* BOTTOM SECTION */
.art-bottom-redesigned {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6rem;
    width: 100%;
}

.bottom-layout-grid {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 8%;
    width: 100%;
    align-items: stretch;
}

.bottom-left-col {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.bottom-staggered-images {
    display: flex;
    gap: 1.5rem;
}

.stagger-img-wrap {
    width: 45%;
}

.staggered-down {
    margin-top: 3rem;
}

.stagger-img-wrap img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 2px;
}

.bottom-staggered-images .stagger-img-wrap img {
    height: 100%;
    aspect-ratio: 1.4;
}

.standard-title {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: clamp(2.5rem, 4.5vw, 4.5rem);
    line-height: 0.9;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: -0.02em;
    width: 100%;
}

.bottom-desc-new {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.1rem, 2.3vw, 1.45rem);
    font-weight: 300;
    line-height: 1.85;
    color: rgba(255, 255, 255, 0.78);
    margin: 0;
    max-width: 95%;
    text-align: justify;
}

.bottom-right-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}



/* PACKAGE & IDENTITY SECTION */
.art-package-identity {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 8%;
    align-items: center;
    width: 100%;
}

.mobile-campaign-title,
.mobile-logo-title {
    display: none;
}

.package-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.package-small-images {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    width: 100%;
}

.package-small-images .stagger-img-wrap {
    width: 100%;
}

.package-right {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.8rem;
}

.package-right img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 2px;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
    .art-hero, .art-middle {
        gap: 4%;
    }
    .hero-title, .middle-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
    }
}

@media (max-width: 768px) {
    .art-redesign-wrapper {
        gap: 4.5rem;
        padding: 4.5rem 5% 2rem;
    }
    .art-hero {
        display: flex;
        flex-direction: column;
    }
    .hero-content {
        order: -1;
        gap: 2rem;
    }
    .hero-img-stack {
        order: 1;
    }
    .art-package-identity {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    .mobile-campaign-title,
    .mobile-logo-title {
        display: block;
        margin-bottom: 0;
    }
    .desktop-campaign-title,
    .desktop-logo-title {
        display: none !important;
    }
    .hero-img-main {
        aspect-ratio: 16/10;
        margin-bottom: 1rem;
    }

    .art-middle {
        grid-template-columns: 1fr;
    }
    .middle-left {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .middle-left .middle-title { order: 1; margin: 0; }
    .middle-left .middle-desc { order: 2; }
    .middle-small-images { 
        order: 3; 
        grid-template-columns: 1fr; 
    }
    .small-img-wrap { width: 100% !important; }
    .small-img-wrap img { filter: none !important; }

    /* 3rd Page Reorder */
    .bottom-layout-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    .bottom-left-col, .bottom-right-col {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: flex-start;
    }
    .bottom-left-col .standard-title { order: 1; }
    .bottom-left-col .bottom-desc-new { order: 2; }
    .bottom-left-col .bottom-staggered-images { order: 3; }
    
    .bottom-staggered-images {
        flex-direction: column;
    }
    .stagger-img-wrap { width: 100% !important; }
    .staggered-down { margin-top: 0 !important; }

    /* 4th & 5th Page Reorder */
    .package-left, .package-right {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: flex-start;
    }
    .package-left .standard-title { order: 1; }
    .package-left > div:not(.package-small-images):not(.campaign-mobile-img) { order: 2; }
    .package-small-images, .campaign-mobile-img { 
        order: 3; 
        width: 100% !important;
    }
    .package-small-images {
        grid-template-columns: 1fr;
    }

    .middle-desc {
        max-width: 100%;
    }
    .art-stats {
        flex-wrap: wrap;
        gap: 2rem 10%;
    }
    .stat-item {
        flex: 1 1 40%;
    }
    .bottom-img-wrap {
        width: 100%;
        aspect-ratio: 16/9;
    }
}

@media (max-width: 480px) {
    .art-redesign-wrapper {
        padding: 3rem 5% 4rem;
        gap: 4rem;
    }
    .hero-bottom-row {
        flex-direction: column;
    }
    .middle-small-images {
        gap: 1rem;
    }
    .small-img-wrap {
        width: 45%;
    }
    .art-stats {
        flex-direction: column;
        gap: 2.5rem;
    }

    .bottom-title {
        font-size: 2.5rem;
        bottom: -10%;
    }
}
`;

export default ArtSection;