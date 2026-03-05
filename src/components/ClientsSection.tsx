import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
};

const clients = [
    { name: "Oxygen", src: "https://assets.quickerala.com/logo/original_logo_237847_1757334499.png" },
    { name: "Nolta", src: "https://images.seeklogo.com/logo-png/34/1/nolta-logo-png_seeklogo-343475.png" },
    { name: "Kalyan Silks", src: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Kalyan_Silks_Logo.png" },
    { name: "Hero", src: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Hero_MotoCorp_Logo.svg" },
    { name: "Sophia Builders", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ-LnAh0U1UFFqtVgerhmzC4Woho1BxVu8iA&s" },
    { name: "Nila Ayurvedic", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN0keQBRJ-EVnjwF5CC_XOnfYARXspXAcj7A&s" },
    { name: "Defab", src: "https://yt3.googleusercontent.com/ytc/AIdro_kAiwl-G7O5NTNPVkij7VYZOxQMT38rUrqYjl0XL5oGEQw=s900-c-k-c0x00ffffff-no-rj" },
    { name: "Maharani", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMo_vBJ829ufmU9_TsNGjMj-LhzUfCgizwQ&s" },
    { name: "Cadbury", src: "https://www.logo-designer.co/storage/2020/04/2020-cadbury-and-cadbury-dairy-milk-get-new-logo-designs-by-bulletproof.png" },
    { name: "Blossom", src: "https://i.ytimg.com/vi/9sHK61A1cWQ/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-DoACuAiKAgwIABABGGUgZShlMA8=&rs=AOn4CLCRTB26zKrn_8p02xu4kgQOsyW5fQ" },
    { name: "MyG", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsu5bJXGitwFxSzD1wrfoI6jJXTX7Bjj5ijw&s" },
    { name: "Skyline", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS8c3A7TNyO-1aJL7A_vdBmyioH4IiXfT_YxQ0ZKZOmhFPcY__zJZ_2C157LVLxkQF-90&usqp=CAU" },
    { name: "Nestle", src: "https://miro.medium.com/1*iGg26wPT2aQqBIe9fbfbgg.png" },
    { name: "Jac Group", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYngjqY2wipqOLiA6GV7j8b5kgNhABsdG3NA&s" },
    { name: "Salve Maria", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsOMAxMwXl_FNL7271YsxsverAuI_tyGaDCA&s" },
    { name: "Fazyo", src: "https://images.jdmagicbox.com/v2/comp/ernakulam/h8/0484px484.x484.231228040207.l5h8/catalogue/fazyo-ernakulam-readymade-garment-retailers-5vaqua96gn.jpg" },
    { name: "Homegrown Biotech", src: "https://media.licdn.com/dms/image/v2/C4E0BAQEaA8VDaSsf7Q/company-logo_200_200/company-logo_200_200/0/1650350240993?e=2147483647&v=beta&t=IhUY8W4NNvXz7ySIaKDo_i6UFON_LdaMUQm5TGeBVo4" },
    { name: "Therefore I'm", src: "https://content.jdmagicbox.com/comp/ernakulam/e5/0484px484.x484.220820171041.h6e5/catalogue/therefore-i-m-edapally-ernakulam-dermatologists-pjlvitpt3o.jpg" },
    { name: "Carla", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuz7tyaLepC4D4szeqev6EwQcdSqz_hmsVow&s" },
    { name: "Glowyoung", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvOACJqVVsnlnLC_cFLgLKYU5Qqr0RnCIf9g&s" },
];

const ClientsSection: React.FC = () => {
    // Duplicate the array to create a seamless loop
    const doubledClients = [...clients, ...clients];

    return (
        <section className="relative w-full py-24 lg:py-32 bg-[#060606] overflow-hidden text-[#f0f0f0] font-['Outfit']">
            <style>
                {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          /* Pause marquee on hover */
          .marquee-container:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}
            </style>

            <div className="container relative mx-auto px-4 z-10 mb-20 text-center">
                <Reveal delay={0.2}>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] font-['Playfair_Display']">
                        Trusted by <span className="italic opacity-90">visionary brands</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.3}>
                    <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto font-light leading-relaxed mt-4">
                        We partner with industry leaders to craft visual stories that redefine the commercial landscape.
                    </p>
                </Reveal>
            </div>

            {/* Infinite Horizontal Marquee Line */}
            <div className="marquee-container relative flex overflow-hidden whitespace-nowrap pt-12">
                <div className="flex animate-marquee py-4">
                    {doubledClients.map((client, i) => (
                        <div
                            key={`${client.name}-${i}`}
                            className="flex items-center justify-center mx-8 animate-float"
                            style={{
                                animationDelay: `${(i % clients.length) * 0.2}s`,
                                minWidth: '130px'
                            }}
                        >
                            <img
                                src={client.src}
                                alt={client.name}
                                className="max-h-16 w-auto opacity-70 hover:opacity-100 transition-all duration-500 cursor-pointer pointer-events-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;
