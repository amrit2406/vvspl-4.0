import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = ({ onNextClick }) => {
    const heroRef = useRef(null);
    const trainRef = useRef(null);
    const contentRef = useRef(null);

    const handleNext = () => {
        const tl = gsap.timeline({
            onComplete: onNextClick
        });

        // Exit Animation
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
        const tl = gsap.timeline();

        // Initial setup
        gsap.set(trainRef.current, { x: '-100vw' });
        gsap.set(contentRef.current.children, { y: 50, opacity: 0 });

        // 1. Train Enter
        tl.to(trainRef.current, {
            x: '0',
            duration: 1.5,
            ease: "power3.out",
            delay: 0.2
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
        <section ref={heroRef} className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex flex-col md:flex-row">

            {/* Left Side - Train Engine */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center md:justify-end pr-0 md:pr-10 z-10 overflow-hidden">
                {/* Track/Ground Line */}
                <div className="absolute w-full h-[1px] bg-[#0070F0]/30 top-[60%] md:top-1/2 shadow-[0_0_15px_#0070F0]" />

                <div ref={trainRef} className="relative transform scale-75 md:scale-100 origin-right">
                    {/* The Train Engine Body - Matching Loader Style but cleaner */}
                    <div className="relative w-[400px] h-32 md:w-[600px] md:h-48 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black 
                                rounded-tr-[120px] rounded-br-[30px] rounded-bl-[15px] border-r-8 border-[#0070F0] shadow-[0_0_60px_-10px_rgba(0,112,240,0.3)]">

                        {/* Windshield */}
                        <div className="absolute top-6 right-10 w-1/3 h-1/2 bg-[#0070F0]/10 border-t border-r border-[#0070F0]/40 rounded-tr-[80px] skew-x-12 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                        </div>

                        {/* Side Panel Details */}
                        <div className="absolute bottom-4 left-10 flex gap-4">
                            <div className="w-32 h-2 bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-[#0070F0]/50 animate-[pulse_3s_infinite]" />
                            </div>
                            <div className="w-12 h-2 bg-neutral-700 rounded-full" />
                        </div>

                        {/* Logo */}
                        <div className="absolute inset-0 flex items-center justify-center pr-16 md:pr-24">
                            <h1 className="text-white/10 text-7xl md:text-8xl font-black italic tracking-tighter select-none">
                                VVSPL
                            </h1>
                        </div>

                        {/* Lights */}
                        <div className="absolute bottom-8 right-6">
                            <div className="w-6 h-3 bg-[#0070F0] rounded-full shadow-[0_0_25px_#0070F0] animate-pulse" />
                        </div>
                    </div>
                    {/* Wheels/Levitation Pad */}
                    <div className="absolute -bottom-4 right-10 w-2/3 h-4 bg-[#0070F0]/20 blur-md rounded-[50%]" />
                </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center p-8 md:p-20 z-20">
                <div ref={contentRef} className="max-w-xl">
                    <h2 className="text-[#0070F0] font-mono text-sm tracking-widest mb-4 uppercase">
                        Digital Transformation Engine
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        We Build The <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                            Future of IT
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-lg mb-8 leading-relaxed max-w-md">
                        Accelerating your business with cutting-edge software solutions.
                        From full-stack development to cloud infrastructure, we are the engine behind your success.
                    </p>

                    <div className="flex gap-4 mb-12">
                        <button className="px-8 py-3 bg-[#0070F0] text-black font-bold rounded hover:bg-[#0070F0]/90 transition-colors shadow-[0_0_20px_rgba(0,112,240,0.4)] hover:shadow-[0_0_40px_rgba(0,112,240,0.6)]">
                            Start Journey
                        </button>
                    </div>

                    {/* Next Station Indicator */}
                    <button
                        onClick={handleNext}
                        className="group flex items-center gap-4 text-[#0070F0]/50 hover:text-[#0070F0] transition-colors cursor-pointer"
                    >
                        <div className="h-[1px] w-12 bg-current" />
                        <span className="font-mono text-sm tracking-widest uppercase">Next Station: About Us</span>
                        <div className="w-2 h-2 rounded-full bg-current group-hover:shadow-[0_0_10px_#0070F0]" />
                    </button>
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

        </section>
    );
};

export default Hero;
