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
import Theme from './components/extras/themes';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('bg-fondo'); // El color de fondo inicial

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Función para cambiar el color de fondo
  const changeBackgroundColor = (colorClass) => {
    setSelectedColor(colorClass);
  };

  return (
    <div className={`App ${isLoading ? 'loading' : ''}`}>
      <div
        className={`loading-screen ${selectedColor} ${
          isLoading ? 'loading-active' : 'loading-inactive'
        }`}
      >
        <img
          width="100px"
          height="100px"
          src={Logo}
          alt="logo"
          className="animate-jump-out animate-once animate-delay-500 animate-duration-[1500ms]"
        />
      </div>
      <>
        <Nav />
        <Social />
        <Theme changeBackgroundColor={changeBackgroundColor} />
        <header className={`header fixed top-0 left-0 w-screen ${selectedColor}`}>
          <Background selectedColor={selectedColor} />
          <Hero />
        </header>
        <main className={`top-main md:relative md:top-[85rem] z-20  bg-fondo`}>
          <About selectedColor={selectedColor}  />
          <Skills  selectedColor={selectedColor}  />
          <Education  />
          <Project  />
          <ContactForm />
          <Footer selectedColor={selectedColor} />
        </main>
      </>
    </div>
  );
}

export default App;
