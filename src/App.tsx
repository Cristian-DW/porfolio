import { useState, useEffect } from 'react';
import Hero from './components/hero';
import Nav from './components/nav';
import Social from './components/social';
import About from './components/about';
import Skills from './components/skills';
import EngineeringInPractice from './components/EngineeringInPractice';
import ProfessionalWork from './components/ProfessionalWork';
import DeltuxArchitecture from './components/DeltuxArchitecture';
import EngineeringChallenges from './components/EngineeringChallenges';
import ArchitectureMindset from './components/ArchitectureMindset';
import Certifications from './components/Certifications';
import CareerDirection from './components/CareerDirection';
import ContactForm from './components/contact';
import Footer from './components/footer';
import Logo from './assets/logo.svg';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure theme is applied (anti-flash already done in index.html)
    const stored = localStorage.getItem('portfolio-theme') || 'dark';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = stored === 'system' ? (prefersDark ? 'dark' : 'light') : stored;
    document.documentElement.setAttribute('data-theme', resolved);

    setTimeout(() => {
      setIsLoading(false);
    }, 1800);
  }, []);

  return (
    <div className={`App ${isLoading ? 'loading' : ''}`}>
      {/* Loading Screen */}
      <div className={`loading-screen ${isLoading ? 'loading-active' : 'loading-inactive'}`}>
        <img
          width="100"
          height="100"
          src={Logo}
          alt="Cristian Castro"
          className="animate-jump-out animate-once animate-delay-500 animate-duration-[1500ms]"
        />
      </div>

      {/* Main layout */}
      <div className="relative">
        {/* Hero fixed background */}
        <Hero />

        {/* Fixed overlays */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Nav />
        </div>
        <Social />

        {/* Page content */}
        <main className="relative z-30 bg-gradient-to-b from-transparent bg-surface mt-[100vh]">
          {/* 1. About */}
          <About />

          {/* 2. Professional Capabilities */}
          <Skills />

          {/* 3. Engineering in Practice */}
          <EngineeringInPractice />

          {/* 4. Professional Work */}
          <ProfessionalWork />

          {/* 5. Architecture Evidence — Deltux */}
          <DeltuxArchitecture />

          {/* 6. Engineering Challenges */}
          <EngineeringChallenges />

          {/* 7. Architecture Mindset */}
          <ArchitectureMindset />

          {/* 8. Certifications */}
          <Certifications />

          {/* 9. Career & Growth */}
          <CareerDirection />

          {/* 10. Contact */}
          <ContactForm />

          {/* 11. Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;