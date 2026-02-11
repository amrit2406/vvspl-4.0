import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const stations = [
    { id: 0, name: "Hero", label: "Origin" },
    { id: 1, name: "About", label: "Central" },
    { id: 2, name: "Services", label: "Logistics" },
    { id: 3, name: "Why Us", label: "Signal" },
    { id: 4, name: "Ventures", label: "Hyperloop" },
    { id: 5, name: "Members", label: "Leaders" },
    { id: 6, name: "Blogs", label: "Intel" },
    { id: 7, name: "Contact", label: "Terminal" },
];

const StationTrack = ({ activeIndex = 0, onStationClick }) => {
    const markerRef = useRef(null);
    const labelRef = useRef(null);

    const currentStation = stations[activeIndex] || stations[0];

    useEffect(() => {
        // Optimization: Don't run animations if the screen is mobile sized
        if (window.innerWidth < 768) return;

        const totalStations = stations.length;
        const spacing = 100 / (totalStations - 1);
        const targetY = activeIndex * spacing;

        // Animate the Train Marker vertically
        gsap.to(markerRef.current, {
            top: `${targetY}%`,
            duration: 0.8,
            ease: "power2.inOut"
        });

        // Label pop animation
        gsap.fromTo(labelRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.4 }
        );
    }, [activeIndex]);

    return (
        /* Added 'hidden md:flex': 
           - hidden: display none on mobile
           - md:flex: display flex on screens 768px and up 
        */
        <div className="hidden md:flex fixed top-0 right-0 h-full w-24 z-[100] py-24 px-6 pointer-events-none justify-center">
            <div className="relative h-full w-1 flex justify-center items-center">

                {/* 1. The Rail Track Background (Vertical) */}
                <div className="absolute h-full w-[2px] bg-black/10 dark:bg-white/10" />

                {/* 2. The Progress Glow (Vertical) */}
                <div
                    className="absolute top-0 w-[2px] bg-blue-600 dark:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.5)] dark:shadow-[0_0_15px_#3b82f6] transition-all duration-700 ease-in-out"
                    style={{ height: `${(activeIndex / (stations.length - 1)) * 100}%` }}
                />

                {/* 3. Static Station Points */}
                <div className="absolute h-full flex flex-col justify-between items-center pointer-events-auto py-0">
                    {stations.map((station) => (
                        <div
                            key={station.id}
                            onClick={() => onStationClick?.(station.id)}
                            className="group relative flex items-center cursor-pointer p-1"
                        >
                            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${activeIndex >= station.id
                                    ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_#3b82f6]'
                                    : 'bg-slate-200 dark:bg-neutral-800 border-slate-300 dark:border-neutral-600'
                                }`} />

                            <span className="absolute right-8 text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-black border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded shadow-sm">
                                {station.name.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>

                {/* 4. The Moving Train Marker */}
                <div
                    ref={markerRef}
                    className="absolute h-4 w-4 -mt-2 pointer-events-none flex items-center justify-center"
                    style={{ top: '0%' }}
                >
                    <div className="w-full h-full bg-blue-600 dark:bg-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] dark:shadow-[0_0_20px_#fff] animate-pulse" />

                    <div
                        ref={labelRef}
                        className="absolute right-8 whitespace-nowrap text-blue-700 dark:text-blue-400 font-mono text-[10px] font-bold tracking-[0.2em] bg-white/80 dark:bg-black/50 px-2 py-1 rounded border border-blue-600/30 dark:border-blue-500/20 backdrop-blur-sm shadow-md"
                    >
                        {currentStation.label.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StationTrack;