import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import your images here
import AnilImg from "../../assets/img1.jpeg";
import AnkitImg from "../../assets/img2.jpeg";
import DattaviImg from "../../assets/img3.jpeg";

gsap.registerPlugin(ScrollTrigger);

const founders = [
    {
        name: "Col Anil Tripathi, Sena Medal (Retd.)",
        role: "Chairman cum Founder Director",
        image: AnilImg, // Replace with AnilImg
        msg: "A decorated Army veteran and Sena Medal awardee, Col Anil Tripathi is a mission-driven leader with over two decades of operational excellence in the Army Service Corps. An expert in defence logistics, strategic supply chains, crisis response, and large-scale administration, he successfully built and led a high-performing logistics enterprise in the port and integrated supply chain sector. Today, he is charting a new course — transitioning from physical logistics to digital force multiplication. Through Veteran Ventures Pvt Ltd, he is spearheading next-generation IT solutions designed to address real-world defence and civil challenges. His vision is clear: leverage technology as a strategic enabler to enhance national capability, operational efficiency, and secure digital ecosystems. With disciplined execution and a future-ready mindset, he is positioning the company at the intersection of defence expertise and digital innovation.",
        color: "border-blue-600"
    },
    {
        name: "Ankit Tripathi",
        role: "Additional Director",
        image: AnkitImg, // Replace with AnkitImg
        msg: "An MBA and BCom graduate from PDPU Gandhinagar, Ankit brings structured business strategy and growth-oriented leadership to the organization. Having actively managed operations and expansion initiatives, he now drives digital transformation efforts, ensuring scalable systems, strong governance, and technology-led value creation.",
        color: "border-purple-600"
    },
    {
        name: "Dattavi Jignesh Jariwala",
        role: "Founder Director",
        image: DattaviImg, // Replace with DattaviImg
        msg: "With a BA and MA in Clinical Psychology, Dattavi contributes a human-centric dimension to leadership, organizational design, and stakeholder engagement. Strengthening the technology backbone is Maj Vikas Tripathi (MTech – Computer Science, BTech – Electronics), whose technical expertise supports the company’s ambition to build secure, intelligent, and impact-driven digital solutions.",
        color: "border-emerald-600"
    }
];

const FoundingMembers = ({ onNextClick }) => {
    const sectionRef = useRef(null);
    const mainTl = useRef(null);

    const handleNext = () => {
        const tl = gsap.timeline({ onComplete: onNextClick });
        tl.to(sectionRef.current, {
            opacity: 0,
            y: -50,
            duration: 0.6,
            ease: "power2.in"
        });
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set(sectionRef.current, { opacity: 1, y: 0 });
            gsap.set(".founder-row-left", { x: -100, opacity: 0 });
            gsap.set(".founder-row-right", { x: 100, opacity: 0 });

            mainTl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reset"
                }
            });

            mainTl.current.to(".founder-row-left, .founder-row-right", {
                x: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1.2,
                ease: "power4.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="members"
            className="relative w-full min-h-screen bg-[#050505] text-white py-24 px-4 sm:px-10 overflow-hidden"
        >
            {/* Header */}
            <div className="text-center mb-24 z-10">
                <h2 className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">Leadership</h2>
                <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter">
                    Driving the Digital <span className="text-neutral-700">Frontier</span>
                </h1>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col gap-20 lg:gap-32">
                {founders.map((founder, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <div
                            key={i}
                            className={`founder-row-${isEven ? 'left' : 'right'} flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}
                        >
                            {/* Profile Part */}
                            <div className={`w-full lg:w-1/3 flex flex-col ${isEven ? 'items-start lg:items-start' : 'items-start lg:items-end'} group`}>
                                
                                {/* Enhanced Image Container */}
                                <div className="relative mb-6">
                                    {/* The Glow background */}
                                    <div className={`absolute inset-0 translate-x-3 translate-y-3 blur-2xl opacity-20 ${founder.color.replace('border', 'bg')}`} />
                                    
                                    {/* The Image itself */}
                                    <div className={`w-48 h-60 sm:w-56 sm:h-72 overflow-hidden border-2 ${founder.color} skew-x-[-6deg] rounded-2xl bg-neutral-800`}>
                                        <img 
                                            src={founder.image} 
                                            alt={founder.name}
                                            className="w-full h-full object-cover skew-x-[6deg] scale-110 group-hover:scale-125 transition-transform duration-700"
                                        />
                                    </div>
                                    
                                    {/* Badge/Rank Decoration */}
                                    <div className={`absolute -bottom-4 ${isEven ? '-right-4' : '-left-4'} px-4 py-1 bg-white text-black font-black text-[10px] uppercase italic skew-x-[-15deg] z-10 shadow-xl`}>
                                        {founder.name.split(',')[0]}
                                    </div>
                                </div>

                                <h3 className={`text-2xl sm:text-3xl font-black italic uppercase mt-4 ${!isEven && 'lg:text-right'}`}>
                                    {founder.name}
                                </h3>
                                <p className="text-blue-500 font-mono text-xs tracking-widest mt-2 uppercase">
                                    {founder.role}
                                </p>
                            </div>

                            {/* Message Part */}
                            <div className={`w-full lg:w-2/3 p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-md relative`}>
                                <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-1 h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]`} />
                                <span className={`absolute -top-6 ${isEven ? 'left-4' : 'right-4'} text-7xl text-white font-serif select-none`}>“</span>
                                <p className={`text-neutral-400 text-sm sm:text-base leading-relaxed italic text-white ${!isEven && 'lg:text-right'}`}>
                                    {founder.msg}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation */}
            <div className="mt-32 flex justify-center">
                <button onClick={handleNext} className="group flex flex-col items-center gap-4 cursor-pointer">
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-blue-500" />
                    <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-500 group-hover:text-blue-500 transition-colors uppercase">Depart to Blogs</span>
                    <span className="text-2xl animate-bounce">↓</span>
                </button>
            </div>
        </section>
    );
};

export default FoundingMembers;