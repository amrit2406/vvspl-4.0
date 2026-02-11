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
            .to(sectionRef.current.children, {
                opacity: 0,
                y: -30,
                duration: 0.5
            }, "-=1.0");
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set(trainRef.current, { x: '100vw', opacity: 1 });
            gsap.set(contentRef.current.children, { x: 30, opacity: 0 });
            gsap.set(sectionRef.current.children, { opacity: 1, y: 0 });

            mainTl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    toggleActions: "play none none reset"
                }
            });

            mainTl.current.to(trainRef.current, {
                x: '0',
                duration: 1.5,
                ease: "power2.out"
            })
                .to(contentRef.current.children, {
                    x: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.8");

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom",
                onEnter: () => {
                    gsap.set(sectionRef.current.children, { opacity: 1, y: 0 });
                },
                onEnterBack: () => {
                    gsap.set(sectionRef.current.children, { opacity: 1, y: 0 });
                    mainTl.current.restart();
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="why-choose-us"
            className="relative w-full bg-slate-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 overflow-hidden flex flex-col lg:flex-row items-center py-20 lg:py-60"
        >
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 order-2 lg:order-1">
                <div ref={trainRef} className="relative w-full flex items-center justify-center">
                    <div className="w-[260px] h-[400px] sm:w-[300px] sm:h-[500px] bg-slate-200 dark:bg-[#151515] border-2 border-red-500/20 rounded-xl relative overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(255,0,0,0.1)]">
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,0,0,0.3)_360deg)] animate-[spin_4s_linear_infinite] rounded-full scale-[2] lg:scale-150" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-red-600 dark:text-red-500 font-mono text-[10px] sm:text-xs leading-relaxed">
                            <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse" /> SYSTEM STATUS: OPTIMAL</p>
                            <p className="mt-1 opacity-70">TRAFFIC: NORMAL</p>
                            <p className="opacity-70">SECURITY: ACTIVE</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-20 py-10 lg:py-0 z-20 order-1 lg:order-2">
                <div className="mb-10 text-center lg:text-left">
                    <h2 className="text-red-600 dark:text-red-500 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-2">
                        Signal Tower
                    </h2>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Why Choose Us?</h1>
                </div>

                <div ref={contentRef} className="grid grid-cols-1 gap-6 sm:gap-8 max-w-lg mx-auto lg:mx-0">
                    {reasons.map((reason, index) => (
                        <div key={index} className="flex gap-4 items-start group">
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 shadow-[0_0_10px_red] group-hover:scale-125 transition-transform" />
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                    {reason.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-500 text-sm sm:text-base leading-relaxed">
                                    {reason.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 lg:mt-16 flex justify-center lg:justify-start">
                    <button
                        onClick={handleNext}
                        className="group flex items-center gap-4 text-red-600 dark:text-red-500/50 hover:text-red-500 transition-colors cursor-pointer"
                    >
                        <div className="hidden sm:block h-[1px] w-12 bg-current" />
                        <span className="font-mono text-xs sm:text-sm tracking-widest uppercase">Next Station: Ventures</span>
                        <div className="w-2 h-2 rounded-full bg-current group-hover:shadow-[0_0_10px_red]" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
