import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blogs = [
    { title: "The Rise of Autonomous Supply Chains", date: "Oct 12, 2025", category: "Logistics" },
    { title: "Sustainable Mining: A New Era", date: "Sep 28, 2025", category: "Mining" },
    { title: "AI in Urban Planning", date: "Sep 15, 2025", category: "Tech" },
];

const Blogs = ({ onNextClick }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    const handleNext = () => {
        const tl = gsap.timeline({
            onComplete: onNextClick
        });

        tl.to(sectionRef.current, {
            opacity: 0,
            y: -50,
            duration: 0.5
        });
    };

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                toggleActions: "play none none reverse"
            }
        })
            .fromTo(containerRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 }
            );
    }, []);

    return (
        <section ref={sectionRef} id="blogs" className="relative w-full min-h-[80vh] bg-neutral-900 text-white py-20 flex flex-col items-center">

            <div className="text-center mb-16">
                <h2 className="text-xs font-mono text-neutral-400 mb-2">DAILY BRAIN DUMP</h2>
                <h1 className="text-4xl font-serif italic text-white">Latest Intelligence</h1>
            </div>

            <div ref={containerRef} className="max-w-5xl w-full px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.map((blog, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="h-48 bg-neutral-800 mb-4 overflow-hidden relative">
                            {/* Placeholder Img */}
                            <div className="absolute inset-0 bg-neutral-700 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-2 py-1">
                                {blog.category}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-neutral-500 mb-2 font-mono">
                            <span>{blog.date}</span>
                        </div>
                        <h3 className="text-xl font-bold leading-tight group-hover:underline decoration-white/50 underline-offset-4">
                            {blog.title}
                        </h3>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-16">
                <button
                    onClick={handleNext}
                    className="text-white border-b border-white pb-1 hover:opacity-50 transition-opacity"
                >
                    Next Station: Contact &rarr;
                </button>
            </div>
        </section>
    );
};

export default Blogs;
