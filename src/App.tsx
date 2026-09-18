import { useState, useEffect } from 'react';
import Hero from './components/hero';
import Nav from './components/nav';
import Social from './components/social';
import About from './components/about';
import Capabilities from './components/Capabilities';
import SelectedWork from './components/SelectedWork';
import EngineeringCareer from './components/EngineeringCareer';
import ContactForm from './components/contact';
import Footer from './components/footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/extras/ScrollProgress';
import Logo from './assets/logo.svg';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = stored === 'system' ? (prefersDark ? 'dark' : 'light') : stored;
    document.documentElement.setAttribute('data-theme', resolved);

    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <div className={`App ${isLoading ? 'loading' : ''}`}>
      {/* Reading progress — brand signature */}
      <ScrollProgress />
      {/* Custom cursor — desktop only, hidden on touch via CSS */}
      <CustomCursor />
      {/* Loading Screen */}
      <div className={`loading-screen ${isLoading ? 'loading-active' : 'loading-inactive'}`}>
        <img
          width="100"
          height="100"
          src={Logo}
          alt="Cristian Castro"
          className="animate-jump-out animate-once animate-delay-100 animate-duration-[450ms]"
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

        {/* Page content — scrolls over hero */}
        <main className="relative z-30 bg-gradient-to-b from-transparent bg-surface mt-[100vh] pb-16 lg:pb-0">
          {/* 1. About */}
          <About />

          {/* 2. Core Capabilities — 5 consolidated cards */}
          <Capabilities />

          {/* 3. Selected Work — 4 case studies */}
          <SelectedWork />

          {/* 4. Engineering Method + Career Trajectory — unified */}
          <EngineeringCareer />

          {/* 6. Contact */}
          <ContactForm />

          {/* 8. Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;