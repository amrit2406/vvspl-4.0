import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import LogoImg from "../assets/logo2.png";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
    { name: "Home", path: "hero" },
    { name: "About", path: "about" },
    { name: "Services", path: "services" },
    { name: "Ventures", path: "ventures" },
    { name: "Blogs", path: "blogs" },
    { name: "Contact", path: "contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef([]);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(logoRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
            gsap.from(linksRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2,
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    const scrollToSection = (id) => {
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled
                ? "py-4 bg-white/80 dark:bg-black/60 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-sm dark:shadow-none"
                : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    ref={logoRef}
                    className="flex items-center gap-3 group"
                    onClick={() => scrollToSection("hero")}
                >
                    <img
                        src={LogoImg}
                        alt="VVSPL Logo"
                        className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-2xl font-black italic tracking-tighter text-black dark:text-white">
                        VVSPL
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <button
                            key={link.name}
                            ref={(el) => (linksRef.current[index] = el)}
                            onClick={() => scrollToSection(link.path)}
                            className="text-sm font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 hover:text-[#0070F0] dark:hover:text-[#0070F0] transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#0070F0] transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    ))}

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button & Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white"
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                    <button
                        className="text-black dark:text-white p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span
                                className={`w-full h-[2px] bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[9px]" : ""
                                    }`}
                            ></span>
                            <span
                                className={`w-full h-[2px] bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""
                                    }`}
                            ></span>
                            <span
                                className={`w-full h-[2px] bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                                    }`}
                            ></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white/95 dark:bg-black/95 z-[999] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => scrollToSection(link.path)}
                        className="text-2xl font-bold tracking-widest uppercase text-black dark:text-white hover:text-[#0070F0] transition-colors"
                    >
                        {link.name}
                    </button>
                ))}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-8 right-8 text-black dark:text-white text-sm uppercase tracking-widest border border-black/20 dark:border-white/20 px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
