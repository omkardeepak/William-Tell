import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ── Arts data ── */
const artsData = [
    { id: 1, title: "Campaign", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(3).png" },
    { id: 2, title: "Visual Story", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(6).png" },
    { id: 3, title: "Production", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(2).png" },
    { id: 4, title: "Brand Identity", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(5).png" },
    { id: 5, title: "Cinematic Frame", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(7).png" },
    { id: 6, title: "Motion Art", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(9).png" },
    { id: 7, title: "Digital Story", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(8).png" },
    { id: 8, title: "Editorial", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(4).png" },
    { id: 9, title: "Direction", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(10).png" },
    { id: 10, title: "Storytelling", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image(1).png" },
    { id: 11, title: "The Archive", src: "https://ik.imagekit.io/r70knk9pu/William%20Tell/image.png" }
];

const ArtCard = ({ art, index, total, radius, sceneRotateY }) => {

    const theta = (360 / total) * index;

    // The angle where this specific card is perfectly front-facing towards the camera
    const activeAngle = -theta;

    // Create a dynamic window +/- 45 degrees around the active angle
    const range = [activeAngle - 45, activeAngle, activeAngle + 45];

    // Scale up massively, pop way forward in Z space, and brighten exactly when front-facing
    const scale = useTransform(sceneRotateY, range, [0.65, 1.6, 0.65], { clamp: true });
    const zOffset = useTransform(sceneRotateY, range, [-60, 100, -60], { clamp: true });
    const opacity = useTransform(sceneRotateY, range, [0.3, 1, 0.3], { clamp: true });

    // 2 & 3. Blur and Silhouette effect: clear and bright in center, blurred and dark (silhouette) at sides
    const filter = useTransform(
        sceneRotateY,
        range,
        ["blur(5px) brightness(0.3)", "blur(0px) brightness(1)", "blur(5px) brightness(0.3)"]
    );

    return (
        <div
            className="art-card"
            style={{
                transform: `rotateY(${theta}deg) translateZ(${radius}px)`
            }}
        >
            <motion.div
                className="art-card-inner"
                style={{
                    scale,
                    z: zOffset, // Physical 3D projection perfectly triggers browser depth-sorting overriding DOM order
                    opacity,
                    filter
                }}
            >
                <img src={art.src} alt={art.title} className="art-card-img" />

                <div className="art-card-label">
                    <span>{art.title}</span>
                </div>
            </motion.div>
        </div>
    );
};

const ArtSection = () => {

    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    /* track scroll inside wrapper */
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start start", "end end"]
    });

    const totalCards = artsData.length;

    // 1. Calculate strictly snapped progress steps so pictures stop exactly in centered focus
    const snappedProgress = useTransform(scrollYProgress, p => {
        // Clamp to ensure we do not overshoot
        const clampedProgress = Math.min(Math.max(p, 0), 1);
        const index = Math.round(clampedProgress * (totalCards - 1));
        return index / (totalCards - 1);
    });

    /* smooth physics driving the snappy ticks */
    const smoothProgress = useSpring(snappedProgress, {
        stiffness: 90,
        damping: 20,
        mass: 0.8
    });

    /* rotation depends on the smoothed stair-step scroll */
    const rotateY = useTransform(
        smoothProgress,
        [0, 1],
        [0, -(360 - 360 / totalCards)]
    );

    // Make circle wider for larger photos
    const radius = 650;

    return (
        <div ref={wrapperRef} className="art-wrapper">

            <style>{artSectionStyles}</style>

            <div className="art-sticky">

                <div id="archives" className="art-section-header">

                    <span className="art-eyebrow">Portfolio</span>

                    <h2 className="art-title">Browse Our Archives</h2>

                    <button
                        className="art-view-btn"
                        onClick={() => navigate("/works")}
                    >
                        <span>View All Works</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>

                </div>

                <div className="circular-queue-container">

                    <motion.div
                        className="circular-queue-scene"
                        style={{
                            rotateY,
                            z: -radius - 50 // pulling back so the giant front card isn't clipping the screen
                        }}
                    >

                        {artsData.map((art, i) => (
                            <ArtCard
                                key={art.id}
                                art={art}
                                index={i}
                                total={totalCards}
                                radius={radius}
                                sceneRotateY={rotateY} // Provide the cylinder's rotation down to the child to compute prominence
                            />
                        ))}

                    </motion.div>

                </div>

                <div className="carousel-floor-glow"></div>

            </div>

        </div>
    );
};


/* ── Styles ── */

const artSectionStyles = `

.art-wrapper{
position:relative;
height:350vh;
background:transparent;
color:#fff;
font-family: 'Outfit', sans-serif;
}
.art-sticky{
position:sticky;
top:0;
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
overflow:hidden;
perspective:1600px;
}

.art-section-header{
text-align:center;
margin-bottom:4rem;
z-index:20;
}

.art-eyebrow{
font-size: 0.75rem;
text-transform: uppercase;
letter-spacing: 0.3em;
color: rgba(255,255,255,0.35);
display: block;
margin-bottom: 1rem;
}

.art-title{
font-size: clamp(2rem, 5vw, 3.5rem);
font-family: 'Playfair Display', serif;
font-weight: 400;
margin: 0;
letter-spacing: -0.02em;
margin-bottom: 2.5rem;
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

.circular-queue-container{
width:100%;
display:flex;
justify-content:center;
align-items:center;
height:450px;
}

.circular-queue-scene{
position:relative;
width:420px;
height:240px;
transform-style:preserve-3d;
}

.art-card{
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
transform-style:preserve-3d;
backface-visibility:visible; 
}

.art-card-inner{
width:100%;
height:100%;
border-radius:12px;
overflow:hidden;
position:relative;
box-shadow:
0 30px 60px rgba(0,0,0,.9),
0 0 0 1px rgba(255,255,255,.1);
background:#111;
will-change: transform, opacity;
}

.art-card-img{
width:100%;
height:100%;
object-fit:cover;
}

.art-card-label{
position:absolute;
bottom:0;
left:0;
width:100%;
padding:1.4rem 1rem .9rem;
background:linear-gradient(to top,rgba(0,0,0,.9),transparent);
text-align:center;
font-size: 0.72rem;
letter-spacing: 0.15em;
text-transform: uppercase;
color: rgba(255,255,255,0.3);
opacity:0;
transform:translateY(10px);
transition:.5s ease;
}

.art-card-inner:hover .art-card-label{
opacity:1;
transform:translateY(0);
}

.carousel-floor-glow{
position:absolute;
bottom:-120px;
width:100%;
height:300px;
background:radial-gradient(ellipse at center,rgba(255,255,255,.05),transparent 60%);
transform:rotateX(80deg);
pointer-events:none;
}

@media(max-width:768px){
.art-wrapper{height:400vh;}
.circular-queue-scene{width:280px;height:180px;}
.art-title { font-size: clamp(1.6rem, 7vw, 2.4rem); }
.art-view-btn { font-size: 0.7rem; padding: 0.55rem 1.2rem; }
}

`;

export default ArtSection;