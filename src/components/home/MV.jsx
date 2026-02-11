import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MissionVision = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(cardsRef.current.children, {
        y: 60,
        opacity: 0,
      });

      gsap.to(cardsRef.current.children, {
        y: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-[#050505] text-black dark:text-white py-24 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-cyan-600 dark:text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">
            Our Core
          </h2>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Mission & Vision
          </h1>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-10"
        >
          {/* Mission */}
          <div className="relative p-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-500 group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-l-2xl shadow-[0_0_15px_cyan]" />

            <h3 className="text-2xl font-bold mb-6 text-cyan-600 dark:text-cyan-500">
              🚀 Our Mission
            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              To empower businesses with innovative digital solutions that
              accelerate growth, enhance efficiency, and deliver measurable
              impact through technology excellence.
            </p>
          </div>

          {/* Vision */}
          <div className="relative p-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-500 group">
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
      </div>

      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay dark:mix-blend-normal" />
    </section>
  );
};

export default MissionVision;
