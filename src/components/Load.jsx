import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Img from "../assets/logo2.png";

const Load = ({ onComplete }) => {
  const trainRef = useRef(null);
  const loaderContainer = useRef(null);
  const backgroundTrainsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Background Trains Animation
    backgroundTrainsRef.current.forEach((train, index) => {
      if (!train) return;
      const direction = index % 2 === 0 ? 1 : -1;
      const startX = direction === 1 ? '-100vw' : '100vw';
      const endX = direction === 1 ? '100vw' : '-100vw';
      const duration = 2 + Math.random() * 2;
      const delay = Math.random() * 1.5;

      gsap.fromTo(train,
        { x: startX, opacity: 0.3 },
        {
          x: endX,
          opacity: 0.3,
          duration: duration,
          repeat: -1,
          ease: "none",
          delay: delay
        }
      );
    });

    // 1. Entrance & Engine vibration
    tl.fromTo(trainRef.current,
      { x: '-120vw', scale: 0.8 },
      { x: '0', scale: 1, duration: 1.5, ease: "expo.out" }
    );

    // Continuous vibration "plasma hum"
    gsap.to(trainRef.current, {
      y: "+=1.5",
      repeat: -1,
      yoyo: true,
      duration: 0.08
    });

    // 2. Simulate Loading time (3.5 seconds)
    const timer = setTimeout(() => {
      // 3. Departure Animation
      const exitTl = gsap.timeline({
        onComplete: onComplete
      });

      exitTl.to(trainRef.current, {
        x: '150vw',
        scale: 1.1,
        skewX: 10,
        filter: 'blur(20px)',
        duration: 0.8,
        ease: "power4.in"
      })
        .to(loaderContainer.current, {
          opacity: 0,
          duration: 0.5
        }, "-=0.3");

    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="bg-black text-white font-sans overflow-hidden">
      <div ref={loaderContainer} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">

        {/* Background Trains Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              ref={el => backgroundTrainsRef.current[i] = el}
              className="absolute h-12 w-[60vw] bg-gradient-to-r from-transparent via-[#0070F0]/10 to-transparent blur-md"
              style={{
                top: `${20 + i * 25}%`,
                left: 0
              }}
            />
          ))}
        </div>

        {/* Motion Blur Tracks - Now Electric Blue */}
        <div className="absolute w-full h-[1px] bg-[#0070F0]/20 top-1/2 mt-12 shadow-[0_0_20px_#0070F0] z-10" />

        {/* The Train Engine Body */}
        <div ref={trainRef} className="relative flex items-end z-20">
          {/* The Engine Head */}
          <div className="relative w-80 h-28 md:w-[450px] md:h-36 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black 
                        rounded-tr-[100px] rounded-br-[20px] rounded-bl-[10px] border-r-4 border-[#0070F0] shadow-[25px_0_50px_-10px_rgba(0,112,240,0.4)]">

            {/* Windshield - Deep Cyan/Blue */}
            <div className="absolute top-4 right-8 w-1/3 h-1/2 bg-[#0070F0]/10 border-t border-r border-[#0070F0]/40 rounded-tr-[60px] skew-x-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-[pulse_2s_infinite]" />
            </div>

            {/* VVSPL Logo Area - Electric Blue Glow */}
            <div className="absolute inset-0 flex items-center justify-start pr-12">
              <img src={Img} alt="" className="h-20 w-20" />
              <h1 className="text-[#0070F0] text-6xl font-black italic tracking-tighter drop-shadow-[0_0_15px_rgba(0,112,240,0.9)]">
                VVSPL
              </h1>
            </div>

            {/* Engine Lights - Blue Plasma */}
            <div className="absolute bottom-6 right-4 flex gap-2">
              <div className="w-4 h-2 bg-[#0070F0] rounded-full shadow-[0_0_15px_#0070F0]" />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_cyan]" />
            </div>
          </div>

          {/* Trailing Part (blurred) */}
          <div className="w-20 h-24 bg-neutral-900/50 blur-sm rounded-l-lg -ml-2 border-l border-[#0070F0]/10" />
        </div>

        {/* Progress Indicator */}
        <div className="mt-20 flex flex-col items-center z-20">
          <span className="text-[#0070F0]/60 text-xs tracking-[0.4em] uppercase mb-3 animate-pulse font-mono">
            LOADING...
          </span>
          <div className="w-56 h-[1px] bg-neutral-800 relative">
            {/* The Loading Fill */}
            <div className="h-full bg-[#0070F0] shadow-[0_0_15px_#0070F0] animate-[load_3s_ease-in-out_infinite]" />

            {/* Static Blue Glow Point */}
            <div className="absolute -right-1 -top-1 w-2 h-2 bg-white rounded-full blur-[2px] opacity-50" />
          </div>
        </div>
      </div>

      <style jsx>{`
                @keyframes load {
                    0% { width: 0%; left: 0; }
                    50% { width: 100%; left: 0; }
                    100% { width: 0%; left: 100%; }
                }
            `}</style>
    </div>
  );
};

export default Load;