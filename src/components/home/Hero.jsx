import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img from "../../assets/logo2.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onNextClick }) => {
    const heroRef = useRef(null);
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
            .to(contentRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5
            }, "-=1.0");
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set(trainRef.current, { x: '-100vw' });
            gsap.set(contentRef.current.children, { y: 30, opacity: 0 });

            mainTl.current = gsap.timeline();

            mainTl.current.to(trainRef.current, {
                x: '0',
                duration: 1.5,
                ease: "power3.out",
                delay: 0.2
            })
                .to(contentRef.current.children, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.8");

            ScrollTrigger.create({
                trigger: heroRef.current,
                start: "top center",
                onEnterBack: () => {
                    mainTl.current.restart();
                    gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.5 });
                }
            });

            gsap.to(trainRef.current, {
                y: "+=8",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative w-full bg-slate-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 overflow-hidden flex flex-col lg:flex-row py-20 lg:py-60"
        >
            {/* Left Side - Train Engine */}
            <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end lg:pr-10 z-10 relative mb-12 lg:mb-0">
                {/* Visual Track Line */}
                <div className="absolute w-full h-[1px] bg-[#0070F0]/30 dark:bg-[#0070F0]/30 top-1/2 lg:top-1/2 shadow-[0_0_15px_rgba(0,112,240,0.3)]" />

                <div ref={trainRef} className="relative scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center lg:origin-right">
                    {/* Train Body */}
                    <div className="relative w-[320px] h-28 sm:w-[450px] sm:h-36 lg:w-[600px] lg:h-48 bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-300 dark:from-neutral-800 dark:via-neutral-900 dark:to-black 
                                rounded-tr-[100px] lg:rounded-tr-[120px] rounded-br-[30px] rounded-bl-[15px] border-r-8 border-[#0070F0] shadow-xl dark:shadow-[0_0_60px_-10px_rgba(0,112,240,0.3)]">

                        {/* Window/Glass effect */}
                        <div className="absolute top-6 right-10 w-1/3 h-1/2 bg-[#0070F0]/10 border-t border-r border-[#0070F0]/40 rounded-tr-[80px] skew-x-12 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 dark:via-white/5 to-transparent" />
                        </div>

                        {/* Content inside Train */}
                        <div className="absolute inset-0 flex items-center justify-start pl-8 lg:pl-12">
                            <img src={Img} alt="Logo" className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 object-contain" />
                            <h1 className="text-black/70 dark:text-white/70 text-4xl sm:text-5xl lg:text-7xl font-black italic tracking-tighter select-none ml-2">
                                VVSPL
                            </h1>
                        </div>

                        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-6">
                            <div className="w-4 h-2 lg:w-6 lg:h-3 bg-[#0070F0] rounded-full shadow-[0_0_25px_#0070F0] animate-pulse" />
                        </div>
                    </div>
                    {/* Ground Shadow */}
                    <div className="absolute -bottom-4 right-10 w-2/3 h-4 bg-[#0070F0]/20 blur-md rounded-[50%]" />
                </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-12 lg:px-20 z-20">
                <div ref={contentRef} className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                    <h2 className="text-[#0070F0] font-mono text-xs sm:text-sm tracking-[0.2em] mb-4 uppercase">
                        Digital Transformation Engine
                    </h2>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Veterans's Venture  <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-500">
                            where vision meets velocity
                        </span>
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg mb-8 leading-relaxed max-w-5xl mx-auto lg:mx-0">
                        Experience driven by purpose, and powered by innovation. Where seasoned visionaries combine strategic insight with bold execution, transforming ideas into impactful ventures at unmatched velocity.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
                        <button className="px-10 py-4 bg-[#0070F0] text-white dark:text-black font-bold rounded uppercase text-sm tracking-widest hover:bg-[#0070F0]/90 transition-all active:scale-95 shadow-lg dark:shadow-[0_0_20px_rgba(0,112,240,0.4)] cursor-pointer">
                            Start Journey
                        </button>
                    </div>

                    <button
                        onClick={handleNext}
                        className="group flex items-center justify-center lg:justify-start gap-4 text-neutral-500 dark:text-[#0070F0]/50 hover:text-[#0070F0] transition-colors cursor-pointer w-full lg:w-auto"
                    >
                        <div className="hidden sm:block h-[1px] w-12 bg-current" />
                        <span className="font-mono text-xs sm:text-sm tracking-widest uppercase">Next Station: About Us</span>
                        <div className="w-2 h-2 rounded-full bg-current" />
                    </button>
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay dark:mix-blend-normal" />
        </section>
    );
};

export default Hero;
