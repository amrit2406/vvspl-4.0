import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(formRef.current,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center"
                }
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative w-full min-h-screen bg-slate-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 flex items-center justify-center p-6 sm:p-8"
        >
            {/* Background Map Overlay */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center grayscale pointer-events-none" />

            <div className="z-10 w-full max-w-4xl bg-white dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-[#222] p-8 md:p-16 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-12">

                <div className="w-full md:w-1/2">
                    <h2 className="text-[#0070F0] text-sm font-mono mb-4 tracking-widest uppercase font-bold">TERMINAL POINT</h2>
                    <h1 className="text-4xl font-bold mb-6 tracking-tight">Start Your Journey</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                        Ready to accelerate your business? Our team is standing by to engineer your digital transformation.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-[#0070F0]/10 flex items-center justify-center rounded-lg text-[#0070F0] text-xl group-hover:scale-110 transition-transform">📍</div>
                            <div>
                                <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">Headquarters</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">123 Tech Park, Innovation City</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-[#0070F0]/10 flex items-center justify-center rounded-lg text-[#0070F0] text-xl group-hover:scale-110 transition-transform">📧</div>
                            <div>
                                <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">Email Us</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">contact@vvspl.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={formRef} className="w-full md:w-1/2">
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-[#333] p-4 rounded-lg focus:border-[#0070F0] outline-none transition-all focus:ring-1 focus:ring-[#0070F0]/50 text-neutral-800 dark:text-white"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-[#333] p-4 rounded-lg focus:border-[#0070F0] outline-none transition-all focus:ring-1 focus:ring-[#0070F0]/50 text-neutral-800 dark:text-white"
                        />
                        <textarea
                            placeholder="Message"
                            rows="4"
                            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-[#333] p-4 rounded-lg focus:border-[#0070F0] outline-none transition-all focus:ring-1 focus:ring-[#0070F0]/50 text-neutral-800 dark:text-white resize-none"
                        ></textarea>
                        <button className="w-full bg-[#0070F0] text-white dark:text-black font-bold py-4 rounded-lg hover:bg-[#0070F0]/90 dark:hover:bg-white transition-all transform active:scale-[0.98] shadow-lg dark:shadow-[0_0_20px_rgba(0,112,240,0.3)] cursor-pointer uppercase tracking-widest text-sm">
                            Send Transmission
                        </button>
                    </form>
                </div>
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay dark:mix-blend-normal" />
        </section>
    );
};

export default Contact;
