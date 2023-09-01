// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

import Background from './components/extras/background';
import Hero from './components/hero';
import Nav from './components/nav';
import Social from './components/social';
import About from './components/about';
import Education from './components/education';
import Skills from './components/skills';
import Project from './components/project';
import ContactForm from './components/contact';
import Footer from './components/footer';
import Logo from '../src/assets/Logo.svg';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simula un tiempo de carga (esto puede ser una llamada a una API, etc.)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Tiempo
  }, []);

  return (
    <div className={`App ${isLoading ? 'loading' : ''}`}>
    <div className={`loading-screen bg-fondo ${isLoading ? 'loading-active' : 'loading-inactive'}`}>
      <img width="100px" height="100px" src={Logo} alt="logo" className='animate-jump-out animate-once animate-delay-500 animate-duration-[1500ms]' />
    </div>
        <>
          <Nav />
          <Social/>
          <header className="header fixed top-0 left-0 w-screen ">
            <Background/>
            <Hero/>
          </header>
          <main className='top-main  md:relative md:top-[85rem]   z-20 bg-fondo'>
            <About/>
            <Skills/>
            <Education/>
            <Project/>
            <ContactForm/>
            <Footer/>
          </main>
        </>
    </div>
  );
}

export default App;


