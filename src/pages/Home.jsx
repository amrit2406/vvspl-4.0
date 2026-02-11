import React, { useRef, useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Ventures from '../components/home/Ventures';
import Blogs from '../components/home/Blogs';
import Contact from '../components/home/Contact';
import StationTrack from '../components/home/StationTrack';
import FoundingMembers from '../components/home/Members';

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const whyUsRef = useRef(null);
  const venturesRef = useRef(null);
  const membersRef = useRef(null);
  const blogsRef = useRef(null);
  const contactRef = useRef(null);

  const [currentStation, setCurrentStation] = useState(0);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStationClick = (id) => {
    const refs = [heroRef, aboutRef, servicesRef, whyUsRef, venturesRef, membersRef, blogsRef, contactRef];
    const ref = refs[id];
    if (ref) scrollToSection(ref);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) setCurrentStation(0);
          else if (entry.target === aboutRef.current) setCurrentStation(1);
          else if (entry.target === servicesRef.current) setCurrentStation(2);
          else if (entry.target === whyUsRef.current) setCurrentStation(3);
          else if (entry.target === venturesRef.current) setCurrentStation(4);
          else if (entry.target === membersRef.current) setCurrentStation(5);
          else if (entry.target === blogsRef.current) setCurrentStation(6);
          else if (entry.target === contactRef.current) setCurrentStation(7);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (whyUsRef.current) observer.observe(whyUsRef.current);
    if (venturesRef.current) observer.observe(venturesRef.current);
    if (membersRef.current) observer.observe(membersRef.current);
    if (blogsRef.current) observer.observe(blogsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <div id="hero" ref={heroRef} className="w-full">
        <Hero onNextClick={() => scrollToSection(aboutRef)} />
      </div>

      {/* About Section */}
      <div id="about" ref={aboutRef} className="w-full">
        <About onNextClick={() => scrollToSection(servicesRef)} />
      </div>

      {/* Services Section */}
      <div id="services" ref={servicesRef} className="w-full">
        <Services onNextClick={() => scrollToSection(whyUsRef)} />
      </div>

      {/* Why Choose Us Section */}
      <div id="whyus" ref={whyUsRef} className="w-full">
        <WhyChooseUs onNextClick={() => scrollToSection(venturesRef)} />
      </div>

      {/* Ventures Section */}
      <div id="ventures" ref={venturesRef} className="w-full">
        <Ventures onNextClick={() => scrollToSection(membersRef)} />
      </div>

      <div id="members" ref={membersRef} className="w-full">
        <FoundingMembers onNextClick={() => scrollToSection(blogsRef)} />
      </div>

      {/* Blogs Section */}
      <div id="blogs" ref={blogsRef} className="w-full">
        <Blogs onNextClick={() => scrollToSection(contactRef)} />
      </div>

      {/* Contact Section */}
      <div id="contact" ref={contactRef} className="w-full">
        <Contact />
      </div>
      <StationTrack activeIndex={currentStation} onStationClick={handleStationClick} />
    </div>
  );
}
