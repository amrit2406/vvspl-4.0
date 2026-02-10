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
        <section ref={sectionRef} id="contact" className="relative w-full min-h-screen bg-[#050505] text-white flex items-center justify-center p-8">

            {/* Background Map Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center grayscale" />

            <div className="z-10 w-full max-w-4xl bg-gradient-to-br from-neutral-900 to-black border border-[#222] p-8 md:p-16 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-12">

                <div className="w-full md:w-1/2">
                    <h2 className="text-[#0070F0] text-sm font-mono mb-4">TERMINAL POINT</h2>
                    <h1 className="text-4xl font-bold mb-6">Start Your Journey</h1>
                    <p className="text-neutral-400 mb-8 leading-relaxed">
                        Ready to accelerate your business? Our team is standing by to engineer your digital transformation.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#0070F0]/10 flex items-center justify-center rounded text-[#0070F0]">📍</div>
                            <div>
                                <h3 className="font-bold text-sm">Headquarters</h3>
                                <p className="text-neutral-500 text-sm">123 Tech Park, Innovation City</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#0070F0]/10 flex items-center justify-center rounded text-[#0070F0]">📧</div>
                            <div>
                                <h3 className="font-bold text-sm">Email Us</h3>
                                <p className="text-neutral-500 text-sm">contact@vvspl.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={formRef} className="w-full md:w-1/2">
                    <form className="space-y-4">
                        <input type="text" placeholder="Name" className="w-full bg-[#111] border border-[#333] p-4 rounded focus:border-[#0070F0] outline-none transition-colors" />
                        <input type="email" placeholder="Email" className="w-full bg-[#111] border border-[#333] p-4 rounded focus:border-[#0070F0] outline-none transition-colors" />
                        <textarea placeholder="Message" rows="4" className="w-full bg-[#111] border border-[#333] p-4 rounded focus:border-[#0070F0] outline-none transition-colors"></textarea>
                        <button className="w-full bg-[#0070F0] text-black font-bold py-4 rounded hover:bg-white transition-colors">
                            Send Transmission
                        </button>
                    </form>
                </div>
            </div>

            <footer className="absolute bottom-8 text-neutral-600 text-xs font-mono">
                &copy; 2026 VVSPL. STATION TERMINUS.
            </footer>
        </section>
    );
};

export default Contact;
