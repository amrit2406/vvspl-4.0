import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
    { title: "Precision Engineering", desc: "Code that runs like clockwork, optimized for performance." },
    { title: "Future-Ready Architecture", desc: "Scalable systems built to adapt and evolve." },
    { title: "Security First", desc: "Fortified digital assets protected by industry standards." },
    { title: "24/7 Monitoring", desc: "Continuous oversight to ensure seamless operation." },
];

const WhyChooseUs = ({ onNextClick }) => {
    const sectionRef = useRef(null);
    const trainRef = useRef(null);
    const contentRef = useRef(null);

    const handleNext = () => {
        const tl = gsap.timeline({
            onComplete: onNextClick
        });

        tl.to(trainRef.current, {
            x: '-150vw',
            duration: 1.5,
            ease: "power2.in"
        })
            .to(sectionRef.current.children, {
                opacity: 0,
                y: -50,
                duration: 0.5
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

        // 1. Train Enter (Signal/Maintenance Train)
        gsap.set(trainRef.current, { x: '100vw' });
        tl.to(trainRef.current, {
            x: '0',
            duration: 1.5,
            ease: "power2.out"
        });

        // 2. Content Stagger
        gsap.set(contentRef.current.children, { x: 50, opacity: 0 });
        tl.to(contentRef.current.children, {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out"
        }, "-=1.0");

    }, []);

    return (
        <section ref={sectionRef} id="why-choose-us" className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col md:flex-row items-center">

            {/* Left Side: Signal Train / Control Tower */}
            <div className="w-full md:w-1/2 h-full relative flex items-center justify-center">
                <div ref={trainRef} className="relative w-full h-full flex items-center justify-center">
                    {/* Placeholder for 'Control Tower' graphic or specialized train car */}
                    <div className="w-[300px] h-[500px] bg-[#151515] border-2 border-red-500/20 rounded-xl relative overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.1)]">
                        {/* Radar Scan Effect */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,0,0,0.3)_360deg)] animate-[spin_4s_linear_infinite] rounded-full scale-150" />

                        {/* Grid Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                        <div className="absolute bottom-10 left-10 text-red-500 font-mono text-xs">
                            SYSTEM STATUS: OPTIMAL<br />
                            TRAFFIC: NORMAL<br />
                            SECURITY: ACTIVE
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-12 z-20">
                <h2 className="text-red-500 font-mono text-sm tracking-widest uppercase mb-8">
                    Signal Tower
                </h2>
                <h1 className="text-5xl font-bold mb-12">Why Choose Us?</h1>

                <div ref={contentRef} className="grid grid-cols-1 gap-8">
                    {reasons.map((reason, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_red]" />
                            <div>
                                <h3 className="text-xl font-bold text-neutral-200">{reason.title}</h3>
                                <p className="text-neutral-500 text-sm">{reason.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Next Station Indicator */}
                <div className="mt-16">
                    <button
                        onClick={handleNext}
                        className="group flex items-center gap-4 text-red-500/50 hover:text-red-500 transition-colors cursor-pointer"
                    >
                        <div className="h-[1px] w-12 bg-current" />
                        <span className="font-mono text-sm tracking-widest uppercase">Next Station: Ventures</span>
                        <div className="w-2 h-2 rounded-full bg-current group-hover:shadow-[0_0_10px_red]" />
                    </button>
                </div>
            </div>

        </section>
    );
};

export default WhyChooseUs;
