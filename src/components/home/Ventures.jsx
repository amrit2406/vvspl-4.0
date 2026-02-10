import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ventures = [
    { title: "Trade & Transport", icon: "🚢", desc: "Global import/export logistics and fleet management." },
    { title: "Land Development", icon: "🏗️", desc: "Strategic acquisition and sustainable urban planning." },
    { title: "Mining & Minerals", icon: "⛏️", desc: "Responsible extraction and resource processing services." },
    { title: "Power & Energy", icon: "⚡", desc: "Renewable energy solutions and grid infrastructure." },
    { title: "Organic Agriculture", icon: "🌱", desc: "Eco-friendly farming and sustainable food supply chains." },
];

const Ventures = ({ onNextClick }) => {
    const sectionRef = useRef(null);
    const trainRef = useRef(null);
    const containerRef = useRef(null);

    const handleNext = () => {
        const tl = gsap.timeline({
            onComplete: onNextClick
        });

        tl.to(trainRef.current, {
            x: '-150vw',
            duration: 1.0, // Faster for Hyperloop
            ease: "power3.in"
        })
            .to(sectionRef.current.children, {
                opacity: 0,
                scale: 0.9,
                duration: 0.5
            }, "-=0.8");
    };

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                toggleActions: "play none none reverse"
            }
        });

        // 1. Hyperloop Pod Enter (Very Fast)
        gsap.set(trainRef.current, { x: '100vw' });
        tl.to(trainRef.current, {
            x: '0',
            duration: 0.8,
            ease: "expo.out"
        });

        // 2. Cards Slide In from Bottom
        gsap.set(containerRef.current.children, { y: 100, opacity: 0 });
        tl.to(containerRef.current.children, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.5)"
        }, "-=0.4");

    }, []);

    return (
        <section ref={sectionRef} id="ventures" className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center py-20">

            {/* Background: Speed Lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-[1px] bg-blue-500/50 w-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * -100}%`,
                            animation: `speedLine ${0.5 + Math.random()}s linear infinite`
                        }}
                    />
                ))}
                <style jsx>{`
                    @keyframes speedLine {
                        0% { transform: translateX(0); opacity: 0; }
                        50% { opacity: 1; }
                        100% { transform: translateX(200%); opacity: 0; }
                    }
                 `}</style>
            </div>

            <div className="z-20 text-center mb-12">
                <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-2 font-mono text-xs">Future Ventures</h2>
                <h1 className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 uppercase">Hyperloop Speed</h1>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="w-full max-w-6xl overflow-x-auto pb-8 hide-scrollbar px-4 z-20">
                <div ref={containerRef} className="flex gap-6 min-w-max md:min-w-0 md:flex-wrap md:justify-center">
                    {ventures.map((venture, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-72 h-80 bg-[#111] border border-[#222] rounded-2xl shadow-2xl p-8 flex flex-col transition-all duration-300 hover:border-blue-500/50 hover:bg-[#151515] group"
                        >
                            <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all">{venture.icon}</div>
                            <h3 className="text-xl font-bold mb-auto text-white">{venture.title}</h3>
                            <p className="text-neutral-500 text-sm mt-4 leading-relaxed font-mono">{venture.desc}</p>
                            <div className="mt-4 w-full h-[1px] bg-[#222] relative overflow-hidden">
                                <div className="absolute inset-0 bg-blue-500 w-1/2 animate-[load_2s_infinite]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hyperloop Train Visual */}
            <div ref={trainRef} className="absolute bottom-10 left-0 w-full h-32 pointer-events-none z-10 flex items-center">
                <div className="w-[120%] h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm opacity-30 transform -skew-x-45" />
                <div className="absolute inset-0 bg-blue-900/5 blur-3xl rounded-full" />
            </div>

            {/* Next Station Indicator */}
            <div className="mt-8 z-30">
                <button
                    onClick={handleNext}
                    className="group flex items-center gap-4 text-blue-500 hover:text-white transition-colors cursor-pointer font-bold"
                >
                    <span className="font-mono text-sm tracking-widest uppercase">Next Station: Blogs</span>
                    <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-blue-500 group-hover:text-black transition-all">
                        &rarr;
                    </div>
                </button>
            </div>

        </section>
    );
};

export default Ventures;
