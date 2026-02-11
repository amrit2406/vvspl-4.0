import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = ({ onNextClick }) => {
  const sectionRef = useRef(null);
  const trainRef = useRef(null);
  const contentRef = useRef(null);
  const missionRef = useRef(null);
  const mainTl = useRef(null);

  const handleNext = () => {
    const tl = gsap.timeline({
      onComplete: onNextClick,
    });

    tl.to(trainRef.current, {
      x: "-150vw",
      duration: 1.5,
      ease: "power2.in",
    }).to(sectionRef.current, {
      opacity: 0,
      y: -50, // Slight lift on exit
      duration: 0.6,
    }, "-=1");
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial State Reset (Wipe out any leftover handleNext styles)
      gsap.set(sectionRef.current, { opacity: 1, y: 0 });
      gsap.set(trainRef.current, { x: "100vw", opacity: 1 });
      gsap.set(contentRef.current.children, { y: 30, opacity: 0 });
      gsap.set(missionRef.current.children, { y: 50, opacity: 0 });

      // 2. Main Entrance Timeline
      mainTl.current = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reset",
        },
      });

      mainTl.current
        .to(trainRef.current, {
          x: "0",
          duration: 1.5,
          ease: "power3.out",
        })
        .to(
          contentRef.current.children,
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8"
        );

      // 3. Mission Vision Animation (Separate trigger)
      gsap.to(missionRef.current.children, {
        y: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 85%",
          toggleActions: "play none none reset", // Added reset for scroll up
        },
      });

      // 4. Floating Train Idle
      gsap.to(trainRef.current, {
        y: "+=8",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 5. THE SCROLL BACK FIX
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        onEnter: () => {
           // Ensure visibility if coming from a "Next" click reset
           gsap.to(sectionRef.current, { opacity: 1, y: 0, duration: 0.3 });
        },
        onEnterBack: () => {
          // Force reset positions and restart the entrance
          gsap.set(sectionRef.current, { opacity: 1, y: 0 });
          mainTl.current.restart();
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-slate-100 dark:bg-[#080808] text-black dark:text-white transition-colors duration-300 overflow-hidden py-20 lg:py-40"
    >
      {/* Top Layout */}
      <div className="flex flex-col lg:flex-row-reverse items-center">

        {/* Train Side */}
        <div ref={trainRef} className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:pl-10 z-10 relative mb-12 lg:mb-0">
          <div className="absolute w-full h-[1px] bg-cyan-500/30 top-1/2 shadow-[0_0_15px_cyan]" />

          <div className="relative w-[320px] h-28 sm:w-[450px] sm:h-36 lg:w-[600px] lg:h-48 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 dark:from-slate-900 dark:via-slate-800 dark:to-black 
                                rounded-tl-[100px] lg:rounded-tl-[120px] rounded-bl-[30px] rounded-br-[15px] border-l-8 border-cyan-500 shadow-xl dark:shadow-[0_0_60px_-10px_rgba(0,255,255,0.2)]">

                        <div className="absolute top-6 left-10 w-1/3 h-1/2 bg-cyan-500/10 border-t border-l border-cyan-500/40 rounded-tl-[80px] skew-x-[-12deg] backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 dark:via-white/5 to-transparent" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-end">
                            <h1 className="text-black/70 dark:text-white/70 text-5xl sm:text-6xl lg:text-7xl pe-5 font-black italic tracking-tighter select-none">
                                ABOUT
                            </h1>
                        </div>

                        <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-6">
                            <div className="w-4 h-2 lg:w-6 lg:h-3 bg-cyan-500 rounded-full shadow-[0_0_25px_cyan] animate-pulse" />
                        </div>
                    </div>
        </div>

        {/* About Content */}
        <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-12 lg:px-20 z-20">
          <div
            ref={contentRef}
            className="max-w-xl text-center lg:text-right mx-auto lg:ml-auto"
          >
            <h2 className="text-cyan-600 dark:text-cyan-500 font-mono text-xs tracking-[0.2em] mb-4 uppercase">
              Station: Central Hub
            </h2>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight mb-6">
              We don't just use technology: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-neutral-800 to-neutral-500 dark:from-white dark:to-slate-500">
                We make it work for you
              </span>
            </h1>

            <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-lg backdrop-blur-sm mb-8 border-r-4 border-r-cyan-500/50">
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                We go beyond implementation — we understand your challenges, align with your goals, and turn technology into practical solutions that drive real results and measurable growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div
        ref={missionRef}
        className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 mt-24 grid md:grid-cols-2 gap-10"
      >
        {/* Mission */}
        <div className="relative p-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-500">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-l-2xl shadow-[0_0_15px_cyan]" />
          <h3 className="text-2xl font-bold mb-6 text-cyan-600 dark:text-cyan-500">
            🚀 Our Mission
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            Our mission is to bring technology to the unorganized sector and local markets, empowering small businesses with accessible digital solutions. By bridging the gap between innovation and grassroots enterprises, we aim to strengthen local economies, improve operational efficiency, and create sustainable employment opportunities that drive inclusive growth.
          </p>
        </div>

        {/* Vision */}
        <div className="relative p-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-500">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-l-2xl shadow-[0_0_15px_cyan]" />
          <h3 className="text-2xl font-bold mb-6 text-cyan-600 dark:text-cyan-500">
            🌍 Our Vision
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            To become a global leader in digital transformation by building
            sustainable, scalable, and intelligent systems that redefine the
            future of industries worldwide.
          </p>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-20">
        <button
          onClick={handleNext}
          className="group flex items-center gap-4 text-cyan-600 dark:text-cyan-500 hover:text-cyan-500 transition-colors"
        >
          <span className="font-mono text-sm tracking-widest uppercase">
            Next Station: Services
          </span>
          <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
            →
          </div>
        </button>
      </div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay dark:mix-blend-normal" />
    </section>
  );
};

export default About;