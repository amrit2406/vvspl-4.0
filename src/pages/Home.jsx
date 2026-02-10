import React, { useRef } from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Ventures from '../components/home/Ventures';
import Blogs from '../components/home/Blogs';
import Contact from '../components/home/Contact';

export default function Home() {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const whyUsRef = useRef(null);
  const venturesRef = useRef(null);
  const blogsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col bg-black">
      {/* Hero Section */}
      <div className="w-full">
        <Hero onNextClick={() => scrollToSection(aboutRef)} />
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="w-full">
        <About onNextClick={() => scrollToSection(servicesRef)} />
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="w-full">
        <Services onNextClick={() => scrollToSection(whyUsRef)} />
      </div>

      {/* Why Choose Us Section */}
      <div ref={whyUsRef} className="w-full">
        <WhyChooseUs onNextClick={() => scrollToSection(venturesRef)} />
      </div>

      {/* Ventures Section */}
      <div ref={venturesRef} className="w-full">
        <Ventures onNextClick={() => scrollToSection(blogsRef)} />
      </div>

      {/* Blogs Section */}
      <div ref={blogsRef} className="w-full">
        <Blogs onNextClick={() => scrollToSection(contactRef)} />
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="w-full">
        <Contact />
      </div>
    </div>
  );
}