import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ventures = [
    {
        title: "Trade & Transport",
        img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1000&auto=format&fit=crop",
        desc: "Global import/export logistics and fleet management."
    },
    {
        title: "Land Development",
        img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop",
        desc: "Strategic acquisition and sustainable urban planning."
    },
    {
        title: "Mining & Minerals",
        img: "https://www.fluidsep.in/wp-content/uploads/2023/12/Mining-Minerals-1024x683.webp",
        desc: "Responsible extraction and resource processing services."
    },
    {
        title: "Power & Energy",
        img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1000&auto=format&fit=crop",
        desc: "Renewable energy solutions and grid infrastructure."
    },
    {
        title: "Organic Agriculture",
        img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop",
        desc: "Eco-friendly farming and sustainable food supply chains."
    },
];

const Ventures = ({ onNextClick }) => {
    const sectionRef = useRef(null);
    const trainRef = useRef(null);
    const containerRef = useRef(null);
    const mainTl = useRef(null);

    const handleNext = () => {
        const tl = gsap.timeline({
            onComplete: onNextClick
        });

        tl.to(trainRef.current, {
            top: '0%',
            height: '100%',
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut"
        })
            .to(containerRef.current.children, {
                opacity: 0,
                scale: 0.9,
                duration: 0.4
            }, "-=0.6");
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Initial State
            gsap.set(trainRef.current, { top: '100%', height: '0%', opacity: 1 });
            gsap.set(containerRef.current.children, {
                scale: 0.95,
                opacity: 0,
                filter: "blur(10px)"
            });

            // Entrance Timeline
            mainTl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    toggleActions: "play none none reset"
                }
            });

            mainTl.current
                .to(trainRef.current, {
                    top: '0%',
                    height: '150px',
                    opacity: 0.8,
                    duration: 1.0,
                    ease: "power2.inOut"
                })
                .to(containerRef.current.children, {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power3.out"
                }, "-=0.5")
                .to(trainRef.current, {
                    top: '-20%',
                    opacity: 0,
                    duration: 0.6
                }, "-=0.3");

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top center",
                onEnterBack: () => {
                    mainTl.current.restart();
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="ventures"
            className="relative w-full min-h-screen bg-slate-50 dark:bg-[#020205] text-black dark:text-white transition-colors duration-300 py-20 sm:py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay dark:mix-blend-normal" />

            {/* Header */}
            <div className="relative z-30 mb-12 sm:mb-16 text-center md:text-center">
                {/* <h2 className="text-blue-600 dark:text-blue-500 font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.3em] uppercase mb-2 font-bold">
                    Portfolio // 2026
                </h2> */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tight">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-400 dark:from-white dark:to-neutral-600">Future Ventures</span>
                </h1>
            </div>

            {/* Grid Container */}
            <div
                ref={containerRef}
                className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl mx-auto"
            >
                {ventures.map((venture, index) => (
                    <div
                        key={index}
                        className="group relative h-[350px] sm:h-[450px] md:h-[500px] rounded-xl overflow-hidden cursor-pointer shadow-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/5"
                    >
                        {/* Background Image */}
                        <img
                            src={venture.img}
                            alt={venture.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-black dark:via-black/50 dark:to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                        {/* Content Container */}
                        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {venture.title}
                            </h3>

                            <p className="text-neutral-200 dark:text-neutral-300 text-xs sm:text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 line-clamp-3">
                                {venture.desc}
                            </p>

                            <button className="self-start px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white text-[10px] sm:text-xs font-bold tracking-wider rounded opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:bg-blue-500 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer">
                                KNOW MORE
                            </button>
                        </div>

                        {/* Corner Highlight */}
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-500" />
                    </div>
                ))}
            </div>

            {/* The "Shutter" Scanner (Train) */}
            <div className="absolute inset-0 z-40 pointer-events-none flex justify-center overflow-hidden">
                <div
                    ref={trainRef}
                    className="w-[120%] h-[4px] bg-blue-400 shadow-[0_0_40px_10px_rgba(59,130,246,0.6)] backdrop-blur-sm"
                />
            </div>

            {/* Next Station Button */}
            <div className="relative z-30 mt-12 sm:mt-16 md:mt-20 w-full flex justify-center">
                <button
                    onClick={handleNext}
                    className="group relative px-8 py-3 sm:px-10 sm:py-4 bg-transparent border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-500 font-mono text-[10px] sm:text-xs tracking-[0.2em] hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-full overflow-hidden cursor-pointer"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        NEXT STATION - Leaders
                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </span>
                    <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
            </div>
        </section>
    );
};

export default Ventures;
