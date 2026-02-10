import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ onNextClick }) => {
    const sectionRef = useRef(null);
    const trainRef = useRef(null);
    const contentRef = useRef(null);

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
            .to(contentRef.current, {
                opacity: 0,
                x: -50,
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

        // Initial setup
        gsap.set(trainRef.current, { x: '100vw' }); // Start from Right
        gsap.set(contentRef.current.children, { y: 50, opacity: 0 });

        // 1. Train Enter (From Right)
        tl.to(trainRef.current, {
            x: '0',
            duration: 1.5,
            ease: "power3.out"
        })
            // 2. Train Float
            .to(trainRef.current, {
                y: "+=10",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }, "-=0.5")

            // 3. Content Reveal
            .to(contentRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out"
            }, "-=1.0");

    }, []);

    return (
        <section ref={sectionRef} id="about" className="relative w-full h-screen bg-[#080808] text-white overflow-hidden flex flex-col md:flex-row-reverse">

            {/* Right Side - Train Engine (Coming from Right) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center md:justify-start pl-0 md:pl-10 z-10 overflow-hidden">
                {/* Track/Ground Line */}
                <div className="absolute w-full h-[1px] bg-cyan-500/30 top-[60%] md:top-1/2 shadow-[0_0_15px_cyan]" />

                <div ref={trainRef} className="relative transform scale-75 md:scale-100 origin-left">
                    {/* The Train Engine Body - Variation for Station Theme */}
                    <div className="relative w-[400px] h-32 md:w-[600px] md:h-48 bg-gradient-to-b from-slate-900 via-slate-800 to-black 
                                rounded-tl-[120px] rounded-bl-[30px] rounded-br-[15px] border-l-8 border-cyan-500 shadow-[0_0_60px_-10px_rgba(0,255,255,0.2)]">

                        {/* Windshield */}
                        <div className="absolute top-6 left-10 w-1/3 h-1/2 bg-cyan-500/10 border-t border-l border-cyan-500/40 rounded-tl-[80px] skew-x-[-12deg] backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent" />
                        </div>

                        {/* Side Panel Details */}
                        <div className="absolute bottom-4 right-10 flex gap-4">
                            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-cyan-500/50 animate-[pulse_3s_infinite]" />
                            </div>
                            <div className="w-12 h-2 bg-slate-700 rounded-full" />
                        </div>

                        {/* Station Logo */}
                        <div className="absolute inset-0 flex items-center justify-center pl-16 md:pl-24">
                            <h1 className="text-white/10 text-6xl md:text-7xl font-black italic tracking-tighter select-none">
                                ABOUT
                            </h1>
                        </div>

                        {/* Lights */}
                        <div className="absolute bottom-8 left-6">
                            <div className="w-6 h-3 bg-cyan-500 rounded-full shadow-[0_0_25px_cyan] animate-pulse" />
                        </div>
                    </div>
                    {/* Wheels/Levitation Pad */}
                    <div className="absolute -bottom-4 left-10 w-2/3 h-4 bg-cyan-500/20 blur-md rounded-[50%]" />
                </div>
            </div>

            {/* Left Side - Content */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-end p-8 md:p-20 z-20">
                <div ref={contentRef} className="max-w-xl text-right">
                    <h2 className="text-cyan-500 font-mono text-sm tracking-widest mb-4 uppercase flex items-center justify-end gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                        Station: Central Hub
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        Architects of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-slate-500">
                            Digital Reality
                        </span>
                    </h1>

                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg backdrop-blur-sm mb-8 border-r-4 border-r-cyan-500/50">
                        <p className="text-slate-300 text-lg leading-relaxed">
                            We are a collective of visionaries, engineers, and creators.
                            Our mission is to transport your ideas from concept to reality with
                            precision, speed, and uncompromised quality.
                        </p>
                    </div>


                    {/* Next Station Indicator */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleNext}
                            className="group flex items-center gap-4 text-cyan-500/50 hover:text-cyan-500 transition-colors cursor-pointer"
                        >
                            <div className="w-2 h-2 rounded-full bg-current group-hover:shadow-[0_0_10px_cyan]" />
                            <span className="font-mono text-sm tracking-widest uppercase">Next Station: Services</span>
                            <div className="h-[1px] w-12 bg-current" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

        </section>
    );
};

export default About;
