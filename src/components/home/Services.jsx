import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    { title: "AI / ML Solutions", icon: "🤖", desc: "Intelligent algorithms powering the next generation of automation." },
    { title: "Cloud Infrastructure", icon: "☁️", desc: "Scalable, secure, and robust cloud architectures." },
    { title: "E-Commerce", icon: "🛒", desc: "Seamless digital storefronts and payment ecosystems." },
    { title: "Web Applications", icon: "💻", desc: "High-performance responsive web platforms." },
    { title: "Mobile Apps", icon: "📱", desc: "Native and cross-platform mobile experiences." },
];

const Services = ({ onNextClick }) => {
    const sectionRef = useRef(null);
    const trainRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);
    const mainTl = useRef(null);

    const handleNext = () => {
        const tl = gsap.timeline({
            onComplete: onNextClick
        });

        tl.to(trainRef.current, {
            x: '-150vw',
            duration: 1.5,
            ease: "power2.in"
        })
            .to([headerRef.current, ...cardsRef.current], {
                opacity: 0,
                y: 30,
                duration: 0.5,
                stagger: 0.05
            }, "-=1.0");
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set(trainRef.current, { x: '100vw', opacity: 1 });
            gsap.set(headerRef.current, { y: -30, opacity: 0 });
            gsap.set(cardsRef.current, { y: 50, opacity: 0 });

            mainTl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    toggleActions: "play none none reset"
                }
            });

            mainTl.current
                .to(trainRef.current, {
                    x: '0',
                    duration: 2,
                    ease: "power2.out"
                })
                .to(headerRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8
                }, "-=1.5")
                .to(cardsRef.current, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=1.0");

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
            id="services"
            className="relative w-full bg-slate-50 dark:bg-[#101010] text-black dark:text-white transition-colors duration-300 overflow-hidden flex flex-col items-center py-16 sm:py-24 lg:py-60"
        >
            {/* Background Industrial Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-yellow-500/20" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-yellow-500/20" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ccc_1px,transparent_1px),linear-gradient(to_bottom,#ccc_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            {/* Header */}
            <div ref={headerRef} className="z-20 text-center mb-12 sm:mb-20 px-6">
                <h2 className="text-yellow-600 dark:text-yellow-500 font-mono text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-4 border-b border-yellow-500/30 pb-2 inline-block">
                    Station: Logistics Hub
                </h2>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-400 dark:from-white dark:to-neutral-700">
                    Services
                </h1>
            </div>

            {/* Services Cards Container */}
            <div className="z-20 w-full max-w-7xl px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
                {services.map((service, index) => (
                    <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className="group relative p-6 sm:p-8 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm border border-neutral-200 dark:border-[#333] hover:border-yellow-500/50 transition-all duration-300 hover:bg-white dark:hover:bg-[#202020] hover:-translate-y-1 shadow-sm dark:shadow-none"
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-500/50" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-500/50" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-500/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500/50" />

                        <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                            {service.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-neutral-800 dark:text-neutral-200 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-500 leading-relaxed font-mono text-xs sm:text-sm">
                            {service.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Cargo Train Animation (Bottom Background) */}
            <div
                ref={trainRef}
                className="absolute bottom-0 right-0 w-full h-32 sm:h-48 pointer-events-none z-10 flex items-end justify-end opacity-10 dark:opacity-40"
            >
                <div className="relative w-[300px] sm:w-[800px] h-full bg-slate-200 dark:bg-[#151515] border-t-2 border-yellow-500/20 transform skew-x-12 translate-x-16 sm:translate-x-32">
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-500/10" />
                    <div className="absolute top-10 left-10 sm:left-20 w-16 sm:w-32 h-8 sm:h-12 bg-yellow-500/5" />
                    <div className="absolute top-10 left-32 sm:left-60 w-16 sm:w-32 h-8 sm:h-12 bg-yellow-500/5" />
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="z-30 mt-auto px-6">
                <button
                    onClick={handleNext}
                    className="group flex items-center gap-4 text-yellow-600 dark:text-yellow-500/50 hover:text-yellow-500 transition-colors cursor-pointer"
                >
                    <div className="w-2 h-2 rounded-full bg-current group-hover:shadow-[0_0_10px_orange]" />
                    <span className="font-mono text-xs sm:text-sm tracking-widest uppercase">Next Station: Why Us</span>
                    <div className="hidden sm:block h-[1px] w-12 bg-current" />
                </button>
            </div>

            {/* Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay dark:mix-blend-normal" />
        </section>
    );
};

export default Services;
