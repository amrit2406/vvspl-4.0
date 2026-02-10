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

    const handleNext = () => {
        const tl = gsap.timeline({
            onComplete: onNextClick
        });

        // Exit Animation (To Left)
        tl.to(trainRef.current, {
            x: '-150vw',
            duration: 1.5,
            ease: "power2.in"
        })
            .to(sectionRef.current.children, {
                opacity: 0,
                x: -50,
                duration: 0.5,
                stagger: 0.1
            }, "-=1.0");
    };

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                toggleActions: "play none none reverse"
            }
        });

        // Initial setup
        gsap.set(trainRef.current, { x: '100vw' });
        gsap.set(headerRef.current, { y: -50, opacity: 0 });
        gsap.set(cardsRef.current, { y: 100, opacity: 0 });

        // 1. Train Enter (Heavy Cargo Train)
        tl.to(trainRef.current, {
            x: '0',
            duration: 2,
            ease: "power2.out"
        })

            // 2. Header Reveal
            .to(headerRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8
            }, "-=1.5")

            // 3. Cards Stagger In
            .to(cardsRef.current, {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=1.0");

    }, []);

    return (
        <section ref={sectionRef} id="services" className="relative w-full min-h-screen bg-[#101010] text-white overflow-hidden flex flex-col items-center py-20">

            {/* Background Industrial Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-yellow-500/20" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-yellow-500/20" />
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Header */}
            <div ref={headerRef} className="z-20 text-center mb-16">
                <h2 className="text-yellow-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 border-b border-yellow-500/30 pb-2 inline-block">
                    Station: Logistics Hub
                </h2>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700">
                    Services
                </h1>
            </div>

            {/* Services Cards Container */}
            <div className="z-20 w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {services.map((service, index) => (
                    <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className="group relative p-8 bg-[#1a1a1a] border border-[#333] hover:border-yellow-500/50 transition-all duration-300 hover:bg-[#202020]"
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-500/50" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-500/50" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-500/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500/50" />

                        <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">{service.icon}</div>
                        <h3 className="text-2xl font-bold mb-3 text-neutral-200 group-hover:text-yellow-500 transition-colors">{service.title}</h3>
                        <p className="text-neutral-500 leading-relaxed font-mono text-sm">{service.desc}</p>
                    </div>
                ))}
            </div>

            {/* Cargo Train Animation (Bottom Background) */}
            <div ref={trainRef} className="absolute bottom-0 right-0 w-full h-48 pointer-events-none z-10 flex items-end justify-end opacity-40">
                {/* Train Engine */}
                <div className="relative w-[800px] h-full bg-[#151515] border-t-2 border-yellow-500/20 transform skew-x-12 translate-x-32">
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-500/10" />
                    {/* Windows */}
                    <div className="absolute top-10 left-20 w-32 h-12 bg-yellow-500/5" />
                    <div className="absolute top-10 left-60 w-32 h-12 bg-yellow-500/5" />
                </div>
            </div>

            {/* Next Station Indicator */}
            <div className="z-30 mt-auto pb-10">
                <button
                    onClick={handleNext}
                    className="group flex items-center gap-4 text-yellow-500/50 hover:text-yellow-500 transition-colors cursor-pointer"
                >
                    <div className="w-2 h-2 rounded-full bg-current group-hover:shadow-[0_0_10px_orange]" />
                    <span className="font-mono text-sm tracking-widest uppercase">Next Station: Why Us</span>
                    <div className="h-[1px] w-12 bg-current" />
                </button>
            </div>

        </section>
    );
};

export default Services;
