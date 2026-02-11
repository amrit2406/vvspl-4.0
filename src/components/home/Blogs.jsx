import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blogs = [
    { 
        title: "The Rise of Autonomous Supply Chains", 
        date: "Oct 12, 2025", 
        category: "Logistics",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" // Added Image
    },
    { 
        title: "Sustainable Mining: A New Era", 
        date: "Sep 28, 2025", 
        category: "Mining",
        image: "https://anthonyblumberg.com/wp-content/uploads/2025/05/rethinking-global-mining-navigating-a-new-era-of-responsibility-and-innovation-scaled.jpg" // Added Image
    },
    { 
        title: "AI in Urban Planning", 
        date: "Sep 15, 2025", 
        category: "Tech",
        image: "https://sparkemtech.co.uk/img/e16392e1-b6ab-4269-862c-6055e0762727/urban-planning-ai-optimised.jpg?fm=jpg&q=80&fit=max&crop=1920%2C1078%2C0%2C170&w=1280&h=720" // Added Image
    },
];

const Blogs = ({ onNextClick }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const mainTl = useRef(null);

    const handleNext = () => {
        const tl = gsap.timeline({ onComplete: onNextClick });
        tl.to(sectionRef.current, {
            opacity: 0,
            y: -100,
            duration: 0.5,
            ease: "power2.in"
        });
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set(sectionRef.current, { opacity: 1, y: 0 });
            gsap.set(containerRef.current.children, { y: 50, opacity: 0 });

            mainTl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    toggleActions: "play none none reset"
                }
            });

            mainTl.current.to(containerRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out"
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom",
                onEnter: () => gsap.to(sectionRef.current, { opacity: 1, y: 0, duration: 0.3 }),
                onEnterBack: () => {
                    mainTl.current.restart();
                    gsap.to(sectionRef.current, { opacity: 1, y: 0, duration: 0.5 });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="blogs"
            className="relative w-full min-h-[80vh] bg-slate-100 dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300 py-20 flex flex-col items-center"
        >
            <div className="text-center mb-16 px-6">
                <h2 className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-2 tracking-[0.3em] uppercase">DAILY BRAIN DUMP</h2>
                <h1 className="text-4xl sm:text-5xl font-serif italic text-neutral-800 dark:text-white">Latest Intelligence</h1>
            </div>

            <div ref={containerRef} className="max-w-7xl w-full px-6 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.map((blog, i) => (
                    <div key={i} className="group cursor-pointer">
                        {/* Image Container */}
                        <div className="h-48 bg-white dark:bg-neutral-800 mb-4 overflow-hidden relative shadow-md dark:shadow-none rounded-lg">
                            <img 
                                src={blog.image} 
                                alt={blog.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Overlay for better text readability if needed */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            
                            <div className="absolute top-4 left-4 z-10 bg-neutral-800 dark:bg-white text-white dark:text-black text-[10px] sm:text-xs font-bold px-2 py-1 uppercase tracking-wider">
                                {blog.category}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] sm:text-xs text-neutral-500 mb-2 font-mono">
                            <span>{blog.date}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline decoration-current underline-offset-4 transition-all">
                            {blog.title}
                        </h3>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-16 px-6">
                <button
                    onClick={handleNext}
                    className="group text-neutral-800 dark:text-white border-b border-black dark:border-white pb-1 hover:opacity-50 transition-all flex items-center gap-2 cursor-pointer font-mono text-xs sm:text-sm uppercase tracking-widest"
                >
                    Next Station: Contact
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay dark:mix-blend-normal" />
        </section>
    );
};

export default Blogs;