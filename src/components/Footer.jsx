import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../assets/logo2.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: "About Us", path: "about" },
            { name: "Our Services", path: "services" },
            { name: "Ventures", path: "ventures" },
            { name: "Contact", path: "contact" },
        ],
        resources: [
            { name: "Blogs", path: "blogs" },
            { name: "Case Studies", path: "ventures" },
            { name: "Support", path: "contact" },
            { name: "Privacy Policy", path: "/" },
        ],
        social: [
            { name: "LinkedIn", url: "https://linkedin.com" },
            { name: "Twitter", url: "https://twitter.com" },
            { name: "Instagram", url: "https://instagram.com" },
            { name: "Facebook", url: "https://facebook.com" },
        ],
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-white dark:bg-[#050505] text-black dark:text-white pt-20 pb-10 border-t border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#0070F0]/50 to-transparent shadow-[0_0_30px_rgba(0,112,240,0.3)] dark:shadow-[0_0_30px_#0070F0]" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6" onClick={() => window.scrollTo(0, 0)}>
                            <img src={LogoImg} alt="VVSPL Logo" className="h-10 w-10 object-contain" />
                            <span className="text-2xl font-black italic tracking-tighter text-black dark:text-white">VVSPL</span>
                        </Link>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                            Accelerating digital transformation with cutting-edge solutions.
                            Veteran's Venture where vision meets velocity.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-black dark:text-white font-bold uppercase tracking-widest text-xs mb-6 underline decoration-[#0070F0]/40 underline-offset-8">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => scrollToSection(link.path)}
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-[#0070F0] dark:hover:text-[#0070F0] text-sm transition-colors cursor-pointer"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-black dark:text-white font-bold uppercase tracking-widest text-xs mb-6 underline decoration-[#0070F0]/40 underline-offset-8">Resources</h4>
                        <ul className="space-y-4">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => scrollToSection(link.path)}
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-[#0070F0] dark:hover:text-[#0070F0] text-sm transition-colors cursor-pointer"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-black dark:text-white font-bold uppercase tracking-widest text-xs mb-6 underline decoration-[#0070F0]/40 underline-offset-8">Connect</h4>
                        <div className="flex flex-wrap gap-4 mb-6">
                            {footerLinks.social.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-[#0070F0] hover:text-white hover:border-[#0070F0] transition-all transform hover:-translate-y-1"
                                    aria-label={link.name}
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">{link.name.slice(0, 2)}</span>
                                </a>
                            ))}
                        </div>
                        <p className="text-neutral-500 text-xs italic">
                            Stay updated with our latest insights and news.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-neutral-500 text-xs">
                        © {currentYear} Veterans Venture Software Private Limited. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link to="/" className="text-neutral-500 hover:text-[#0070F0] text-xs transition-colors">Terms of Service</Link>
                        <Link to="/" className="text-neutral-500 hover:text-[#0070F0] text-xs transition-colors">Privacy Policy</Link>
                        <Link to="/" className="text-neutral-500 hover:text-[#0070F0] text-xs transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
